---
type: "index"
title: "Home"
---

Hello

### 1. About

Simple blog template with Hono Js and Deno.

### 2. Getting Started

```bash
git clone https://github.com/phothinmg/hono-blog-template.git
```

### 3. `deno.json`

```json
{
  "$schema": "./deno.schema.json",
  "version": "1.0.0",
  "tasks": {
    "start": "deno serve -A mod.ts"
  },
  "imports": {
    "@hono/hono": "jsr:@hono/hono@^4.5.4",
    "@ptm/hono-blog": "jsr:@ptm/hono-blog@^0.0.4"
  },
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "jsr:@hono/hono@^4.5.4/jsx"
  }
}
```

Check and update version of @hono/hono at https://jsr.io/@hono/hono and
@ptm/hono-blog at https://jsr.io/@ptm/hono-blog
