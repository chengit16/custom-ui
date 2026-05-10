import type { PropType } from 'vue';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';
export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';
export type ButtonGroupDirection = 'horizontal' | 'vertical';

export const ButtonProps = {
  /**
   * 按钮类型测试1
   *
   * 用于控制按钮的语义色，可选值为 `default`、`primary`、`success`、`info`、`warning`、`error`。
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  /** 是否使用次要按钮样式 */
  secondary: {
    type: Boolean,
    default: false,
  },
  /** 是否使用次次要按钮样式 */
  tertiary: {
    type: Boolean,
    default: false,
  },
  /** 是否使用次次次要按钮样式 */
  quaternary: {
    type: Boolean,
    default: false,
  },
  /** 是否加粗按钮样式 */
  strong: {
    type: Boolean,
    default: false,
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
  },
  /** 是否禁用按钮 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否展示加载状态 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 是否让按钮宽度撑满父容器 */
  block: {
    type: Boolean,
    default: false,
  },
  /** 是否使用文本按钮样式 */
  text: {
    type: Boolean,
    default: false,
  },
  /** 是否使用圆角按钮 */
  round: {
    type: Boolean,
    default: false,
  },
  /** 是否使用圆形按钮 */
  circle: {
    type: Boolean,
    default: false,
  },
  /** 是否使用幽灵按钮样式 */
  ghost: {
    type: Boolean,
    default: false,
  },
  /** 是否使用虚线按钮样式 */
  dashed: {
    type: Boolean,
    default: false,
  },
  /** 按钮颜色 */
  color: {
    type: String,
    default: undefined,
  },
  /** 图标位置 */
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
} as const;

export const ButtonGroupProps = {
  /** 排列方向 */
  direction: {
    type: String as PropType<ButtonGroupDirection>,
    default: 'horizontal',
  },
  /** 按钮间距，数字会按 px 处理 */
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 12,
  },
  /** 是否占满父容器宽度 */
  block: {
    type: Boolean,
    default: false,
  },
} as const;
