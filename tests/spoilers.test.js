import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Spoilers are handled correctly', () => {
  expect(render('||test||'))
    .toBe('<span class=\"d-spoiler\">test</span>');
  expect(render('|| test ||'))
    .toBe('<span class=\"d-spoiler\"> test </span>');
  expect(render('|| spoiler | message ||'))
    .toBe('<span class="d-spoiler"> spoiler | message </span>');
  expect(render('a ||spoiler|| may have ||multiple\nlines||'))
    .toBe(`a <span class="d-spoiler">spoiler</span> may have <span class="d-spoiler">multiple<br>lines</span>`);
});

