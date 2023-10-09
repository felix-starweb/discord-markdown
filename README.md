Based of this article: https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51

## Vue plugin 
- Install:
```js
import { createApp } from 'vue';
import DiscordMarkdown from '@felixrydberg/discord-markdown';

const app = createApp();
app.use(markdown {inject_instances: true});
```

- Options:
  - ```inject_instances```
    - Default: false
    - Action: If true Simple Markdown and HighlightJS instances will be injected into globalProperties
