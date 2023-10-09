import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Header 1 is handled correctly', () => {
  expect(render('# Test'))
    .toBe('<h1 class="d-header">Test</h1>');
});

test('Header 2 is handled correctly', () => {
  expect(render('## Test'))
    .toBe('<h2 class="d-header">Test</h2>');
});

test('Header 3 is handled correctly', () => {
  expect(render('### Test'))
    .toBe('<h3 class="d-header">Test</h3>');
});
