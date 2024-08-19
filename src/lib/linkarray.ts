import { getMdFiles } from "./routes.ts";
import { mark } from "./markdown.ts";
import { readingTime } from "./utils.ts";
import type { HonoBlogOptions } from "./configuration.ts";

export interface LinkArrayType {
  path: string | undefined;
  title: string;
  date: string | Date | undefined;
  readingTime: string;
  tags: [] | string[] | undefined;
  des: string | undefined;
  fname: string | undefined;
}
/**
 * Generates an array of objects representing links with specific properties.
 *
 * @param options - Optional HonoBlogOptions for customization.
 * @returns An array of LinkArrayType objects containing path, title, date, reading time, tags, description, and file name.
 *
 * export to src/components/PostList.tsx
 */
export default function linkArray(options?: HonoBlogOptions) {
  const postRoutes = getMdFiles(options).postsroute;
  const linkA: Array<LinkArrayType> = [];
  postRoutes.forEach((file) => {
    const data = mark(file.fileLoc);
    const found = postRoutes.find((i) => i.linkTitle === data.title);
    const rt = readingTime(data.html);
    linkA.push({
      path: found?.path,
      title: data.title,
      date: data.date,
      readingTime: `Reading Time: ${rt} min`,
      tags: data.tags,
      des: data.description,
      fname: found?.f_name,
    });
  });
  return linkA;
}
