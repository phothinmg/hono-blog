import type { HonoBlogOptions } from "./lib/configuration.ts";
import { honoblog } from "./components/mod.tsx";

export const blog = (options: HonoBlogOptions) => {
  return honoblog(options);
};

export type { HonoBlogOptions };
