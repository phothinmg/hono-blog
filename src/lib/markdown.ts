import { Mmmark } from "./deps.ts";
import { readFile } from "./utils.ts";
/**
 * Yaml frontmatter of markdown document.
 */
export interface AttrsPost {
  type: "page" | "post" | "index";
  title: string;
  date?: Date | string;
  author?: string;
  description?: string;
  tags?: string[];
  ogimage?: string;
  ogurl?: string;
  ogtype?: string;
  ogtitle?: string;
  cover_photo?: string;
}
export interface MarkOpts extends AttrsPost {
  html: string;
}

/**
 * Reads a markdown file from the specified path, converts it to HTML using Mmmark with specified extensions,
 * and returns an object containing the parsed attributes and HTML content.
 * @param filePath - The path to the markdown file to be processed.
 * @returns An object with attributes like type, title, date, author, description, tags, ogimage, ogurl, ogtype, ogtitle, html, and cover_photo.
 */
export function mark(filePath: string): MarkOpts {
  const tx: string = readFile(filePath);
  const c = new Mmmark.ConvertMd<AttrsPost>(tx, {
    extensions: ["showdownMathjax"],
  });
  const data: AttrsPost = c.data;
  const html: string = c.html;
  return {
    type: data.type,
    title: data.title,
    date: (data.date || new Date()).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
    author: data.author ?? "",
    description: data.description ?? "",
    tags: data.tags,
    ogimage: data.ogimage ?? "",
    ogtype: data.ogtype ?? "",
    ogurl: data.ogurl ?? "",
    ogtitle: data.ogtitle ?? "",
    html: html,
    cover_photo: data.cover_photo ?? "",
  };
}
