import { getMdFiles } from "./routes.ts";
import { mark } from "./markdown.ts";
import { readingTime } from "./utils.ts";
export interface LinkArrayType {
  path: string | undefined;
  title: string;
  date: string | Date | undefined;
  readingTime: string;
  tags: [] | string[] | undefined;
  des: string | undefined;
  fname: string | undefined;
}

const postRoutes = getMdFiles().postsroute;
const linkArray: Array<LinkArrayType> = [];
postRoutes.forEach((file) => {
  const data = mark(file.fileLoc);
  const found = postRoutes.find((i) => i.linkTitle === data.title);
  const rt = readingTime(data.html);
  linkArray.push({
    path: found?.path,
    title: data.title,
    date: data.date,
    readingTime: `Reading Time: ${rt} min`,
    tags: data.tags,
    des: data.description,
    fname: found?.f_name,
  });
});

export default linkArray;
