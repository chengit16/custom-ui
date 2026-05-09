import type { PropType } from 'vue';

export type ModalPreset = 'dialog' | 'card';

export const ModalProps = {
  /** 是否显示弹窗 */
  show: {
    type: Boolean,
    default: false
  },
  /** 弹窗标题 */
  title: {
    type: String,
    default: ''
  },
  /** 弹窗宽度 */
  width: {
    type: [Number, String] as PropType<number | string>,
    default: 520
  },
  /** 弹窗预设样式 */
  preset: {
    type: String as PropType<ModalPreset>,
    default: 'card'
  },
  /** 点击遮罩是否关闭弹窗 */
  maskClosable: {
    type: Boolean,
    default: true
  },
  /** 是否显示关闭按钮 */
  closable: {
    type: Boolean,
    default: true
  },
  /** 是否使用内置边框 */
  bordered: {
    type: Boolean,
    default: false
  },
  /** 是否自动聚焦弹窗内容 */
  autoFocus: {
    type: Boolean,
    default: true
  }
} as const;
