import { ensureDirSync, type Extract, extractYaml, path } from "./deps.ts";
import { readFile } from "./utils.ts";
import {
    getMdFiles,
    type PageRoute,
    type PageRoutes,
    type PostRoute,
    type PostRoutes,
    type Route,
} from "./routes.ts";
import type { HonoBlogOptions } from "./configuration.ts";
import type { MarkOptions } from "./routes.ts";

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

const cwd = Deno.cwd();
const wdir = path.join(cwd, "_blog");

const postdir = path.join(wdir, "posts");

const pagedir = path.join(wdir, "page");

ensureDirSync(wdir);
setTimeout(() => {
    ensureDirSync(postdir);
    ensureDirSync(pagedir);
}, 2000);

export function getMarkdownFiles(options?: HonoBlogOptions): {
    indexMD: Route;
    postMD: PostRoutes;
    pageMD: PageRoutes;
} {
    const mdFiles = getMdFiles(options);
    if (!mdFiles.indexroute || !mdFiles.postsroute || !mdFiles.pagesroute) {
        throw new Error("Invalid markdown file structure");
    }
    const indexMD = mdFiles.indexroute[0];
    const postMD = mdFiles.postsroute;
    const pageMD = mdFiles.pagesroute;
    return {
        indexMD,
        postMD,
        pageMD,
    };
}

/**
 * Retrieves and processes markdown files to generate JSON files for index, posts, and pages.
 *
 * @param options - Optional HonoBlogOptions for customization.
 * @returns An object containing indexMD, postMD, pageMD, indexRoute, postsRoute, and pagesRoute.
 */
export function getJsonFiles(options?: HonoBlogOptions): {
    indexRoute: IndexRoute;
    postsRoute: PostsRoute[];
    pagesRoute: PagesRoute[];
} {
    const mdFiles = getMarkdownFiles(options);
    const indexMD = mdFiles.indexMD;
    if (!indexMD) {
        throw new Error(
            `indexMD is null or undefined. Value: ${JSON.stringify(indexMD)}`,
        );
    }
    const postMD = mdFiles.postMD;
    const pageMD = mdFiles.pageMD;
    const indexRoute: IndexRoute = { ...indexMD };
    indexRoute.jsonFilePath = path.join(wdir, "index.json");

    const postsRoute: Array<PostsRoute> = [];
    postMD.forEach((i) => {
        const a: PostsRoute = { ...i };
        if (i.f_name) {
            a.jsonFilePath = path.join(postdir, `${i.f_name}.json`);
            postsRoute.push(a);
        }
    });

    const pagesRoute: Array<PagesRoute> = [];
    pageMD.forEach((i) => {
        const a: PagesRoute = { ...i };
        if (i.f_name) {
            a.jsonFilePath = path.join(pagedir, `${i.f_name}.json`);
            pagesRoute.push(a);
        }
    });

    return {
        indexRoute,
        postsRoute,
        pagesRoute,
    };
}
/**
 * Helper function to read a markdown file and extract its YAML front matter.
 *
 * @param fileLoc - The location of the markdown file.
 * @returns The extracted YAML front matter.
 */
function readAndExtractYaml(fileLoc: string): Extract<MarkOptions> {
    try {
        const txt = readFile(fileLoc);
        return extractYaml<MarkOptions>(txt);
    } catch (error) {
        console.error(
            `Error reading or extracting YAML from ${fileLoc}:`,
            error,
        );
        throw error;
    }
}

/**
 * Generates a JSON file for the index route based on the provided options.
 * Reads the markdown file for the index route, extracts YAML front matter,
 * and writes the JSON data to the specified file path.
 *
 * @param options - Optional HonoBlogOptions for customization.
 */
export function generateIndexJson(options?: HonoBlogOptions): void {
    try {
        const indexMD = getMarkdownFiles(options).indexMD;
        if (indexMD?.fileLoc == null) {
            throw new Error("indexMD.fileLoc is undefined");
        }
        const _indexjson = readAndExtractYaml(indexMD.fileLoc);
        const _indexfn = path.join(wdir, "index.json");
        Deno.writeTextFileSync(_indexfn, JSON.stringify(_indexjson, null, 2));
    } catch (error) {
        console.error("Error generating index JSON:", error);
    }
}
/**
 * Generates JSON files for each post based on the provided options.
 *
 * @param options - Optional HonoBlogOptions for customization.
 * @returns void
 */
export function generatePostJson(options?: HonoBlogOptions): void {
    try {
        const postMD = getMarkdownFiles(options).postMD;
        postMD.forEach((i) => {
            if (i?.fileLoc == null) {
                throw new Error("i.fileLoc is undefined");
            }
            const c = readAndExtractYaml(i.fileLoc);
            if (c) {
                const fn = path.join(postdir, `${i.f_name}.json`);
                Deno.writeTextFileSync(fn, JSON.stringify(c, null, 2));
            }
        });
    } catch (error) {
        console.error("Error generating post JSON:", error);
    }
}
/**
 * Generates JSON files for each page based on the provided options.
 *
 * @param options - The options for generating the JSON files.
 * @returns void
 */
export function generatePageJson(options?: HonoBlogOptions): void {
    try {
        const pageMD = getMarkdownFiles(options).pageMD;
        pageMD.forEach((i) => {
            if (i?.fileLoc == null) {
                throw new Error("i.fileLoc is undefined");
            }
            const c = readAndExtractYaml(i.fileLoc);
            const fn = path.join(pagedir, `${i.f_name}.json`);
            Deno.writeTextFileSync(fn, JSON.stringify(c, null, 2));
        });
    } catch (error) {
        console.error("Error generating page JSON:", error);
    }
}
/**
 * Generates JSON files for the index, pages, and posts asynchronously with delays.
 *
 * @param options - The options for generating the JSON files.
 */
export function generateAllJson(options?: HonoBlogOptions): void {
    generateIndexJson(options);
    setTimeout(() => {
        generatePageJson(options);
        setTimeout(() => {
            generatePostJson(options);
        }, 3000);
    }, 2000);
}
/**
 * Check is md or not
 *
 * @param filePath
 * @returns {boolean}
 */
export const isMd = (filePath: string): boolean =>
    path.extname(filePath) === ".md";

export function generateWhenChange(filePath: string) {
    const ismd = isMd(filePath);
    if (!ismd) {
        console.log(`File ${filePath} is not a markdown file.`);
        return;
    }
    const j: Extract<MarkOptions> = readAndExtractYaml(filePath);
    const fn = j.attrs.attrs.title.toLowerCase().split(" ").join("-");
    const fname = `${fn}.json`;
    const type = j.attrs.attrs.type;
    const json = JSON.stringify(j, null, 2);
    let file: string = "";
    if (type === "index") {
        file = path.join(wdir, fname);
    } else if (type === "page") {
        file = path.join(pagedir, fname);
    } else if (type === "post") {
        file = path.join(postdir, fname);
    } else {
        console.log(`${type} must be "index" | "post" | "page"`);
        return;
    }
    Deno.writeTextFileSync(file, json);
}
