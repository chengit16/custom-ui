import type { GlobalThemeOverrides } from 'naive-ui';

export interface CustomThemeOptions {
  primaryColor?: string;
}

export function createCustomTheme(options: CustomThemeOptions = {}): GlobalThemeOverrides {
  const primaryColor = options.primaryColor ?? '#18a058';

  return {
    common: {
      primaryColor,
      primaryColorHover: primaryColor,
      primaryColorPressed: primaryColor
    }
  };
}
