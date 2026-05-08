import { describe, expect, it } from 'vitest';

import { createCustomTheme, CustomProvider } from '../index';

describe('@custom-ui/vue exports', () => {
  it('exports the provider and theme helper', () => {
    expect(CustomProvider).toBeTruthy();
    expect(createCustomTheme({ primaryColor: '#2080f0' }).common?.primaryColor).toBe('#2080f0');
  });
});
