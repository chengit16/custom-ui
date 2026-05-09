/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from 'vitest';
import { createApp, nextTick } from 'vue';

import { CustomModal } from '../index';

describe('CustomModal', () => {
  it('exports the component', () => {
    expect(CustomModal).toBeTruthy();
  });

  it('renders title and content when show is true', async () => {
    const host = document.createElement('div');
    const app = createApp({
      components: { CustomModal },
      template: `
        <CustomModal :show="true" title="确认操作">
          操作内容
        </CustomModal>
      `
    });

    app.mount(host);
    await nextTick();

    expect(document.body.textContent).toContain('确认操作');
    expect(document.body.textContent).toContain('操作内容');

    app.unmount();
  });

  it('emits update and close events when closed', async () => {
    const host = document.createElement('div');
    const updates: boolean[] = [];
    const closes: string[] = [];
    const app = createApp({
      components: { CustomModal },
      setup() {
        return {
          closes,
          updates
        };
      },
      template: `
        <CustomModal
          :show="true"
          title="确认操作"
          @update:show="updates.push($event)"
          @close="closes.push('close')"
        >
          操作内容
        </CustomModal>
      `
    });

    app.mount(host);
    await nextTick();

    const closeButton = document.body.querySelector('.n-base-close');
    expect(closeButton).not.toBeNull();

    closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(updates).toEqual([false]);
    expect(closes).toEqual(['close']);

    app.unmount();
  });
});
