import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Block quotes', () => {
  expect(render('> test > test'))
    .toBe('<blockquote>test &gt; test</blockquote>');
  expect(render('> test\ntest'))
    .toBe('<blockquote>test<br></blockquote>test');
  expect(render('>test'))
    .toBe('&gt;test');
  expect(render('outside\n>>> inside\ntest\n> test\ndoes not end'))
    .toBe('outside<br><blockquote>inside<br>test<br>&gt; test<br>does not end</blockquote>');
  expect(render('>>> test\n```js\ncode```'))
    .toBe('<blockquote>test<br><pre><code class="hljs js">code</code></pre></blockquote>');
  expect(render('> test\n> \n> test'))
    .toBe('<blockquote>test<br><br>test</blockquote>');
  expect(render('test\n\n> Lorem ipsum\n>> Lorem ipsum\n> Lorem ipsum\n> > Lorem ipsum\n> Lorem ipsum\n\nLorem ipsum\n\n> Lorem ipsum\n\nLorem ipsum\n\n>>> test\ntest\ntest\n'))
    .toBe('test<br><br><blockquote>Lorem ipsum<br></blockquote>&gt;&gt; Lorem ipsum<br><blockquote>Lorem ipsum<br>&gt; Lorem ipsum<br>Lorem ipsum<br></blockquote><br>Lorem ipsum<br><br><blockquote>Lorem ipsum<br></blockquote><br>Lorem ipsum<br><br><blockquote>test<br>test<br>test<br></blockquote>');
});

test('Code blocks', () => {
  expect(render(
    '```js\n' +
    'const test = true\n' +
    '```'
  ))
    .toBe('<pre><code class="hljs js"><span class="hljs-keyword">const</span> test = <span class="hljs-literal">true</span></code></pre>');
  expect(render(
    '```js\n' +
    'const test = true\n' +
    'const function = () => {\n' +
    ' const test = true\n' +
    '}\n' +
    '```'
  ))
    .toBe(
      '<pre><code class="hljs js"><span class="hljs-keyword">const</span> test = <span class="hljs-literal">true</span>\n' +
      '<span class="hljs-keyword">const</span> <span class="hljs-title function_">function</span> = (<span class="hljs-params"></span>) =&gt; {\n' +
      ' <span class="hljs-keyword">const</span> test = <span class="hljs-literal">true</span>\n' +
      '}</code></pre>'
    );
  
});
