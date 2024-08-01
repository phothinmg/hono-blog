import { Mmmark } from "@ptm/mm-mark";
import { readFile } from "./readfile.ts";

export interface AttrsPost {
  type: "page" | "post" | "index";
  title: string;
  date?: Date | string;
  description?: string;
  tags?: string[] | [];
}
export interface MarkOpts extends AttrsPost {
  html: string;
}

export function mark(filePath: string): MarkOpts {
  const tx: string = readFile(filePath);
  const fm = Mmmark.frontmatter(tx);
  const html: string = Mmmark.renderHtml({ text: fm.content });
  const attr = fm.data;

  return {
    html: html,
    type: attr.type as AttrsPost["type"],
    title: attr.title as AttrsPost["title"],
    date: ((attr.date as Date) || new Date()).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      weekday: "short",
    }),
    description: (attr.description as AttrsPost["description"]) ?? "",
    tags: (attr.tags as AttrsPost["tags"]) ?? [],
  };
}
