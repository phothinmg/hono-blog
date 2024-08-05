import { mark } from "./markdown.ts";
import { globSync, path } from "./deps.ts";
import { getFilename } from "./utils.ts";
import { baseDir, ignore } from "./config.ts";

export interface Route {
  path: string;
  fileLoc: string;
}
export interface PageRoute extends Route {
  linkTitle: string;
}
export interface PostRoute extends PageRoute {
  birthtime: Date | null;
  f_name: string;
}
export type Routes = Array<Route>;
export type PageRoutes = Array<PageRoute>;
export type PostRoutes = Array<PostRoute>;
//
export const getMdFiles = (): {
  indexroute: Routes;
  postsroute: PostRoutes;
  pagesroute: PageRoutes;
} => {
  const cwd = Deno.cwd();
  const appDir = path.join(cwd, baseDir);
  const cssf: string[] = globSync(`${appDir}/**/*.md`, {
    ignore: ["node_modules", ...ignore],
  });
  const indexroute: Routes = [];
  const postsroute: PostRoutes = [];
  const pagesroute: PageRoutes = [];

  cssf.forEach((filePath) => {
    try {
      const { title, type } = mark(filePath);
      const fn = title.toLowerCase().split(" ").join("-");
      const route = {
        path: `/${type}s/${fn}`,
        fileLoc: filePath,
        linkTitle: title,
      };
      const post_route = {
        path: `/${type}s/${fn}`,
        fileLoc: filePath,
        linkTitle: title,
        birthtime: Deno.statSync(filePath).birthtime,
        f_name: fn,
      };

      if (type === "index") {
        indexroute.push({ path: "/", fileLoc: filePath });
      } else if (type === "post") {
        postsroute.push(post_route);
      } else if (type === "page") {
        pagesroute.push(route);
      }
    } catch (error) {
      console.log(`Error processing markdown file ${filePath}:`, error);
    }
  });
  postsroute.sort((a, b) => {
    if (a.birthtime && b.birthtime) {
      return b.birthtime.getTime() - a.birthtime.getTime();
    } else {
      // Handle the case when either a.birthtime or b.birthtime is null
      // You can decide how you want to handle this case
      return 0;
    }
  });
  return { indexroute, postsroute, pagesroute };
};
//
export const getImgFiles = (): {
  imgIndexRoute: Routes;
  imgPostRoute: Routes;
  imgPageRoute: Routes;
} => {
  const cwd = Deno.cwd();
  const appDir = path.join(cwd, baseDir);
  const files: string[] = globSync(
    `${appDir}/**/*.{png,jpg,svg,gif,jpeg,webp,ico}`,
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
        fileLoc: filePath,
      });
      imgPostRoute.push({
        path: `/posts/${filename}`,
        fileLoc: filePath,
      });
      imgPageRoute.push({
        path: `/pages/${filename}`,
        fileLoc: filePath,
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
