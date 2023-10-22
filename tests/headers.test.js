import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Header 1 is handled correctly', () => {
  expect(render('# Test'))
    .toBe('<h1 class="d-header">Test</h1><br>');
});

test('Header 2 is handled correctly', () => {
  expect(render('## Test'))
    .toBe('<h2 class="d-header">Test</h2><br>');
});

test('Header 3 is handled correctly', () => {
  expect(render('### Test'))
    .toBe('<h3 class="d-header">Test</h3><br>');
});

test('Header 4 is handled correctly', () => {
  expect(render('#### Test'))
    .toBe('<h3 class="d-header"># Test</h3><br>');
});

test('Header 5 is handled correctly', () => {
  expect(render('##### Test'))
    .toBe('<h3 class="d-header">## Test</h3><br>');
});

test('Header 6 is handled correctly', () => {
  expect(render('###### Test'))
    .toBe('<h3 class="d-header">### Test</h3><br>');
});
