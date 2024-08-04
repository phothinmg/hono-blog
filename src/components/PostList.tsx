import { type FC, memo, Hono } from "../deps.ts";
import { mark } from "../markdown.ts";
import { readingTime } from "../utils.ts";
import { type PostRoutes, getMdFiles } from "../routes.ts";
import type { HonoBlogOptions } from "../configuration.ts";
import { Layout } from "./Layout.tsx";

export interface LinkArrayType {
  path: string | undefined;
  title: string;
  date: string | Date | undefined;
  readingTime: string;
  tags: [] | string[] | undefined;
  des: string | undefined;
  fname: string | undefined;
}
const PostCard: FC<{ opts: LinkArrayType }> = memo(({ opts }) => {
  return (
    <div class="card">
      <a href={opts.path} class="post-link" target="_blank">
        <h3>{opts.title}</h3>
      </a>

      <small class="head-small">{opts.date}</small>
      <small class="head-small">{opts.readingTime}</small>
      <br />
      {opts.tags?.map((i) => {
        `<small class="badge">${i}</small>`;
      })}
      <br />
      <hr />
      <p>{opts.des ?? ""}</p>
    </div>
  );
});
export const PostsList: FC<{ options: HonoBlogOptions }> = memo(({ options }) => {
  const postFiles: PostRoutes = getMdFiles(options.baseDir).postsroute;
  const linkArray: Array<LinkArrayType> = [];
  postFiles.forEach((file) => {
    const data = mark(file.fileLoc);
    const found = postFiles.find((i) => i.linkTitle === data.title);
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
  return (
    <>
      {linkArray.map((i) => (
        <PostCard opts={i} />
      ))}
    </>
  );
});

export const postslist = (options: HonoBlogOptions) => {
  const app = new Hono();
  app.get("/", (c) => {
    return c.html(
      <Layout options={options}>
        <PostsList options={options} />
      </Layout>
    );
  });
  return app;
};
