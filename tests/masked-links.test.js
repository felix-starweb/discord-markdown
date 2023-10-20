import { expect, test } from 'vitest';
import { render } from '../src/index';
import SimpleMarkdown from '@khanacademy/simple-markdown';

test('Masked links are handled correctly', () => {
  expect(render('[Test](https://test.com)', {inline: true}))
    .toBe('<a class="d-masked-link" href="https://test.com">Test</a>');
});

test('Masked links are handled correctly', () => {
  expect(SimpleMarkdown.markdownToHtml('[Test](https://test.com)'))
    .toBe('<a class="d-masked-link" href="https://test.com">Test</a>');
});

// test('Wrapped Masked links are handled correctly', () => {
//   expect(render('<[Test](https://test.com)>', ))
//     .toBe('[Test](https://test.com)');
// });
