import { join } from "@std/path";
import { extractYaml } from "@std/front-matter";
import { globSync } from "glob";
import { readFile } from "./readfile.ts";
import siteConfig from "../../_config.ts";
import type { AttrsPost } from "./mark.ts";

export const siteName = siteConfig.site?.name ?? "Yamanya Blog";
export const siteAuthor = siteConfig.site?.author ?? "";
export const siteDescription = siteConfig.site?.description ?? "";
export const siteKeywords = siteConfig.site?.keywords ?? [];

export const baseDir = siteConfig.baseDirectory ?? "app";
export const siteLogo = siteConfig.logo ?? "app/logo.png";
export const siteFavicon = siteConfig.favicon ?? "app/favicon.ico";

const bd = join(Deno.cwd(), baseDir);

/* Get Files */

const mdFiles: string[] = globSync(`${bd}/**/*.md`);
export const imgFiles: string[] = globSync(
  `${baseDir}/**/*.{png, jpg, jpeg, gif, svg,ico, webp}`
);
export const cssFiles: string[] = globSync(`${bd}/**/*.css`);

/* -------------------------------- */

let indexFile: string = "";

const postFiles: string[] = [];

const pageFiles: string[] = [];

mdFiles.forEach((i) => {
  const tx = readFile(i);
  const fm = extractYaml(tx).attrs as AttrsPost;
  if (fm.type === "index") {
    indexFile = i;
  } else if (fm.type === "page") {
    pageFiles.push(i);
  } else if (fm.type === "post") {
    postFiles.push(i);
  }
});

export { indexFile, postFiles, pageFiles };
