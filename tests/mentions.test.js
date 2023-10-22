import { expect, test } from 'vitest';
import { render } from '../src/index';

test('User mentions are handled correctly', () => {
  expect(render('<@!252124921398951936>'))
    .toBe('<span class="d-mention d-user">@252124921398951936</span><br><br>');
});

test('Channel mentions are handled correctly', () => {
  expect(render('<#775370007378001930>'))
    .toBe('<span class="d-mention d-channel">#775370007378001930</span>');
});

test('Role mentions are handled correctly', () => {
  expect(render('<@&340184458302980098>'))
    .toBe('<span class="d-mention d-role">@340184458302980098</span>');
});

test('Everyone mentions are handled correctly', () => {
  expect(render('@everyone'))
    .toBe('<span class="d-mention d-user">@everyone</span>');
});

test('Here mentions are handled correctly', () => {
  expect(render('@here'))
    .toBe('<span class="d-mention d-user">@here</span>');
});
