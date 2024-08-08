import { Hono, serveStatic, compress, cors, csrf } from "../lib/deps.ts";
import { Home } from "./Home.tsx";
import { PostsList } from "./PostList.tsx";
import { PostView } from "./PostBody.tsx";
import { PageView } from "./PageBody.tsx";
import { getMdFiles, getImgFiles } from "../lib/routes.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";

/**
 * Creates a blog application with specified options.
 * @param options - Optional blog configuration options.
 * @returns The configured Hono application for the blog.
 */
export const honoblog = (options?: HonoBlogOptions): Hono => {
  const app = new Hono();
  const pa = getMdFiles(options).postsroute;
  const pages = getMdFiles(options).pagesroute;
  const postImage = getImgFiles(options).imgPostRoute;
  const pageImage = getImgFiles(options).imgPageRoute;
  const indexImage = getImgFiles(options).imgIndexRoute;
  const imageRoutes = [...indexImage, ...pageImage, ...postImage];
  app.use(compress());
  app.use(cors());
  app.use(csrf());
  app.get("/", (c) => {
    return c.html(<Home options={options} />);
  });

  app.get("/posts", (c) => {
    return c.html(<PostsList options={options} />);
  });

  pages.map((i) => {
    app.get(i.path, (c) => {
      return c.html(<PageView filePath={i.fileLoc} options={options} />);
    });
  });
  pa.map((i) => {
    app.get(i.path, (c) => {
      return c.html(<PostView filePath={i.fileLoc} options={options} />);
    });
  });
  imageRoutes.map((i) => {
    return app.use(i.path, serveStatic({ path: i.fileLoc }));
  });
  return app;
};
