# @felixrydberg

## Table of Contents
* [Plugin](#plugin)
  * [Plugin install](#install)
  * [Plugin options](#options)
* [Examples](#examples)
  * [Samples](#samples)
  * [Extensions](#extensions)
* [Usage outside of npm](#usage-outside-of-npm)

## Plugin:
### Install:
```js
import { createApp } from 'vue';
import DiscordMarkdown from '@felixrydberg/discord-markdown';

const app = createApp();

// All inject options
app.use(markdown {inject_instances: true, inject_parsers: true});

// No inject options
app.use(markdown);
```

### Options:
| Key | Type | Default value | Description |
|---|---|---|---|
| inject_instances | Boolean | false | Injects ```$simple_markdown``` & ```$highlightjs``` into Vue globalProperties |
| inject_parsers | Boolean | false | Injects ```$getHTML``` & ```$getNestedHTML``` into Vue globalProperties |

## Examples:

### Samples:


### Extensions:

## Usage outside of npm:
- Get the latest version from the [./dist/discord-markdown.min.js](https://github.com/felixrydberg/discord-markdown/blob/main/dist/discord-markdown.min.js)
- Remember type has to be set to module ```<script type="module" src="(path to file)"></script>```

  ```html
    <script type="module" src="(path to file)"></script>
    <script type="module">
      import discordMarkdown from '(path to file)'
      console.log(discordMarkdown)
    </script>
  ```
