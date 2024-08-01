import {
  indexRoute,
  indexImgRoutes,
  type Routes,
  type Route,
} from "./index_route.ts";
import { postImgRoutes, postRoutes } from "./posts_route.ts";
import { pageImgRoutes, pageRoutes } from "./pages_route.ts";

export const imagesRoutes: Routes = [
  ...indexImgRoutes,
  ...postImgRoutes,
  ...pageImgRoutes,
];
export { type Routes, type Route, indexRoute, postRoutes, pageRoutes };
