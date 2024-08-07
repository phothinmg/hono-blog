import { transformContent, type LTR } from "../lib/deps.ts";
import { readFile } from "../lib/utils.ts";

export const bundlecss = (files: string[]): string => {
  const content: string[] = files.map((file) => readFile(file));
  const cssContent = content.join("\n");
  const bd = transformContent({
    content: cssContent,
    minify: true,
  }) as LTR;
  return bd.csscode;
};

export const bundled_css = bundlecss(["src/style/add-on.css"]);
