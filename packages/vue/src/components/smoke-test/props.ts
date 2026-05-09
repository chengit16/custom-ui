import type { PropType } from 'vue';

export const SmokeTestProps = {
  /** 变体 */
  variant: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default'
  }
} as const;
