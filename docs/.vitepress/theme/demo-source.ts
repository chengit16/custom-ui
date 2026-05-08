export interface DemoSource {
  code: string;
}

export function normalizeDemoSource(source: string): DemoSource {
  return {
    code: source.trim()
  };
}
