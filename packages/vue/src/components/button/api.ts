import type { ApiProperty } from '../../scripts-api';

export const api: ApiProperty[] = [
  {
    name: 'type',
    type: "'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'",
    default: "'default'",
    description: '按钮类型，对应 Naive UI Button 的 type。'
  },
  {
    name: 'size',
    type: "'tiny' | 'small' | 'medium' | 'large'",
    default: "'medium'",
    description: '按钮尺寸。'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: '是否禁用按钮。'
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: '是否展示加载状态。'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false',
    description: '是否让按钮宽度撑满父容器。'
  },
  {
    name: 'secondary',
    type: 'boolean',
    default: 'false',
    description: '是否使用次要按钮样式。'
  },
  {
    name: 'text',
    type: 'boolean',
    default: 'false',
    description: '是否使用文本按钮样式。'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false',
    description: '是否使用圆角按钮。'
  },
  {
    name: 'circle',
    type: 'boolean',
    default: 'false',
    description: '是否使用圆形按钮。'
  },
  {
    name: 'ghost',
    type: 'boolean',
    default: 'false',
    description: '是否使用幽灵按钮样式。'
  },
  {
    name: 'dashed',
    type: 'boolean',
    default: 'false',
    description: '是否使用虚线按钮样式。'
  }
];
