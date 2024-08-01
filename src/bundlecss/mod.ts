import { transformContent, type LTR } from "../deps/bagancss.ts";
import { readFile } from "../utils/mod.ts";

const bundlecss = (files: string[]): string => {
  const content: string[] = files.map((file) => readFile(file));
  const cssContent = content.join("\n");
  const bd = transformContent({
    content: cssContent,
    minify: true,
    sourceMap: true,
  }) as LTR;
  return bd.csscode + "\n" + bd.mapcode;
};

const css_files = [
  "src/style/_import.css",
  "src/style/main.css",
  "src/style/theme.css",
  "src/style/others.css",
];

export const bundled_css = bundlecss(css_files);
