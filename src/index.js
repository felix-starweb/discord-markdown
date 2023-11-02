'use strict';

import markdown from '@khanacademy/simple-markdown';
import highlightjs from 'highlight.js';

import * as index from './index.css';
// import './index.d.ts';

const patterns = {
  br: /^\n/,
  text: /^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff-]|\n\n|\n|\w+:\S|$)/,

  user: /^<@!?([0-9]*)>/,
  channel: /^<#?([0-9]*)>/,
  role: /^<@&([0-9]*)>/,
  emoji: /^<(a?):(\w+):(\d+)>/,
  everyone: /^@everyone/,
  here: /^@here/,

  italics: /^\b_((?:__|\\[\s\S]|[^\\_])+?)_\b|^\*(?=\S)((?:\*\*|\\[\s\S]|\s+(?:\\[\s\S]|[^\s\*\\]|\*\*)|[^\s\*\\])+?)\*(?!\*)/,
  bold: /^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/,
  underline: /^__((?:\\[\s\S]|[^\\])+?)__(?!_)/,
  strikethrough: /^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/,

  heading: /^ *(#{1,3})( *.*)[\n]?/,
  autolink: /^<?(https?:\/\/[a-z0-9.]+)[>]?/,
  link: /^\[([^\]]+)\]\(([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*))\)/,
  unordered_lists: /^( *)((?:[*+-]|\d+\.)) [\s\S]+?(?:\n(?!\1(?:[*+-]|\d+\.|\s*) )|$)/,
  ordered_lists: /^( *)((?:\d.|\d+\.)) [\s\S]+?(?:\n(?!\1(?:\d.|\d+\.|\s*) )|$)/,

  blockQuote: {
    match: {
      main: /^$|\n *$/,
      ternary: /^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/,
    },
    isBlock: /^ *>>> ?/,
    removeSyntaxRegex: {
      true: /^ *>>> ?/,
      false: /^ *> ?/gm,
    },
  },
  codeBlock: /^```(([a-z0-9+#]+?)\n+)?\n*([^]+?)\n*```/i,
};

const inlineRegex = (pattern) => {
  return (source, state, prevCapture) => {
    const initial = state.inline;
    state.inline = true;
    const result = markdown.inlineRegex(pattern)(source, state, prevCapture);
    state.inline = initial;
    return result;
  };
};

