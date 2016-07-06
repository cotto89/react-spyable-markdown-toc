# Demo

https://cotto89.github.io/react-spyable-markdown-toc/

# Usage

```js
import React from 'react';
import {
  SpyableMarkdownTocWrapper,
  SpyableMarkdownPreview,
  SpyableToc,
} from 'react-spyable-markdown-toc';

const SampleText = require('./sample.md');

const App = function App() {
  return (
    <div className="App">
      <SpyableMarkdownTocWrapper raw={SampleText} maxDepth={1}>
        <SpyableMarkdownPreview />
        <SpyableToc />
      </SpyableMarkdownTocWrapper>
    </div>
  );
};
```

# ComponentSpec

## SpyableMarkdownTocWrapper


This Component parse Markdown to HTML, handle events and pass data to `SpyableMarkdownPreview` and `SpyableToc` by React context API.

Parsed HTML is sanitized. And applied `highlight.js` by [remark-highlight.js](https://github.com/ben-eb/remark-highlight.js). So you can use highlight.js theme for syntax hightlight of CodeBlock.

[highlight.js demo](https://highlightjs.org/static/demo/)

### props

| Name | Type | Default | Description |
|------ | --- | ------- | ------------ |
| raw | string |        | required |
| parseOption | object | `{ breaks: true, setext: true }`  | see [remark parse option](https://github.com/wooorm/remark/blob/master/packages/remark-stringify/readme.md#options) |
| maxDepth | number | 6 | target of heading depth for toc |

## SpyableMarkdownPreview

This Component render Markdown as HTML.

## SpyableToc

This Component render TOC. TOC item is spyable to heading on scroll event.


# className for css

```css
/* target heading */
[data-spyable-heading=true]{}

.SpyableMarkdownTocWrapper {}

.SpyableMarkdownPreview {}

.SpyableToc {}

.SpyableTocItem {}

.SpyableTocItem__h1 {}
.SpyableTocItem__h2 {}
.SpyableTocItem__h3 {}
.SpyableTocItem__h4 {}
.SpyableTocItem__h5 {}
.SpyableTocItem__h6 {}

.SpyableTocItem--current {}
```

# Dependencies

* [wooorm/remark](https://github.com/wooorm/remark)
* [wooorm/remark-html](https://github.com/wooorm/remark-html)
* [ben-eb/remark-highlight.js](https://github.com/ben-eb/remark-highlight.js)
* [wooorm/unist-util-visit](https://github.com/wooorm/unist-util-visit)
* [wooorm/mdast-util-to-string](https://github.com/wooorm/mdast-util-to-string)
* [JedWatson/classnames](https://github.com/JedWatson/classnames)

and also depend on React context API. **It is unstable API. see [Context | React](https://facebook.github.io/react/docs/context.html)**.

# Install

```bash
$ npm i -S https://github.com/cotto89/react-spyable-markdown-toc
```

# TODO

- [ ] Component Test
- [ ] npm publishPreview
