import { expect, test } from 'vitest';
import { render } from '../src/index';

test('Italic is handled correctly', () => {
  expect(render('*italics*'))
    .toBe('<span class="d-text d-italics">italics</span>');
  expect(render('test*italics*'))
    .toBe('test<span class="d-text d-italics">italics</span>');
  expect(render('test*italics*test'))
    .toBe('test<span class="d-text d-italics">italics</span>test');
  expect(render('*italics*test'))
    .toBe('<span class="d-text d-italics">italics</span>test');
});

test('Underline Italic is handled correctly', () => {
  expect(render('__*underline italics*__'))
    .toBe('<span class="d-text d-underline-italics">underline italics</span>');
  expect(render('test__*underline italics*__'))
    .toBe('test<span class="d-text d-underline-italics">underline italics</span>');
  expect(render('test__*underline italics*__test'))
    .toBe('test<span class="d-text d-underline-italics">underline italics</span>test');
  expect(render('__*underline italics*__test'))
    .toBe('<span class="d-text d-underline-italics">underline italics</span>test');
});

test('Bold is handled correctly', () => {
  expect(render('**bold**'))
    .toBe('<span class="d-text d-bold">bold</span>');
  expect(render('test**bold**'))
    .toBe('test<span class="d-text d-bold">bold</span>');
  expect(render('test**bold**test'))
    .toBe('test<span class="d-text d-bold">bold</span>test');
  expect(render('**bold**test'))
    .toBe('<span class="d-text d-bold">bold</span>test');
});

test('Underline Bold is handled correctly', () => {
  expect(render('__**underline bold**__'))
    .toBe('<span class="d-text d-underline-bold">underline bold</span>');
  expect(render('test__**underline bold**__'))
    .toBe('test<span class="d-text d-underline-bold">underline bold</span>');
  expect(render('test__**underline bold**__test'))
    .toBe('test<span class="d-text d-underline-bold">underline bold</span>test');
  expect(render('__**underline bold**__test'))
    .toBe('<span class="d-text d-underline-bold">underline bold</span>test');
});

test('Bold Italic is handled correctly', () => {
  expect(render('***bold italics***'))
    .toBe('<span class="d-text d-bold-italics">bold italics</span>');
  expect(render('test***bold italics***'))
    .toBe('test<span class="d-text d-bold-italics">bold italics</span>');
  expect(render('test***bold italics***test'))
    .toBe('test<span class="d-text d-bold-italics">bold italics</span>test');
  expect(render('***bold italics***test'))
    .toBe('<span class="d-text d-bold-italics">bold italics</span>test');
});

test('Underline Bold Italic is handled correctly', () => {
  expect(render('__***underline bold italics***__'))
    .toBe('<span class="d-text d-underline-bold-italics">underline bold italics</span>');
  expect(render('test__***underline bold italics***__'))
    .toBe('test<span class="d-text d-underline-bold-italics">underline bold italics</span>');
  expect(render('test__***underline bold italics***__test'))
    .toBe('test<span class="d-text d-underline-bold-italics">underline bold italics</span>test');
  expect(render('__***underline bold italics***__test'))
    .toBe('<span class="d-text d-underline-bold-italics">underline bold italics</span>test');
});

test('Underline is handled correctly', () => {
  expect(render('__underline__'))
    .toBe('<span class="d-text d-underline">underline</span>');
  expect(render('test__underline__'))
    .toBe('test<span class="d-text d-underline">underline</span>');
  expect(render('test__underline__test'))
    .toBe('test<span class="d-text d-underline">underline</span>test');
  expect(render('__underline__test'))
    .toBe('<span class="d-text d-underline">underline</span>test');
});

test('Strikethrough is handled correctly', () => {
  expect(render('~~Strikethrough~~'))
    .toBe('<span class="d-text d-strikethrough">Strikethrough</span>');
  expect(render('test~~Strikethrough~~'))
    .toBe('test<span class="d-text d-strikethrough">Strikethrough</span>');
  expect(render('test~~Strikethrough~~test'))
    .toBe('test<span class="d-text d-strikethrough">Strikethrough</span>test');
  expect(render('~~Strikethrough~~test'))
    .toBe('<span class="d-text d-strikethrough">Strikethrough</span>test');
});
