import { expect, test } from 'vitest';
import { createApp } from 'vue';
import markdown from '../src/index';

test('Render injected into Vue', () => {
  const app = createApp();
  app.use(markdown);
  expect(typeof app.config.globalProperties.$md_render === 'function')
    .toBe(true);
  expect(typeof app.config.globalProperties.$simple_markdown === 'object')
    .toBe(false);
  expect(typeof app.config.globalProperties.$highlightjs === 'object')
    .toBe(false);
  expect(typeof app.config.globalProperties.$getNestedHTML === 'function')
    .toBe(false);
  expect(typeof app.config.globalProperties.$getHTML === 'function')
    .toBe(false);
});

test('Simple-markdown injected into Vue', () => {
  const app = createApp();
  app.use(markdown, {inject_instances: true});
  expect(typeof app.config.globalProperties.$simple_markdown === 'object')
    .toBe(true);
});

test('Highlightjs injected into Vue', () => {
  const app = createApp();
  app.use(markdown, {inject_instances: true});
  expect(typeof app.config.globalProperties.$highlightjs === 'object')
    .toBe(true);
});

test('GetNestedHTML injected into Vue', () => {
  const app = createApp();
  app.use(markdown, {inject_parsers: true});
  expect(typeof app.config.globalProperties.$getNestedHTML === 'function')
    .toBe(true);
});

test('GetHTML injected into Vue', () => {
  const app = createApp();
  app.use(markdown, {inject_parsers: true});
  expect(typeof app.config.globalProperties.$getHTML === 'function')
    .toBe(true);
});
