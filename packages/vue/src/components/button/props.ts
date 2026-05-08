import type { PropType } from 'vue';

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';

export const ButtonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  secondary: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  dashed: {
    type: Boolean,
    default: false
  }
} as const;
