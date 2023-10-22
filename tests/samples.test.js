import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Sample one is handled correctly', () => {
  expect(render(
    '# Test\n' +
    'Testing\n' +
    '## Test\n' +
    '1. Item 1\n' +
    '2. Item 2\n' +
    '  3. Sub-item 2.1\n' +
    '  4. Sub-item 2.2\n' +
    '5. Item 3\n'
  ))
    .toBe('<h1 class="d-header">Test</h1>Testing<br><h2 class="d-header">Test</h2><ol class="d-list d-ordered-lists d-list-parent"><li class="d-list-item">Item 1</li><li class="d-list-item">Item 2<ol class="d-list d-ordered-lists"><li class="d-list-item">Sub-item 2.1</li><li class="d-list-item">Sub-item 2.2</li></ol></li><li class="d-list-item">Item 3</li></ol>');
});

test(() => {
  expect(render(  
    '```js' +
    'import discordMarkdown from "(path to file)"' +
    'console.log(discordMarkdown)' +
    '```' +
    '```c++' +
    'int x = 0;' +
    'Console.WriteLine(x);' +
    '```' +
    '```csharp' +
    'int x = 0;' +
    'Console.WriteLine(x);' +
    '```' +
    '# Heading 1' +
    '## Heading 2' +
    '### Heading 3' +
    '#### Heading 4 (Not intended to work, Should have 1 extra #)' +
    '##### Heading 5 (Not intended to work, Should have 2 extra #)' +
    '###### Heading 6 (Not intended to work, Should have 3 extra #)' +
    '####### Heading 7 (Not intended to work, Should have 4 extra #)' +
    '- Item 1' +
    '- Item 2' +
    '  - Sub item 1' +
    '  - Sub item 2' +
    '- Item 3' +
    '\n' +
    '1. Item 1' +
    '  1. Sub item 1' +
    '  2. Sub item 2' +
    '2. Item 2' +
    '3. Item 3' +
    '\n' +
    '[Masked link](https://test.com)' +
    '<[Wrapped Masked link](https://test.com)>' +
    'Just a paragraph. Maybe with a [link](https://test.com). Seems to work.' +
    'Does autolink work? https://test.com ' +
    'Does the autolink unwrap? <https://test.com>'
  ))
    .toBe();
});
