import { indexFile } from "../lib/config.ts";
import { imgFiles } from "../lib/config.ts";
import { getFilename } from "../lib/getFilename.ts";

export interface Route {
  path: string;
  file: string;
}
export type Routes = Array<Route>;

export const indexRoute: Route = {
  path: "/",
  file: indexFile,
};
export const indexImgRoutes: Routes = [];

imgFiles.forEach((i) => {
  const fn = getFilename(i);
  const iuri = `./${i}`;
  const ro: Route = {
    path: `/${fn}`,
    file: iuri,
  };
  indexImgRoutes.push(ro);
});


