import { mark } from "./markdown.ts";
import { globSync, path } from "./deps.ts";
import type { BlogConfig } from "./configuration.ts";
import { getFilename } from "./utils.ts";

export interface Route {
  path: string;
  filename: string;
}
export interface MRoute extends Route {
  linkTitle: string;
}
export type Routes = Array<Route>;
export type MRoutes = Array<MRoute>;
//
export const getMdFiles = (
  baseUrl: BlogConfig["baseURL"] = "app",
  ignore: string[] = []
): { indexroute: Routes; postsroute: MRoutes; pagesroute: MRoutes } => {
  const cwd = Deno.cwd();
  const appDir = path.join(cwd, baseUrl);
  const cssf: string[] = globSync(`${appDir}/**/*.md`, {
    ignore: ["node_modules", ...ignore],
  });
  const indexroute: Routes = [];
  const postsroute: MRoutes = [];
  const pagesroute: MRoutes = [];

  cssf.forEach((filePath) => {
    try {
      const { title, type } = mark(filePath);
      const fn = title.toLowerCase().split(" ").join("-");
      const route = {
        path: `/${type}s/${fn}`,
        filename: `.${filePath}`,
        linkTitle: title,
      };

      if (type === "index") {
        indexroute.push({ path: "/", filename: `.${filePath}` });
      } else if (type === "post") {
        postsroute.push(route);
      } else if (type === "page") {
        pagesroute.push(route);
      }
    } catch (error) {
      console.log(`Error processing markdown file ${filePath}:`, error);
    }
  });

  return { indexroute, postsroute, pagesroute };
};
//
export const getImgFiles = (
  baseUrl: BlogConfig["baseURL"] = "app",
  ignore: string[] = []
): { imgIndexRoute: Routes; imgPostRoute: Routes; imgPageRoute: Routes } => {
  const cwd = Deno.cwd();
  const appDir = path.join(cwd, baseUrl);
  const files: string[] = globSync(
    `${appDir}/**/*.{png,jpg,svg,gif,jpeg,webp}`,
    {
      ignore: ["node_modules", ...ignore],
    }
  );

  const imgIndexRoute: Routes = [];
  const imgPostRoute: Routes = [];
  const imgPageRoute: Routes = [];

  files.forEach((filePath) => {
    try {
      const filename = getFilename(filePath);
      imgIndexRoute.push({
        path: `/${filename}`,
        filename: `.${filePath}`,
      });
      imgPostRoute.push({
        path: `/posts/${filename}`,
        filename: `.${filePath}`,
      });
      imgPageRoute.push({
        path: `/pages/${filename}`,
        filename: `.${filePath}`,
      });
    } catch (error) {
      console.log(`Error processing image file ${filePath}:`, error);
    }
  });

  return {
    imgIndexRoute,
    imgPostRoute,
    imgPageRoute,
  };
};
