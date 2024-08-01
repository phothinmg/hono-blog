import { pageFiles, imgFiles } from "../lib/config.ts";
import { mark } from "../lib/mark.ts";
import type { Route, Routes } from "./index_route.ts";
import { getFilename } from "../lib/getFilename.ts";


export const pageRoutes: Routes = [];
export const pageImgRoutes: Routes = [];

pageFiles.forEach((i) => {
  const title = mark(i).title.toLowerCase().split(" ").join("-");
  const ro: Route = {
    path: `/pages/${title}`,
    file: i,
  };
  pageRoutes.push(ro);
});

imgFiles.forEach((i) => {
  const fn = getFilename(i);
  const iuri = `./${i}`;
  const ro: Route = {
    path: `/pages/${fn}`,
    file: iuri,
  };
  pageImgRoutes.push(ro);
});


