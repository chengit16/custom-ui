import { describe, expect, it } from 'vitest';

import { CustomSmokeTest } from '../index';

describe('CustomSmokeTest', () => {
  it('exports the component', () => {
    expect(CustomSmokeTest).toBeTruthy();
  });
});
