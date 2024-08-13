#!/usr/bin/env -S deno run --allow-all

import { $, format, path, tcolor } from "./src/lib/deps.ts";

const CURRENT_DATE = new Date();
const CURRENT_DATE_STRING = CURRENT_DATE.toISOString().slice(0, 10);

const HELP = `
hono-blog

Initialize a new blog.

To generate a blog in the './my_blog' subdirectory:
  deno run ${import.meta.url} ./my_blog

To generate a blog in the current directory:
  deno run ${import.meta.url} .

Print this message:
  deno run ${import.meta.url} --help

`;

const CONFIG_FILE = "mod.ts";
const CONFIG_CONTENT = `
import { blog } from "@ptm/hono-blog";

const app = blog({
 siteName: "My Blog",
 baseDir: "app",
 meta:{
  author: "John Doe",
  description: "Hono Blog Template with Deno",
  keywords: ["hono", "deno", "blog"],
  favicon: "favicon.ico",
  ogType: "website",
 },
  socialLink: {
    github: "https://github.com/phothinmg/hono-blog-template",
  }
});

// See all configuration options at https://jsr.io/@ptm/hono-blog/doc/~/HonoBlogOptions

export default app;

`;

// const DENO_JSON = "deno.json";
// const DENO_JSON_CONTENT = `
// {
//   "tasks": {
//     "start": "deno serve -A mod.ts"
//   },
//   "compilerOptions": {
//     "jsx": "precompile",
//     "jsxImportSource": "@hono/hono/jsx"
//   }
// }

// `;

const INDEX_MD = "index.md";
const INDEX_MD_CONTENT = `
---
type: "index"
title: "Home"
---

# This is home page.
`;

const PAGE_MD = "about.md";
const PAGE_MD_CONTENT = `
---
type: "page"
title: "About"
---

# This is about page.
`;

const POST_MD = "hello-world.md";
const POST_MD_CONTENT = `
---
type: "post"
title: "Hello World"
author: "John Doe"
date: ${CURRENT_DATE_STRING}
description: "Hello World from my blog."
tags: 
 - Hono
 - Deno
 - Blog
ogurl:
ogtype:
ogtitle:
---

###  Hello World!!
`;

async function init(directory: string) {
  directory = path.resolve(directory);
  // console.log(`Create blog at ${directory}...`);
  await $`echo ${tcolor.green(tcolor.bold(`Create Blog at ${directory}...`))}`;
  try {
    const dir = [...Deno.readDirSync(directory)];
    if (dir.length > 0) {
      const confirmed = confirm(
        tcolor.magenta(
          "You are trying to initialize blog in an non-empty directory, do you want to continue?",
        ),
      );
      if (!confirmed) {
        throw new Error(tcolor.red("Directory is not empty, aborting."));
      }
    }
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }

  await Deno.mkdir(path.join(directory, "app"), { recursive: true });
  await Deno.writeTextFile(
    path.join(directory, `app/${INDEX_MD}`),
    INDEX_MD_CONTENT,
  );
  await Deno.writeTextFile(
    path.join(directory, `app/${POST_MD}`),
    POST_MD_CONTENT,
  );
  await Deno.writeTextFile(
    path.join(directory, `app/${PAGE_MD}`),
    PAGE_MD_CONTENT,
  );
  await Deno.writeTextFile(path.join(directory, CONFIG_FILE), CONFIG_CONTENT);
  // await Deno.writeTextFile(path.join(directory, DENO_JSON), DENO_JSON_CONTENT);
}

function printHelp() {
  console.log(HELP);
  Deno.exit(0);
}

if (import.meta.main) {
  if (Deno.args.includes("-h") || Deno.args.includes("--help")) {
    printHelp();
  }
  const directory = Deno.args[0];
  if (directory == null) {
    printHelp();
  }
  const start = performance.now();
  await init(directory);
  setTimeout(async () => {
    await $`echo ${
      tcolor.italic(
        tcolor.green(`Installing depencities............`),
      )
    }`;
    await $`deno add @ptm/hono-blog`;
    setTimeout(async () => {
      await $`deno add @hono/hono`;
    }, 1000);
  }, 1000);
  const end = performance.now();
  const tim = Math.floor(end - start);
  await $`echo ${tcolor.green(`Done in ${format(tim)}`)}`;
  await $`echo Run ${
    tcolor.bgBlack(
      tcolor.white(`deno task start`),
    )
  } to start Blog.`;
} else {
  throw new Error("This module is meant to be executed as a CLI.");
}
