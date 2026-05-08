import type { ApiProperty } from '../../scripts-api';

export const api: ApiProperty[] = [
  {
    name: 'type',
    type: "'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'",
    default: "'default'"
  },
  {
    name: 'size',
    type: "'tiny' | 'small' | 'medium' | 'large'",
    default: "'medium'"
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'block',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'secondary',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'text',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'round',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'circle',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'ghost',
    type: 'boolean',
    default: 'false'
  },
  {
    name: 'dashed',
    type: 'boolean',
    default: 'false'
  }
];
