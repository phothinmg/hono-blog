import { mark } from "./markdown.ts";
import { readingTime } from "./utils.ts";
import type { HonoBlogOptions } from "./configuration.ts";
import { getJsonFiles } from "./createjson.ts";

/**
 * Array of objects to manage Post List Page
 */

export interface LinkArrayType {
  /**
   * Path for HTML achor element
   */
  path: string | undefined;
  /**
   * Title of Post
   */
  title: string;
  /**
   * Publish date of Post
   */
  date: string | Date | undefined;
  /**
   * Reading time of Post
   */
  readingTime: string;
  /**
   * Tags for Post
   */
  tags: [] | string[] | undefined;
  /**
   * Short description of Post
   */
  des: string | undefined;
  /**
   * File name converted from title of Post
   */
  fname: string | undefined;
}
/**
 * Generates an array of objects representing links with specific properties.
 *
 * @param options - Optional HonoBlogOptions for customization.
 * @returns An array of LinkArrayType objects containing path, title, date, reading time, tags, description, and file name.
 *
 * **Dependent**
 *  -  src/components/PostList.tsx
 */
export default function linkArray(options?: HonoBlogOptions) {
  const postRoutes = getJsonFiles(options).postsRoute;
  const linkA: Array<LinkArrayType> = [];
  postRoutes.forEach((file) => {
    const data = mark(file.jsonFilePath);
    const found = postRoutes.find((i) => i.linkTitle === data.title);
    const rt = readingTime(data.html);
    linkA.push({
      path: found?.path,
      title: data.title ?? "",
      date: data.date,
      readingTime: `Reading Time: ${rt} min`,
      tags: data.tags,
      des: data.description,
      fname: found?.f_name,
    });
  });
  return linkA;
}
