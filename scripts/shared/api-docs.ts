import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import ts from 'typescript';

export interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

function unwrapExpression(expression: ts.Expression): ts.Expression {
  let current = expression;

  while (ts.isAsExpression(current) || ts.isTypeAssertionExpression(current)) {
    current = current.expression;
  }

  return current;
}

function getObjectLiteralFromPropsSource(sourceFile: ts.SourceFile): ts.ObjectLiteralExpression | undefined {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    if (!statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      const name = declaration.name;

      if (!ts.isIdentifier(name) || !name.text.endsWith('Props') || !declaration.initializer) {
        continue;
      }

      const initializer = unwrapExpression(declaration.initializer);

      if (ts.isObjectLiteralExpression(initializer)) {
        return initializer;
      }
    }
  }

  return undefined;
}

function getCommentText(sourceText: string, node: ts.Node): string | undefined {
  const commentRanges = ts.getLeadingCommentRanges(sourceText, node.pos) ?? [];
  const jsDocRange = commentRanges
    .filter(range => sourceText.slice(range.pos, range.pos + 3) === '/**')
    .at(-1);

  if (!jsDocRange) {
    return undefined;
  }

  const raw = sourceText.slice(jsDocRange.pos + 3, jsDocRange.end - 2);
  const lines = raw
    .split(/\r?\n/)
    .map(line => line.replace(/^\s*\*\s?/, '').trimEnd())
    .join('\n')
    .trim();

  return lines || undefined;
}

function buildTypeAliasMap(sourceFile: ts.SourceFile): Map<string, ts.TypeNode> {
  const aliases = new Map<string, ts.TypeNode>();

  for (const statement of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(statement)) {
      continue;
    }

    aliases.set(statement.name.text, statement.type);
  }

  return aliases;
}

function stringifyTypeNode(
  typeNode: ts.TypeNode,
  aliases: Map<string, ts.TypeNode>,
  sourceFile: ts.SourceFile,
  seen = new Set<string>()
): string {
  if (ts.isTypeReferenceNode(typeNode)) {
    const typeName = typeNode.typeName.getText(sourceFile);

    if (typeName === 'PropType' && typeNode.typeArguments?.[0]) {
      return stringifyTypeNode(typeNode.typeArguments[0], aliases, sourceFile, seen);
    }

    const aliasTarget = aliases.get(typeName);

    if (aliasTarget && !seen.has(typeName)) {
      seen.add(typeName);
      return stringifyTypeNode(aliasTarget, aliases, sourceFile, seen);
    }

    return typeName;
  }

  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.map(member => stringifyTypeNode(member, aliases, sourceFile, seen)).join(' | ');
  }

  if (ts.isIntersectionTypeNode(typeNode)) {
    return typeNode.types.map(member => stringifyTypeNode(member, aliases, sourceFile, seen)).join(' & ');
  }

  if (ts.isParenthesizedTypeNode(typeNode)) {
    return `(${stringifyTypeNode(typeNode.type, aliases, sourceFile, seen)})`;
  }

  return typeNode.getText(sourceFile);
}

function stringifyInitializerType(
  initializer: ts.Expression,
  aliases: Map<string, ts.TypeNode>,
  sourceFile: ts.SourceFile
): string {
  if (ts.isTypeAssertionExpression(initializer) || ts.isAsExpression(initializer)) {
    const typeNode = initializer.type;
    return stringifyTypeNode(typeNode, aliases, sourceFile);
  }

  const expression = unwrapExpression(initializer);

  if (ts.isIdentifier(expression)) {
    if (expression.text === 'String') {
      return 'string';
    }

    if (expression.text === 'Number') {
      return 'number';
    }

    if (expression.text === 'Boolean') {
      return 'boolean';
    }
  }

  return expression.getText(sourceFile);
}

function readPropsMetadataFromSource(sourceText: string): ApiProperty[] {
  const sourceFile = ts.createSourceFile('props.ts', sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const aliases = buildTypeAliasMap(sourceFile);
  const propsObject = getObjectLiteralFromPropsSource(sourceFile);

  if (!propsObject) {
    return [];
  }

  return propsObject.properties.flatMap(property => {
    if (!ts.isPropertyAssignment(property)) {
      return [];
    }

    const propName = property.name.getText(sourceFile);
    const propInitializer = unwrapExpression(property.initializer);

    if (!ts.isObjectLiteralExpression(propInitializer)) {
      return [];
    }

    const members = new Map<string, ts.PropertyAssignment>();

    for (const member of propInitializer.properties) {
      if (ts.isPropertyAssignment(member) && ts.isIdentifier(member.name)) {
        members.set(member.name.text, member);
      }
    }

    const typeMember = members.get('type');
    const defaultMember = members.get('default');

    return [
      {
        name: propName,
        type: typeMember
          ? stringifyInitializerType(typeMember.initializer, aliases, sourceFile)
          : 'unknown',
        default: defaultMember ? defaultMember.initializer.getText(sourceFile) : undefined,
        description: getCommentText(sourceText, property)
      }
    ];
  });
}

export function readApiProperties(componentDir: string): ApiProperty[] {
  const propsSourcePath = resolve(componentDir, 'props.ts');

  try {
    return readPropsMetadataFromSource(readFileSync(propsSourcePath, 'utf8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read props metadata from ${propsSourcePath}: ${message}`);
  }
}

export function readApiPropertiesFromPropsSource(sourceText: string): ApiProperty[] {
  return readPropsMetadataFromSource(sourceText);
}
