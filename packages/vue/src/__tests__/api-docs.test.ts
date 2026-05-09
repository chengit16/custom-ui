import { describe, expect, it } from 'vitest';

import {
  readApiPropertiesFromPropsSource
} from '../../../../scripts/shared/api-docs';

describe('api docs parser', () => {
  it('reads property docs and resolves local type aliases', () => {
    const api = readApiPropertiesFromPropsSource(`
      import type { PropType } from 'vue';

      type ButtonType = 'default' | 'primary';

      export const ButtonProps = {
        /** 按钮类型 */
        type: {
          type: String as PropType<ButtonType>,
          default: 'default'
        },
        /** 是否禁用按钮 */
        disabled: {
          type: Boolean,
          default: false
        }
      } as const;
    `);

    expect(api).toEqual([
      {
        name: 'type',
        type: "'default' | 'primary'",
        default: "'default'",
        description: '按钮类型'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: '是否禁用按钮'
      }
    ]);
  });
});
