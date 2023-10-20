import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Block quotes is handled correctly', () => {
//   expect(render('> text > here'))
//     .toBe('<blockquote>text &gt; here</blockquote>');

//   expect(render('> text\nhere'))
//     .toBe('<blockquote>text' +
// '</blockquote>here');

//   expect(render('>text'))
//     .toBe('&gt;text');

  // expect(render('outside\n>>> inside\ntext\n> here\ndoes not end'))
  //   .toBe('outside<br><blockquote>inside<br>text<br>&gt; here<br>does not end</blockquote>');
  // expect(render('>>> test\n```js\ncode```'))
  // .toBe('<blockquote>test<br><pre><code class="hljs js">code</code></pre></blockquote>');
  // expect(render('> text\n> \n> here'))
  // .toBe('<blockquote>text<br><br>here</blockquote>');
  // expect(render('text\n\n> Lorem ipsum\n>> Lorem ipsum\n> Lorem ipsum\n> > Lorem ipsum\n> Lorem ipsum\n\nLorem ipsum\n\n> Lorem ipsum\n\nLorem ipsum\n\n>>> text\ntext\ntext\n'))
  // .toBe('text<br><br><blockquote>Lorem ipsum<br></blockquote>&gt;&gt; Lorem ipsum<br><blockquote>Lorem ipsum<br>&gt; Lorem ipsum<br>Lorem ipsum<br></blockquote><br>Lorem ipsum<br><br><blockquote>Lorem ipsum<br></blockquote><br>Lorem ipsum<br><br><blockquote>text<br>text<br>text<br></blockquote>');
});

// test('Code blocks is handled correctly', () => {
//   expect(render(
//     '```js\n' +
//     'const test = true\n' +
//     '```'
//   ))
//     .toBe('<pre><code class="hljs language-js"><span class="hljs-keyword">const</span> test = <span class="hljs-literal">true</span></code></pre><br><br>');
//   expect(render(
//     '```js\n' +
//     'const test = true\n' +
//     'const function = () => {\n' +
//     ' const test = true\n' +
//     '}\n' +
//     '```'
//   ))
//     .toBe(
//       '<pre><code class="hljs language-js"><span class="hljs-keyword">const</span> test = <span class="hljs-literal">true</span>\n' +
//       '<span class="hljs-keyword">const</span> <span class="hljs-title function_">function</span> = (<span class="hljs-params"></span>) =&gt; {\n' +
//       ' <span class="hljs-keyword">const</span> test = <span class="hljs-literal">true</span>\n' +
//       '}</code></pre>'
//     );
  
// });

// test('Inline code is handled correctly', () => {
// });
