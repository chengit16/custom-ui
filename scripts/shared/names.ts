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

  if (!/^[A-Za-z][A-Za-z0-9\s_-]*$/.test(input)) {
    throw new Error(
      `Invalid component name: ${input}. Use letters, numbers, spaces, underscores, or hyphens.`
    );
  }

  const pascal = toPascalCase(input);
  const kebab = toKebabCase(input);

  if (!pascal || !kebab || !/^[a-z][a-z0-9-]*$/.test(kebab)) {
    throw new Error(`Invalid component name: ${input}`);
  }

  return {
    raw: input,
    pascal,
    kebab
  };
}
