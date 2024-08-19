import type { HonoBlogOptions } from "./configuration.ts";
import { chokidar, path } from "./deps.ts";

export const fsWatcher = (options: HonoBlogOptions) => {
    const dir = options.baseDir ?? "app";
    const cwd = Deno.cwd();
    const appDir = path.join(cwd, dir);
    const watcher = chokidar.watch(appDir, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true,
        ignoreInitial: true,
    });
    const log = console.log.bind(console);
    watcher
        .on("ready", () => log(`Initial scan complete. Ready for changes`))
        .on("add", (path) => log(`File ${path} has been added`))
        .on("change", (path) => {
            log(`File ${path} has been changed`);
        })
        .on("unlink", (path) => log(`File ${path} has been removed`));
};