const rules = {
  // General Rules
  text: Object.assign({ }, markdown.defaultRules.text, {
    match: inlineRegex(patterns.text),
    html: function (node, output, state) {
      if (state.escapeHTML){
        return markdown.sanitizeText(node.content);
      }
      return node.content;
    }
  }),
  br: Object.assign({ }, markdown.defaultRules.br, {
    match: (source, state, prevCapture) => {
      return markdown.anyScopeRegex(patterns.br)(source, state, prevCapture);
    },
    html: (node) => {
      return '<br>';
    },
  }),

  // Discord Mentions
  '@user': {
    order: 22,
    match: source => patterns.user.exec(source),
    parse: (capture) => {
      return {
        id: capture[1]
      };
    },
    html: (node, output, state) => { return getHTML('span', state.mentions.user(node), { class: 'd-mention d-user' }); }
  },
  '#channel': {
    order: 22,
    match: source => patterns.channel.exec(source),
    parse: (capture) => {
      return {
        id: capture[1]
      };
    },
    html: (node, output, state) => { return getHTML('span', state.mentions.channel(node), { class: 'd-mention d-channel' }); }
  },
  '@role': {
    order: 22,
    match: source => patterns.role.exec(source),
    parse: (capture) => {
      return {
        id: capture[1]
      };
    },
    html: (node, output, state) => { return getHTML('span', state.mentions.role(node), { class: 'd-mention d-role' }); }
  },
  '@everyone': {
    order: 22,
    match: source => patterns.everyone.exec(source),
    parse: () => {
      return {};
    },
    html: (node, output, state) => { return getHTML('span', state.mentions.everyone(node), { class: 'd-mention d-everyone' }); }
  },
  '@here': {
    order: 22,
    match: source => patterns.here.exec(source),
    parse: () => {
      return {};
    },
    html: (node, output, state) => { return getHTML('span', state.mentions.here(node), { class: 'd-mention d-here' }); }
  },

  // Text Formatting
  italics: Object.assign({}, markdown.defaultRules.em, {
    match: inlineRegex(patterns.italics),
    html: (node, output, state) => { return getHTML('em', output(node.content, state), { class: 'd-text d-italics' }, state); }
  }),
  bold: Object.assign({}, markdown.defaultRules.strong, {
    match: inlineRegex(patterns.bold),
    html: (node, output, state) => { return getHTML('strong', output(node.content, state), { class: 'd-text d-bold' }, state); }
  }),
  underline: Object.assign({}, markdown.defaultRules.u, {
    match: inlineRegex(patterns.underline),
    html: (node, output, state) => { return getHTML('u', output(node.content, state), { class: 'd-text d-underline' }, state); }
  }),
  strikethrough: Object.assign({}, markdown.defaultRules.del, {
    match: inlineRegex(patterns.strikethrough),
    html: (node, output, state) => { return getHTML('del', output(node.content, state), { class: 'd-text d-strikethrough' }, state); }
  }),

  // Organizational Text Formatting 
  heading: Object.assign({}, markdown.defaultRules.heading, {
    match: markdown.blockRegex(patterns.heading),
    html: (node, output, state) => { return getHTML(`h${node.level}`, output(node.content, state), { class: 'd-header' }, state); }
  }),
  unordered_lists : Object.assign({}, markdown.defaultRules.list, {
    match: source => patterns.unordered_lists.exec(source),
    parse: (capture, parse, state) => {
      const arr = capture[0].split(/\n/);
      const result = [];
      const indent = /^\s*/.exec(arr[0])[0].length;
      let latest_parent = {};
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (/^\s*$/.exec(item) !== null) {
          continue;
        }
        const item_indent = /^\s*/.exec(item)[0].length;
        const obj = {
          text: item.replace(/^\s*[*+-]\s/, ''),
          items: [],
        };
        if (indent === item_indent) {
          latest_parent = obj;
          result.push(obj);
        } else {
          latest_parent.items.push(obj);
        }
      }
      return {
        items: result
      };
    },
    html: (node, output, state) => {
      const listItems = getNestedHTML(node.items, {type: 'ul', classes: {list: 'd-list d-unordered-lists', item: 'd-list-item'}});
      return getHTML('ul', listItems, {class: 'd-list d-unordered-lists d-list-parent'});
    },
  }),
  ordered_lists : Object.assign({}, markdown.defaultRules.list, {
    match: source => patterns.ordered_lists.exec(source),
    parse: (capture, parse, state) => {
      const arr = capture[0].split(/\n/);
      const result = [];
      const indent = /^\s*/.exec(arr[0])[0].length;
      let latest_parent = {};
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (/^\s*$/.exec(item) !== null) {
          continue;
        }
        const item_indent = /^\s*/.exec(item)[0].length;
        const obj = {
          text: item.replace(/^\s*[\d]\.\s/, ''),
          items: [],
        };
        if (indent === item_indent) {
          latest_parent = obj;
          result.push(obj);
        } else {
          latest_parent.items.push(obj);
        }
      }
      return {
        items: result
      };
    },
    html: (node, output, state) => {
      const listItems = getNestedHTML(node.items, {type: 'ol', classes: {list: 'd-list d-ordered-lists', item: 'd-list-item'}});
      return getHTML('ol', listItems, {class: 'd-list d-ordered-lists d-list-parent'});
    },
  }),

  // Block quotes
  blockQuote: Object.assign({}, markdown.defaultRules.blockQuote, {
    match: (source, state, prevSource) => {
      return !/^$|\n *$/.test(prevSource) || state.inQuote ? null : /^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/.exec(source);
    },
    parse: (capture, parse, state) => {
      const all = capture[0];
      const isBlock = Boolean(/^ *>>> ?/.exec(all));
      const removeSyntaxRegex = isBlock ? /^ *>>> ?/ : /^ *> ?/gm;
      const content = all.replace(removeSyntaxRegex, '');
      return {
        content: parse(content, Object.assign({ }, state, { inQuote: true })),
        type: 'blockQuote'
      };
    }
  }),

  // Code block
  codeBlock: Object.assign({}, markdown.defaultRules.codeBlock, {
    match: inlineRegex(patterns.codeBlock),
    parse: (capture, parse, state) => {
      return {
        lang: (capture[2] || '').trim(),
        content: capture[3] || '',
        inQuote: state.inQuote || false
      };
    },
    html: (node, output, state) => {
      let code;
      if (node.lang && highlightjs.getLanguage(node.lang)) {
        code = highlightjs.highlight(node.content, { language: node.lang, ignoreIllegals: true });
      }
      return getHTML('pre', getHTML(
        'code', code ? code.value : markdown.sanitizeText(node.content), { class: `hljs ${code ? 'language-' + code.language : ''}` }, state
      ), { class: 'd-code' }, state);
    }
  }),
  inlineCode: Object.assign({}, markdown.defaultRules.inlineCode, {
    match: source => markdown.defaultRules.inlineCode.match.regex.exec(source),
    html: (node, output, state) => {
      return getHTML('code', markdown.sanitizeText(node.content.trim()), {class: 'd-inline-code'});
    }
  }),

  // Spoilers
  spoilers: {
    order: 0,
    match: source => /^\|\|([\s\S]+?)\|\|/.exec(source),
    parse: (capture, parse, state) => {
      return {
        content: parse(capture[1], state)
      };
    },
    html: (node, output, state) => {
      return getHTML('span', output(node.content, state), { class: 'd-spoiler' }, state);
    }
  },
};

const embeded = {
  link: Object.assign({}, markdown.defaultRules.link, {
    match: inlineRegex(patterns.link),
    html: (node, output, state) => { return getHTML('a', output(node.content, state), { class: 'd-masked-link', href: node.target }); }
  }),
  autolink: Object.assign({}, markdown.defaultRules.autolink, {
    match: inlineRegex(patterns.autolink),
    parse: (capture) => {
      return {
        content: capture[1]
      };
    },
    html: (node, output, state) => { return getHTML('a', node.content, { class: 'd-auto-link', href: node.content }); }
  }),
};

