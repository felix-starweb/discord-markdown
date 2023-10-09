import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Masked links are handled correctly', () => {
  expect(render('[Test](https://test.com)'))
    .toBe('<a class="d-masked-links" href="https://test.com">Test</a>');
});

test('Wrapped Masked links are handled correctly', () => {
  expect(render('<[Test](https://test.com)>'))
    .toBe('[Test](https://test.com)');
});
