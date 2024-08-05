import { Hono, serveStatic } from "../lib/deps.ts";
import homepage from "./Home.tsx";
import postslist from "./PostList.tsx";
import { PostView } from "./PostBody.tsx";
import { PageView } from "./PageBody.tsx";
import { getMdFiles, getImgFiles } from "../lib/routes.ts";

export const blog = () => {
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
  return app;
};
