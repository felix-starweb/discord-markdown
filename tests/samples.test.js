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
    .toBe('<h1 class="d-header">Test</h1><br>Testing<h2 class="d-header">Test</h2><ol class="d-list d-ordered-lists d-list-parent"><li>Item 1</li><li>Item 2<ol class="d-list d-ordered-lists"><li>Sub-item 2.1</li><li>Sub-item 2.2</li></ol></li><li>Item 3</li></ol>');
});