/**
 * Parses provided source to HTML.
 * @param {String} tag Wrapping HTML tag.
 * @param {String} content Content of element.
 * @param {Object} attributes Attributes of element.
 * @param {Boolean} [closed=true] Set to false if element is single tag.
 * @returns {String}
*/
const getHTML = (tag, content, attributes = {}, closed = true) => {
  let attribute = '';
  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key) && attributes[key]) {
      attribute += ` ${markdown.sanitizeText(key)}="${markdown.sanitizeText(attributes[key])}"`;
    }
  }

  const element = closed ? `<${tag}${attribute}>${content}</${tag}>` : `<${tag}${attribute}>`;
  return element;
};

/**
 * Parses provided array of nested HTML into one string.
 * @param {Array} items Items to be converted.
 * @param {Object} options Options for parser.
 * @param {String} options.type List parent type.
 * @param {Object} options.classes Custom classes.
 * @param {Object} options.classes.item Custom class for items.
 * @param {Object} options.classes.list Custom class for lists.

 * @returns {String}
*/
const getNestedHTML = (items, options = {
  type: 'ul', 
  classes: {
    item: '',
    list: '',
  }
}) => {
  const { type, classes } = options;
  let result = '';
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const has_children = element.items ? element.items.length > 0 : false;
    if (has_children) {
      result += getHTML('li', element.text + getHTML(type, getNestedHTML(element.items, options), {class: classes.list}), {class: classes.item});
    } else {
      result += getHTML('li', element.text, {class: classes.item});
    }
  }
  return result;
};

/**
 * Parses provided source to HTML.
 * @param {String} source Markdown to be converted.
 * @param {Object} [options] Options for parser.
 * @param {Boolean} [options.embed=true] If links should be embeded.
 * @param {Boolean} [options.includeDefault=true] If default rules are to be used.
 * @param {Object} [state] Simplemarkdown state object.
 * @param {Boolean} [state.inline=false] Simplemarkdown inline setting.
 * @param {Boolean} [state.disableAutoBlockNewlines=true] Simplemarkdown disableAutoBlockNewLines setting.
 * @param {Object} [state.mentions] Object for discord mention functions.
 * @param {Function} [state.mentions.user] Simplemarkdown state object.
 * @param {Function} [state.mentions.channel] Simplemarkdown state object.
 * @param {Function} [state.mentions.role] Simplemarkdown state object.
 * @param {Function} [state.mentions.everyone] Simplemarkdown state object.
 * @param {Function} [state.mentions.here] Simplemarkdown state object.
 * @param {Array<{
 *  name: String,
 *  match: Function,
 *  parse: Function,
 *  react?: Function,
 *  html?: Function,
 * }>} [extensions] Rule extensions for parser.
 */
export const render = (
  source,
  options = { includeDefault: true, embed: true },
  state = {},
  extensions = []
) => {
  let { includeDefault, embed } = options;
  const _rules = {};
  const _state = {
    inline: false,
    disableAutoBlockNewlines: true,
    mentions: {
      user: node => '@' + markdown.sanitizeText(node.id),
      channel: node => '#' + markdown.sanitizeText(node.id),
      role: node => '@' + markdown.sanitizeText(node.id),
      everyone: () => '@everyone',
      here: () => '@here'
    },
  };

  if (includeDefault == null) {
    includeDefault = true;
  }
  if (embed == null) {
    embed = true;
  }

  if (includeDefault) {
    Object.assign(_rules, rules);
  }
  if (embed) {
    Object.assign(_rules, embeded);
  }

  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];
    const obj = {};
    obj[extension.name] = {
      match: extension.match,
      parse: extension.parse,
      react: extension.react,
      html: extension.html
    };
    Object.defineProperties(_rules, extension);
  }
  const parser = markdown.parserFor(_rules);
  const renderer = markdown.outputFor(_rules, 'html');

  return renderer(parser(source, _state), _state);
};

const export_obj = {
  /**
   * Installs plugin as globalProperty for Vue
   */
  install: (app, options = {
    inject_instances: false,
    inject_parsers: false,
  }) => {
    const { globalProperties } = app.config;
    const definePropertyOptions = { writable: false, readable: true };
    Object.defineProperty(globalProperties, '$md_render', { value: render, ...definePropertyOptions });
    if (options.inject_instances) {
      Object.defineProperty(globalProperties, '$simple_markdown', { value: markdown, ...definePropertyOptions });
      Object.defineProperty(globalProperties, '$highlightjs', { value: highlightjs, ...definePropertyOptions });
    }
    if (options.inject_parsers) {
      Object.defineProperty(globalProperties, '$getNestedHTML', { value: getNestedHTML, ...definePropertyOptions });
      Object.defineProperty(globalProperties, '$getHTML', { value: getHTML, ...definePropertyOptions });
    }
  },
  /**
   * Parses provided source into HTML
   */
  render,
  getNestedHTML,
  getHTML,
};

export default export_obj;
