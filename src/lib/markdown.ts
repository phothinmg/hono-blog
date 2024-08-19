import { Mmmark } from "./deps.ts";
import { readFile } from "./utils.ts";
import type { MarkOptions } from "./routes.ts";

export interface MarkOpts extends Partial<MarkOptions["attrs"]> {
  html: string;
}

/**
 * Reads a markdown file from the specified path, converts it to HTML using Mmmark with specified extensions,
 * and returns an object containing the parsed attributes and HTML content.
 * @param filePath - The path to the markdown file to be processed.
 * @returns An object with attributes like type, title, date, author, description, tags, ogimage, ogurl, ogtype, ogtitle, html, and cover_photo.
 */
export function mark(filePath?: string): MarkOpts {
  const fpath: string = filePath === undefined ? "" : filePath;
  const tx: string = readFile(fpath);
  const json: MarkOptions = JSON.parse(tx);
  const html: string = new Mmmark.ConvertMd(json.body, {
    extensions: ["showdownMathjax"],
  }).html;
  const data: MarkOptions["attrs"] = json.attrs;
  const publishDate = data.date === undefined
    ? new Date()
    : new Date(data.date);
  return {
    type: data.type,
    title: data.title ?? "",
    date: publishDate.toLocaleString("en-US", {
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
