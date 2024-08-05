import { Mmmark } from "./deps.ts";
import { readFile } from "./utils.ts";
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
}
export interface MarkOpts extends AttrsPost {
  html: string;
}

export function mark(filePath: string): MarkOpts {
  const tx: string = readFile(filePath);
  const c = Mmmark.converter<AttrsPost>(tx, {
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
  };
}
