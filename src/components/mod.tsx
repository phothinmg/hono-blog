import { Hono } from "../deps.ts";
import { IndexPage } from "./IndexPage.tsx";
import { PostsList } from "./PostList.tsx";
import { Layout } from "./Layout.tsx";
import { PostBody } from "./PostBody.tsx";
import { PageBody } from "./PageBody.tsx";
import { getMdFiles, getImgFiles } from "../routes.ts";
import type { HonoBlogOptions } from "../configuration.ts";

export default function blog(options: HonoBlogOptions) {
  const app = new Hono();
  const mdfiles = getMdFiles(options.baseDir);
  const homefile = mdfiles.indexroute[0].fileLoc;
  const pagesfiles = mdfiles.pagesroute;
  const postsfiles = mdfiles.postsroute;
  const imgfiles = getImgFiles(options.baseDir);
  app.get("/", (c) => {
    return c.html(
      <Layout options={options}>
        <IndexPage filePath={homefile} />
      </Layout>
    );
  });
  app.get("/posts", (c) => {
    return c.html(
      <Layout options={options}>
        <PostsList options={options} />
      </Layout>
    );
  });
  postsfiles.map((i) => {
    app.get(i.path, (c) => {
      return c.html(<PostBody options={options} filePath={i.fileLoc} />);
    });
  });
  pagesfiles.map((i) => {
    app.get(i.path, (c) => {
      return c.html(<PageBody filePath={i.fileLoc} />);
    });
  });
  return app;
}
