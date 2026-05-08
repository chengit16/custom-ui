export interface ComponentNames {
  raw: string;
  pascal: string;
  kebab: string;
}

export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toPascalCase(value: string): string {
  return toKebabCase(value)
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function getComponentNames(input: string | undefined): ComponentNames {
  if (!input) {
    throw new Error('Component name is required. Example: pnpm create-component Button');
  }

  const pascal = toPascalCase(input);
  const kebab = toKebabCase(input);

  if (!pascal || !kebab) {
    throw new Error(`Invalid component name: ${input}`);
  }

  return {
    raw: input,
    pascal,
    kebab
  };
}
