import { Hono, serveStatic } from "./deps.ts";
import homepage from "./components/Home.tsx";
import postslist from "./components/PostList.tsx";
import { PostView } from "./components/PostBody.tsx";
import { PageView } from "./components/PageBody.tsx";
import { getMdFiles, getImgFiles } from "./routes.ts";

const app = new Hono();
const pa = getMdFiles().postsroute;
const pages = getMdFiles().pagesroute;
const postImage = getImgFiles().imgPostRoute;
const pageImage = getImgFiles().imgPageRoute;
const indexImage = getImgFiles().imgIndexRoute;
const imageRoutes = [...indexImage, ...pageImage, ...postImage];
app.route("/", homepage);
app.route("/posts", postslist);
pages.map((i) => {
  app.get(i.path, (c) => {
    return c.html(<PageView filePath={i.fileLoc} />);
  });
});
pa.map((i) => {
  app.get(i.path, (c) => {
    return c.html(<PostView filePath={i.fileLoc} />);
  });
});
imageRoutes.map((i) => {
  return app.use(i.path, serveStatic({ path: i.fileLoc }));
});
export default app;
