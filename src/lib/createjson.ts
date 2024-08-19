import { ensureDirSync, extractYaml, path } from "./deps.ts";
import { readFile } from "./utils.ts";
import {
    getMdFiles,
    type PageRoute,
    type PostRoute,
    type Route,
} from "./routes.ts";

export type MarkOptions = {
    frontmatter: string;
    body: string;
    attrs: {
        type: "post";
        title: string;
        description?: string;
        date?: Date | string;
        author?: string;
        tags?: string[];
        ogimage?: string;
        ogurl?: string;
        ogtype?: string;
        ogtitle?: string;
        cover_photo?: string;
    };
};

// Routes
export interface IndexRoute extends Route {
    jsonFilePath?: string;
}
export interface PostsRoute extends PostRoute {
    jsonFilePath?: string;
}
export interface PagesRoute extends PageRoute {
    jsonFilePath?: string;
}
const indexMD = getMdFiles().indexroute[0];
const postMD = getMdFiles().postsroute;
const pageMD = getMdFiles().pagesroute;

const cwd = Deno.cwd();
const wdir = path.join(cwd, "_blog");

const postdir = path.join(wdir, "posts");

const pagedir = path.join(wdir, "page");

ensureDirSync(wdir);
setTimeout(() => {
    ensureDirSync(postdir);
    ensureDirSync(pagedir);
}, 2000);

//
const indexRoute: IndexRoute = { ...indexMD };
indexRoute.jsonFilePath = path.join(wdir, "index.json");

const postsRoute: Array<PostsRoute> = [];
postMD.forEach((i) => {
    const a: PostsRoute = { ...i };
    a.jsonFilePath = path.join(postdir, `${i.f_name}.json`);
    postsRoute.push(a);
});

const pagesRoute: Array<PagesRoute> = [];
pageMD.forEach((i) => {
    const a: PagesRoute = { ...i };
    a.jsonFilePath = path.join(pagedir, `${i.f_name}.json`);
    pagesRoute.push(a);
});
//
function inj() {
    const indextxt = readFile(indexMD.fileLoc);
    const _indexjson = extractYaml<MarkOptions>(indextxt);
    const _indexfn = path.join(wdir, "index.json");
    Deno.writeTextFileSync(_indexfn, JSON.stringify(_indexjson, null, 2));
}

function poj() {
    postMD.forEach((i) => {
        const txt = readFile(i.fileLoc);
        const c = extractYaml<MarkOptions>(txt);
        const fn = path.join(postdir, `${i.f_name}.json`);
        Deno.writeTextFileSync(fn, JSON.stringify(c, null, 2));
    });
}

function paj() {
    pageMD.forEach((i) => {
        const txt = readFile(i.fileLoc);
        const c = extractYaml<MarkOptions>(txt);
        const fn = path.join(pagedir, `${i.f_name}.json`);
        Deno.writeTextFileSync(fn, JSON.stringify(c, null, 2));
    });
}

function genjson() {
    setTimeout(inj, 2000);
    setTimeout(paj, 2000);
    setTimeout(poj, 3000);
}

export { genjson, indexRoute, pagesRoute, postsRoute };
