import { describe, expect, it } from 'vitest';

import {
  mergeApiPropertiesWithFallback,
  readApiPropertiesFromPropsSource
} from '../../../../scripts/shared/api-docs';

describe('api docs parser', () => {
  it('reads property docs from props.ts annotations', () => {
    const api = readApiPropertiesFromPropsSource(`
      import type { PropType } from 'vue';

      export const ButtonProps = {
        /** 按钮类型 */
        type: {
          type: String as PropType<'default' | 'primary'>,
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

  it('uses api.ts metadata as a fallback when props annotations are missing', () => {
    expect(
      mergeApiPropertiesWithFallback(
        [
          {
            name: 'type',
            type: "'default' | 'primary'",
            default: "'default'",
            description: ''
          }
        ],
        [
          {
            name: 'type',
            type: "'default' | 'primary'",
            default: "'default'",
            description: '按钮类型'
          }
        ]
      )
    ).toEqual([
      {
        name: 'type',
        type: "'default' | 'primary'",
        default: "'default'",
        description: '按钮类型'
      }
    ]);
  });
});
