import type { PropType } from 'vue';

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';

export const ButtonProps = {
  /** 按钮类型，对应 Naive UI Button 的 type */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  /** 是否禁用按钮 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否展示加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否让按钮宽度撑满父容器 */
  block: {
    type: Boolean,
    default: false
  },
  /** 是否使用次要按钮样式 */
  secondary: {
    type: Boolean,
    default: false
  },
  /** 是否使用文本按钮样式 */
  text: {
    type: Boolean,
    default: false
  },
  /** 是否使用圆角按钮 */
  round: {
    type: Boolean,
    default: false
  },
  /** 是否使用圆形按钮 */
  circle: {
    type: Boolean,
    default: false
  },
  /** 是否使用幽灵按钮样式 */
  ghost: {
    type: Boolean,
    default: false
  },
  /** 是否使用虚线按钮样式 */
  dashed: {
    type: Boolean,
    default: false
  }
} as const;
