import {
  type BlankEnv,
  type BlankSchema,
  compress,
  cors,
  csrf,
  Hono,
  serveStatic,
} from "../lib/deps.ts";
import { Home } from "./Home.tsx";
import { PostsList } from "./PostList.tsx";
import { PostView } from "./PostBody.tsx";
import { PageView } from "./PageBody.tsx";
import { getImgFiles, getMdFiles } from "../lib/routes.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { getJsonFiles } from "../lib/createjson.ts";

/**
 * Creates a blog application with specified options.
 * @param options - Optional blog configuration options.
 * @returns The configured Hono application for the blog.
 */
export const honoblog = (
  options?: HonoBlogOptions,
): Hono<BlankEnv, BlankSchema, "/"> => {
  const app = new Hono();
  const jsons = getJsonFiles(options);
  const ind = jsons.indexRoute;
  const pa = jsons.postsRoute;
  const pages = jsons.pagesRoute;
  const postImage = getImgFiles(options).imgPostRoute;
  const pageImage = getImgFiles(options).imgPageRoute;
  const indexImage = getImgFiles(options).imgIndexRoute;
  const imageRoutes = [...indexImage, ...pageImage, ...postImage];
  app.use(compress());
  app.use(cors());
  app.use(csrf());
  app.get("/", (c) => {
    return c.html(
      <Home options={options} filePath={ind.jsonFilePath as string} />,
    );
  });

  app.get("/posts", (c) => {
    return c.html(<PostsList options={options} />);
  });

  pages.map((i) => {
    app.get(i.path, (c) => {
      return c.html(
        <PageView filePath={i.jsonFilePath as string} options={options} />,
      );
    });
  });
  pa.map((i) => {
    app.get(i.path, (c) => {
      return c.html(
        <PostView filePath={i.jsonFilePath as string} options={options} />,
      );
    });
  });
  imageRoutes.map((i) => {
    return app.use(i.path, serveStatic({ path: i.fileLoc }));
  });

  return app;
};
