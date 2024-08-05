import { transformContent, type LTR } from "./deps.ts";
import { readFile } from "./utils.ts";

const bundlecss = (files: string[]): string => {
  const content: string[] = files.map((file) => readFile(file));
  const cssContent = content.join("\n");
  const bd = transformContent({
    content: cssContent,
  }) as LTR;
  return bd.csscode + "\n" + bd.mapcode;
};

const css_files = ["src/style/add-on.css"];

export const bundled_css = bundlecss(css_files);
