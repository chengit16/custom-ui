import type { PropType } from 'vue';

export const SmokeTestProps = {
  variant: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default'
  }
} as const;
