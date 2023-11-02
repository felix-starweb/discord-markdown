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

test('Sample two is handled correctly', () => {
  expect(render(  
    '```js\n' +
    'import discordMarkdown from "(path to file)"\n' +
    'console.log(discordMarkdown)\n' +
    '```\n' +
    '```c++\n' +
    'int x = 0;\n' +
    'Console.WriteLine(x);\n' +
    '```\n' +
    '```csharp\n' +
    'int x = 0;\n' +
    'Console.WriteLine(x);\n' +
    '```\n' +
    '# Heading 1\n' +
    '## Heading 2\n' +
    '### Heading 3\n' +
    '#### Heading 4 (Not intended to work, Should have 1 extra #)\n' +
    '##### Heading 5 (Not intended to work, Should have 2 extra #)\n' +
    '###### Heading 6 (Not intended to work, Should have 3 extra #)\n' +
    '####### Heading 7 (Not intended to work, Should have 4 extra #)\n' +
    '- Item 1\n' +
    '- Item 2\n' +
    '  - Sub item 1\n' +
    '  - Sub item 2\n' +
    '- Item 3\n' +
    '\n' +
    '1. Item 1\n' +
    '  1. Sub item 1\n' +
    '  2. Sub item 2\n' +
    '2. Item 2\n' +
    '3. Item 3\n' +
    '\n' +
    '[Masked link](https://test.com)\n' +
    '<[Wrapped Masked link](https://test.com)>\n' +
    'Just a paragraph. Maybe with a [link](https://test.com). Seems to work.\n' +
    'Does autolink work? https://test.com \n' +
    'Does the autolink unwrap? <https://test.com>\n'
  ))
    .toBe(
      '<pre class="d-code"><code class="hljs language-js"><span class="hljs-keyword">import</span> discordMarkdown <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;(path to file)&quot;</span>\n' +
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(discordMarkdown)</code></pre><br><pre class="d-code"><code class="hljs language-c++"><span class="hljs-type">int</span> x = <span class="hljs-number">0</span>;\n' +
      'Console.<span class="hljs-built_in">WriteLine</span>(x);</code></pre><br><pre class="d-code"><code class="hljs language-csharp"><span class="hljs-built_in">int</span> x = <span class="hljs-number">0</span>;\n' +
      'Console.WriteLine(x);</code></pre><br><h1 class="d-header">Heading 1</h1><h2 class="d-header">Heading 2</h2><h3 class="d-header">Heading 3</h3><h3 class="d-header"># Heading 4 (Not intended to work, Should have 1 extra #)</h3><h3 class="d-header">## Heading 5 (Not intended to work, Should have 2 extra #)</h3><h3 class="d-header">### Heading 6 (Not intended to work, Should have 3 extra #)</h3><h3 class="d-header">#### Heading 7 (Not intended to work, Should have 4 extra #)</h3><ul class="d-list d-unordered-lists d-list-parent"><li class="d-list-item">Item 1</li><li class="d-list-item">Item 2<ul class="d-list d-unordered-lists"><li class="d-list-item">Sub item 1</li><li class="d-list-item">Sub item 2</li></ul></li><li class="d-list-item">Item 3</li></ul><br><ol class="d-list d-ordered-lists d-list-parent"><li class="d-list-item">Item 1<ol class="d-list d-ordered-lists"><li class="d-list-item">Sub item 1</li><li class="d-list-item">Sub item 2</li></ol></li><li class="d-list-item">Item 2</li><li class="d-list-item">Item 3</li></ol><br><a class="d-masked-link" href="https://test.com">Masked link</a><br><<a class="d-masked-link" href="https://test.com">Wrapped Masked link</a>><br>Just a paragraph. Maybe with a <a class="d-masked-link" href="https://test.com">link</a>. Seems to work.<br>Does autolink work? <a class="d-auto-link" href="https://test.com">https://test.com</a> <br>Does the autolink unwrap? <a class="d-auto-link" href="https://test.com">https://test.com</a><br>'
    );
});


