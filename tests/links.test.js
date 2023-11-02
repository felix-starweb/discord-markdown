import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Masked links are handled correctly', () => {
  expect(render('[Test](https://test.com)'))
    .toBe('<a class="d-masked-link" href="https://test.com">Test</a>');
});

test('Wrapped Masked links are handled correctly', () => {
  expect(render('<[Test](https://test.com)>'))
    .toBe('<<a class="d-masked-link" href="https://test.com">Test</a>>');
});

test('Auto links are handeld correctly', () => {
  expect(render('https://test.com'))
    .toBe('<a class="d-auto-link" href="https://test.com">https://test.com</a>');
  expect(render('https://test.com\ntest'))
    .toBe('<a class="d-auto-link" href="https://test.com">https://test.com</a><br>test');
  expect(render('https://test.com test'))
    .toBe('<a class="d-auto-link" href="https://test.com">https://test.com</a> test');
});

test('Wrapped Auto links are handled correctly', () => {
  expect(render('<https://test.com>'))
    .toBe('<a class="d-auto-link" href="https://test.com">https://test.com</a>');
  expect(render('<https://test.com>\ntest'))
    .toBe('<a class="d-auto-link" href="https://test.com">https://test.com</a><br>test');
  expect(render('<https://test.com> test'))
    .toBe('<a class="d-auto-link" href="https://test.com">https://test.com</a> test');
});
