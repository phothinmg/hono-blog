# Hono Blog

The simple blog with Hono Js and Deno runtime.

### 1. About

Simple blog template with Hono Js and Deno.

### 2. Getting Started

```bash
deno run -A https://deno.land/x/honoblog/init.ts  "./directory/for/blog/"
```

### 3. `deno.json`

```json
{
  "$schema": "https://img.phothin.dev/deno.schema.json",
  "tasks": {
    "start": "deno serve -A mod.ts"
  },
  "imports": {
    "hono": "jsr:@hono/hono",
    "hono-blog": "jsr:@ptm/hono-blog"
  },
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "hono/jsx"
  }
}
```

More info at @hono/hono at https://jsr.io/@hono/hono and @ptm/hono-blog at
https://jsr.io/@ptm/hono-blog

### 4. Configuration

`mod.ts`

```ts
import { blog } from "@ptm/hono-blog";

const app = blog({
  /*options*/
});

export default app;
```

#### 4.1.Configuration Options

- siteName?: Name of Blog
- siteUrl?: The URL of blog, after deployed
- baseDir?: The directory that contain all of source file of blog. must be
  like - "app" , not "./app", default "app".
- ignore?: Files or Directories want to ignore.
- meta:
  - author?: The name of the blog author
  - description?: A short and accurate summary of the content of the page.
  - generator?: The identifier of the software that generated the page, if true
    generator name will "Hono".
  - keywords?: The array of keywords.
  - favicon?:
  - ogTitle?: The title of the object as it should appear within the graph.
  - ogType?: The type of the object.
  - ogImage?: An image URL which should represent the object within the graph.
  - ogUrl?: The canonical URL of your object that will be used as its permanent
    ID in the graph.
- socialLinks:
  - facebook?:
  - github?:
  - twitter?:
  - discord?:
  - linkedin?:
  - mastodon?:

**_See all configuration options at
https://jsr.io/@ptm/hono-blog/doc/~/HonoBlogOptions_**

### 5. Markdown

Hono blog used `mm-mark` that is base on
[Showdown.js](https://github.com/showdownjs/showdown) for Deno runtime.

Demo :: http://demo.showdownjs.com/

#### 5.1. Document's types

Types of the markdown files in the `baseDir`.Its also for routes of markdown.

- `index` : Index page (Home Page) of blog.

- `post` : Posts of the blog.

- `page` : Pages of the blog.

**Example**

```yaml
---
type: "index"
---
```

#### 5.2. Routes

- `"/"` : Home page - markdown type `index`

- `"/posts"` : All posts - generated by hono-blog.

- `"/posts/title-of-post"` : markdown type `post`

- `"/pages/title-of-page"` : markdown type `page`

#### 5.3. Images

Images file must be located at `baseDir`. Just only image name required.

```md
![logo](logo.png)
```

Image Dimensions

```
![foo](foo.jpg =100x80)     simple, assumes units are in px
![bar](bar.jpg =100x*)      sets the height to "auto"
![baz](baz.jpg =80%x5em)  Image with width of 80% and height of 5em
```

Route

- `"/name-of-image"`

- `"/posts/name-of-image"`

- `"pages/name-of-image"`

#### 5.3. Front Matter (YAML)

`index`

```yaml
---
type: "index"
title: "Home"
---
```

`page`

```yaml
---
type: "page"
title: "About"
description: "About Me"
---
```

`post`

```yaml
---
type: "post"
title: "Hello world"
author: "PTM"
date: 2024-08-04
description: "Hello World from hono-blog"
tags:
  - Hono
  - Deno
  - Blog
ogurl:
ogtype:
ogtitle:
cover_photo:
---
```

### 6. Deploy

Easy deploy on [Deno Deploy](https://deno.com/deploy)

## Acknowledgement

1. [Deno](https://deno.com/) - Open-source JavaScript runtime for the modern
   web.

2. [Hono](https://hono.dev/) - Ultrafast web framework for the Edges.

3. [Showdown](https://github.com/showdownjs/showdown) - A Markdown to HTML
   bidirectional converter written in Javascript!

4. [js-yaml](https://github.com/nodeca/js-yaml) - YAML 1.2 parser / writer for
   JavaScript.

5. [glob](https://github.com/isaacs/node-glob#readme) - The most correct and
   second fastest glob implementation in JavaScript.

6. [Classless.css](https://classless.de/) - Less classes. Less overhead.
