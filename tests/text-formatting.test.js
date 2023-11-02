import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Italics is handled correctly', () => {
  expect(render('*italics*'))
    .toBe('<em class="d-text d-italics">italics</em>');
  expect(render('***italics bold***'))
    .toBe('<em class="d-text d-italics"><strong class="d-text d-bold">italics bold</strong></em>');
  expect(render('__*italics underline*__'))
    .toBe('<u class="d-text d-underline"><em class="d-text d-italics">italics underline</em></u>');
  expect(render('*__italics underline__*'))
    .toBe('<em class="d-text d-italics"><u class="d-text d-underline">italics underline</u></em>');
  expect(render('~~*italics strikethrough*~~'))
    .toBe('<del class="d-text d-strikethrough"><em class="d-text d-italics">italics strikethrough</em></del>');
  expect(render('*~~italics strikethrough~~*'))
    .toBe('<em class="d-text d-italics"><del class="d-text d-strikethrough">italics strikethrough</del></em>');
});

test('Bold is handled correctly', () => {
  expect(render('**bold**'))
    .toBe('<strong class="d-text d-bold">bold</strong>');
  expect(render('__**bold underline**__'))
    .toBe('<u class="d-text d-underline"><strong class="d-text d-bold">bold underline</strong></u>');
  expect(render('__**bold underline**__'))
    .toBe('<u class="d-text d-underline"><strong class="d-text d-bold">bold underline</strong></u>');
  expect(render('~~**bold strikethrough**~~'))
    .toBe('<del class="d-text d-strikethrough"><strong class="d-text d-bold">bold strikethrough</strong></del>');
  expect(render('**~~bold strikethrough~~**'))
    .toBe('<strong class="d-text d-bold"><del class="d-text d-strikethrough">bold strikethrough</del></strong>');
});

test('Underline is handled correctly', () => {
  expect(render('__underline__'))
    .toBe('<u class="d-text d-underline">underline</u>');
  expect(render('~~__underline strikethrough__~~'))
    .toBe('<del class="d-text d-strikethrough"><u class="d-text d-underline">underline strikethrough</u></del>');
  expect(render('__~~underline strikethrough~~__'))
    .toBe('<u class="d-text d-underline"><del class="d-text d-strikethrough">underline strikethrough</del></u>');
});
test('Strikethrough is handled correctly', () => {
  expect(render('~~Strikethrough~~'))
    .toBe('<del class="d-text d-strikethrough">Strikethrough</del>');
});



// test('Combinations of text formatting are handled correctly', () => {
//   const formats = [
//     '*',
//     '**',
//     '__',
//     '~~'
//   ];

//   const combinations = combination_ordered(formats);
  
//   function* combinationN (array, n) {
//     if (n === 1) {
//       for (const a of array) {
//         yield [a];
//       }
//       return;
//     }
  
//     for (let i = 0; i <= array.length - n; i++) {
//       for (const c of combinationN(array.slice(i + 1), n - 1)) {
//         yield [array[i], ...c];
//       }
//     }
//   }
  
//   function* combination_ordered (array) {
//     for (let i = 1; i <= array.length; i++) {
//       yield * combinationN(array, i);
//     }
//   }

//   for (const iterator of combinations) {
//     const formatting = iterator.toString().replaceAll(',', '')
//     expect(render(`${formatting}test${formatting.reverse()}`))
//       .toBe('');
//   }
// });
