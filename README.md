# @felixrydberg

## Table of Contents
* [Npm Install](#npm-install)
* [Plugin](#plugin)
  * [Plugin install](#install)
  * [Plugin options](#options)
* [Documentation](#documentation)
  * [Importing styles](#importing-styles)
  * [Extensions](#extensions)
  * [getHTML](#gethtml)
  * [getNestedHTML](#getnestedhtml)
* [Usage outside of npm](#usage-outside-of-npm)

### Npm Install:
```bash
npm install @felixrydberg/discord-markdown
```

## Plugin:
### Install:
```js
import { createApp } from 'vue';
import DiscordMarkdown from '@felixrydberg/discord-markdown';

const app = createApp();

// All inject options
app.use(DiscordMarkdown, {inject_instances: true, inject_parsers: true});

// No inject options
app.use(DiscordMarkdown);
```

### Options:
| Key | Type | Default value | Description |
|---|---|---|---|
| inject_instances | Boolean | false | Injects ```$simple_markdown``` & ```$highlightjs``` into Vue globalProperties |
| inject_parsers | Boolean | false | Injects ```$getHTML``` & ```$getNestedHTML``` into Vue globalProperties |

## Documentation:

### Importing styles:
```css
/* Add this to your main css file */
@import "@felixrydberg/discord-markdown";
```

### Extensions:
- Order: At which position the rule is supposed to run at. Lower numbers go first
- Match: A function which returns a regex exec result
- Parse: A function that parses the result from the match key. Return an object.
- Html: A function that uses the parsed data and returns a string, Either through the exported functions ([getHTML](#gethtml) or [getNestedHTML](#getnestedhtml)).
```js
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
    html: (node, output, state) => { return getHTML('span', state.mentions.everyone(node), { class: 'd-mention d-user' }); }
  },
  '@here': {
    order: 22,
    match: source => patterns.here.exec(source),
    parse: () => {
      return {};
    },
    html: (node, output, state) => { return getHTML('span', state.mentions.here(node), { class: 'd-mention d-user' }); }
  },
```

### Render:
- Parameters:

| Name | Type | Default value | Description |
|---|---|---|---|
| source | String | | Markdown to be converted into HTML |
| options | Object | | Options for changing default behavior |
| options.embed | Boolean | true | Adds parsing of links |
| options.includeDefault | Boolean | true | Adds default parsing rules |
| state | Object | | State object for Simplemarkdown |
| state.inline | Boolean | false | Simplemarkdown inline setting |
| state.disableAutoBlockNewLines | Boolean | true | Simplemarkdown disableAutoBlockNewLines setting |
| state.mentions | Object | | Object for discord mention functions. []() |
| state.mentions.user | Function | | Callback for providing content inside a d-mention d-user element |
| state.mentions.channel | Function | | Callback for providing content inside a d-mention d-channel element |
| state.mentions.role | Function | | Callback for providing content inside a d-mention d-user element |
| state.mentions.everyone | Function | | Callback for providing content inside a d-mention d-everyone element |
| state.mentions.here | Function | | Callback for providing content inside a d-mention d-here element |
- Returns: An element string.

### getHTML:
- Parameters
  - Tag: Wrapping HTML tag.
  - Content: Content of element.
  - Attributes: {
    attribute: value
  }
  - Closed: Set to false if element is single tag.
- Returns: An element string.

### getNestedHTML:
- Parameters
  - items: [{
    text: Text content that is supposed to be displayed in
    items: Children of element. Each object follows the same structure as this example
  }]
  - Options: {
  type: Wrapping HTML tag
  classes: {
    item: Applied to nested children,
    list: Applied to parent,
  }
- Returns: An element string with nested children.

### Discord Mentions:
Since these are custom built functions that needs to be implemented on "your end" (Person using this library) there are some prerequisites. The parameter provided is the return from the parse function. The expected return is the content of the element. Default value returns the ID provided.

## Usage outside of npm:
- Get the latest version from the [./dist/index.js](https://github.com/felixrydberg/discord-markdown/blob/main/dist/index.js)
- Remember type has to be set to module ```<script type="module" src="(path to file)"></script>```

  ```html
    <script type="module" src="(path to file)"></script>
    <script type="module">
      import discordMarkdown from '(path to file)'
      console.log(discordMarkdown)
    </script>
  ```
