import { postFiles, imgFiles } from "../lib/config.ts";
import { mark } from "../lib/mark.ts";
import type { Route, Routes } from "./index_route.ts";
import { getFilename } from "../lib/getFilename.ts";


export const postRoutes: Routes = [];
export const postImgRoutes: Routes = [];

postFiles.forEach((i) => {
  const title = mark(i).title.toLowerCase().split(" ").join("-");
  const ro: Route = {
    path: `/posts/${title}`,
    file: i,
  };
  postRoutes.push(ro);
});

imgFiles.forEach((i) => {
  const fn = getFilename(i);
  const iuri = `./${i}`;
  const ro: Route = {
    path: `/posts/${fn}`,
    file: iuri,
  };
  postImgRoutes.push(ro);
});


