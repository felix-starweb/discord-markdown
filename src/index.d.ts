import { MatchFunction, ParseFunction, State } from "@khanacademy/simple-markdown/src";
import { VueElement } from "vue"

export interface DiscordMarkdownOptions {
  inject_instances: boolean, 
  inject_parsers: boolean,
}

export interface DiscordMarkdown {
  install: (vue: VueElement, options?: {}) => void,
  render: (
    source: string,
    options: {
      includeDefault: boolean,
      classes: boolean,
      embed: boolean,
    },
    state: State,
    extensions: Array<{
      order: number,
      match: MatchFunction,
      parse: ParseFunction,
      html: (source: string, state?: State) => string,
    }>
  ) => string,
  getNestedHTML: (items: NestedHTMLItem, options: NestedHTMLOptions) => string,
  getHTML: (
    tag: string,
    content: string,
    attributes: {[key: string]: string;},
    closed: boolean,
  ) => string,
}

export interface NestedHTMLItem {
  text: string,
  items: Array<NestedHTMLItem>
}

export interface NestedHTMLOptions {
  type: 'ul' | 'ol',
  classes: {
    item: string,
    list: string,
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $md_render: (
      source: string,
      options?: {
        includeDefault: boolean,
        classes: boolean,
        embed: boolean,
      },
      state?: State,
      extensions?: Array<{
        order: number,
        match: MatchFunction,
        parse: ParseFunction,
        html: (source: string, state?: State) => string,
      }>
    ) => string,
    $getNestedHTML: (items: NestedHTMLItem, options: NestedHTMLOptions) => string,
    $getHTML: (
      tag: string,
      content: string,
      attributes: {[key: string]: string;},
      closed: boolean,
    ) => string,
  }
}

declare module '@felixrydberg/discord-markdown' {
  const discordMarkdown : DiscordMarkdown
  export default discordMarkdown
}

export {}
