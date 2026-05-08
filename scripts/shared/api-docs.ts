import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

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

function serializeTypeText(typeText: string): string {
  const propTypeMatch = typeText.match(/PropType<(.+)>$/s);

  if (propTypeMatch) {
    return propTypeMatch[1].trim();
  }

  if (typeText === 'String') {
    return 'string';
  }

  if (typeText === 'Number') {
    return 'number';
  }

  if (typeText === 'Boolean') {
    return 'boolean';
  }

  return typeText;
}

function serializeDefaultText(defaultText: string): string {
  return defaultText;
}

function readPropsMetadataFromSource(sourceText: string): ApiProperty[] {
  const sourceFile = ts.createSourceFile('props.ts', sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const propsObject = getObjectLiteralFromPropsSource(sourceFile);

  if (!propsObject) {
    return [];
  }

  return propsObject.properties.flatMap(property => {
    if (!ts.isPropertyAssignment(property)) {
      return [];
    }

    const propName = property.name.getText(sourceFile);
    if (!ts.isObjectLiteralExpression(unwrapExpression(property.initializer))) {
      return [];
    }

    const propObject = unwrapExpression(property.initializer) as ts.ObjectLiteralExpression;
    const members = new Map<string, ts.PropertyAssignment>();

    for (const member of propObject.properties) {
      if (ts.isPropertyAssignment(member) && ts.isIdentifier(member.name)) {
        members.set(member.name.text, member);
      }
    }

    const typeMember = members.get('type');
    const defaultMember = members.get('default');
    const description = getCommentText(sourceText, property);

    return [
      {
        name: propName,
        type: typeMember
          ? serializeTypeText(typeMember.initializer.getText(sourceFile))
          : 'unknown',
        default: defaultMember ? serializeDefaultText(defaultMember.initializer.getText(sourceFile)) : undefined,
        description
      }
    ];
  });
}

function mergeApiProperties(primary: ApiProperty[], fallback: ApiProperty[]): ApiProperty[] {
  const byName = new Map<string, ApiProperty>();

  for (const item of fallback) {
    byName.set(item.name, item);
  }

  for (const item of primary) {
    const existing = byName.get(item.name);

    if (!existing) {
      byName.set(item.name, item);
      continue;
    }

    byName.set(item.name, {
      name: item.name,
      type: item.type || existing.type,
      default: item.default ?? existing.default,
      description: item.description?.trim() ? item.description : existing.description
    });
  }

  return [...byName.values()];
}

export async function readApiProperties(componentDir: string): Promise<ApiProperty[]> {
  const propsSourcePath = resolve(componentDir, 'props.ts');
  const apiSourcePath = resolve(componentDir, 'api.ts');

  const propsMetadata = existsSync(propsSourcePath)
    ? readPropsMetadataFromSource(readFileSync(propsSourcePath, 'utf8'))
    : [];

  if (!existsSync(apiSourcePath)) {
    return propsMetadata;
  }

  const fallbackModule = (await import(pathToFileURL(apiSourcePath).href)) as { api?: ApiProperty[] };
  const fallbackMetadata = fallbackModule.api ?? [];

  return propsMetadata.length > 0
    ? mergeApiProperties(propsMetadata, fallbackMetadata)
    : fallbackMetadata;
}

export function readApiPropertiesFromPropsSource(sourceText: string): ApiProperty[] {
  return readPropsMetadataFromSource(sourceText);
}

export function mergeApiPropertiesWithFallback(primary: ApiProperty[], fallback: ApiProperty[]): ApiProperty[] {
  return mergeApiProperties(primary, fallback);
}
