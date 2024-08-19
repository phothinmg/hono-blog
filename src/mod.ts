import type { HonoBlogOptions } from "./lib/configuration.ts";
import { honoblog } from "./components/mod.tsx";
import type { BlankEnv, BlankSchema, Hono } from "./lib/deps.ts";
import { fsWatcher } from "./lib/watcher.ts";
/**
 * **Creates a blog application with specified options.**
 *
 * @param options - Optional blog configuration options.
 * @returns The configured Hono application for the blog.
 *
 *
 * @example
 *
 *
 * ```ts
 * import { blog } from "@ptm/hono-blog";

    const app = blog({
      siteName: "Hono Blog Template",
      baseDir: "app",
      meta: {
        author: "Hono Blog",
        description: "Hono Blog Template with Deno",
        keywords: ["hono", "deno", "blog"],
        favicon: "favicon.ico",
        ogType: "website",
        // This og:image is generated by https://www.opengraph.xyz/
        ogImage:
          "https://opengraph.b-cdn.net/production/images/a1ea7ff1-12b9-4505-9f6e-2e9a119badf8.png?token=4mnJrVq4kMMlG2GMzBGRIj4S5DHq81C3BS6owMZYgWY&height=960&width=1200&expires=33259066794",
        ogTitle: "Hono Blog Template",
        ogUrl: "https://hono-blog-template.deno.dev/",
      },
      socialLink: {
        github: "https://github.com/phothinmg/hono-blog-template",
      },
    });

    export default app;

 *
 * ```
 */
export const blog = (
  options: HonoBlogOptions,
): Hono<BlankEnv, BlankSchema, "/"> => {
  fsWatcher(options);
  return honoblog(options);
};

export type { HonoBlogOptions };
