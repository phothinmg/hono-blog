// import { genjson } from "./src/lib/createjson.ts";

// genjson();
import { readFile } from "./src/lib/utils.ts";
import type { MarkOptions } from "./src/lib/createjson.ts";

const tx = readFile("_blog/page/about.json");
const j: MarkOptions = JSON.parse(tx);

console.log(j.attrs.title);
