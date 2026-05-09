/* eslint-disable vue/one-component-per-file, vue/order-in-components */
import { describe, expect, it } from 'vitest';
import { createApp, nextTick } from 'vue';

import { CustomButton, CustomButtonGroup } from '../index';

describe('CustomButton', () => {
  it('exports the component', () => {
    expect(CustomButton).toBeTruthy();
  });

  it('wraps Naive UI button behavior with typed props and click forwarding', async () => {
    const host = document.createElement('div');
    let clicks = 0;

    const app = createApp({
      components: { CustomButton },
      template: `
        <CustomButton type="primary" size="small" :loading="loading" @click="clicks += 1">
          保存
        </CustomButton>
      `,
      data() {
        return {
          clicks,
          loading: false,
        };
      },
      watch: {
        clicks(value: number) {
          clicks = value;
        },
      },
    });

    app.mount(host);
    await nextTick();

    const button = host.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('保存');

    button?.click();
    await nextTick();
    expect(clicks).toBe(1);

    app.unmount();
  });

  it('passes disabled state to the underlying button', async () => {
    const host = document.createElement('div');
    const app = createApp({
      components: { CustomButton },
      template: '<CustomButton disabled>不可用</CustomButton>',
    });

    app.mount(host);
    await nextTick();

    const button = host.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);

    app.unmount();
  });

  it('renders a button group container', async () => {
    const host = document.createElement('div');
    const app = createApp({
      components: { CustomButton, CustomButtonGroup },
      template: `
        <CustomButtonGroup :gap="12" block>
          <CustomButton type="primary">确定</CustomButton>
          <CustomButton secondary>取消</CustomButton>
        </CustomButtonGroup>
      `,
    });

    app.mount(host);
    await nextTick();

    const group = host.querySelector('.custom-button-group');
    const buttons = host.querySelectorAll('button');
    expect(group).not.toBeNull();
    expect(buttons.length).toBe(2);

    app.unmount();
  });

  it('forwards icon slot to the underlying button', async () => {
    const host = document.createElement('div');
    const app = createApp({
      components: { CustomButton },
      template: `
        <CustomButton type="primary">
          <template #icon>
            <span class="icon-slot">+</span>
          </template>
          新建
        </CustomButton>
      `,
    });

    app.mount(host);
    await nextTick();

    expect(host.querySelector('.icon-slot')).not.toBeNull();

    app.unmount();
  });
});
