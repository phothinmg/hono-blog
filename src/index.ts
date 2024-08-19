import type { HonoBlogOptions } from "./lib/configuration.ts";
import { honoblog } from "./components/mod.tsx";
import {
  type BlankEnv,
  type BlankSchema,
  type ChildProcess,
  chokidar,
  type Hono,
  npmOpen,
  path,
} from "./lib/deps.ts";
import { generateAllJson, generateWhenChange } from "./lib/createjson.ts";
type Init = {
  start: () => void;
  stop: () => void;
  restart: () => void;
};
class HonoBlog {
  private opts?: HonoBlogOptions;
  private _host: string;
  private _port: number;
  private open: boolean;
  private url: string;
  private watch: boolean;
  private server?: Deno.HttpServer;
  constructor(options?: HonoBlogOptions) {
    this.opts = options;
    this._host = "localhost";
    this._port = this.opts?.server?.port ?? 3838;
    this.open = this.opts?.server?.open ?? false;
    this.url = `http://${this._host}:${this._port}`;
    this.watch = this.opts?.server?.watch ?? false;

    this.run();
  }

  private blog(): Hono<BlankEnv, BlankSchema, "/"> {
    return honoblog(this.opts);
  }

  private async urlOpen(): Promise<ChildProcess | undefined> {
    if (this.open) {
      return await npmOpen.default(this.url);
    }
  }

  private init(): Init {
    const start = () => {
      this.urlOpen();
      this.blog();
      this.server = Deno.serve(
        {
          port: this._port,
          hostname: this._host,
          onListen: () => {
            console.log(`Dev Server at http://${this._host}:${this._port}`);
          },
        },
        this.blog().fetch,
      );
    };
    const stop = () => {
      try {
        this.server?.shutdown();
        console.log("Server shutdown");
      } catch (error) {
        dispatchEvent(new ErrorEvent("error", { error }));
        console.log("Server shutdown error");
      }
    };
    const restart = () => {
      // const files = getAllFiles(this.opts);
      // const found = files.find((i) => i.fileLoc === path);
      this.blog().get("*", (c) => {
        return c.redirect("/");
      });
      this.server = Deno.serve(
        {
          port: this._port,
          hostname: this._host,
          onListen: () => {
            console.log(`Dev Server at http://${this._host}:${this._port}`);
          },
        },
        this.blog().fetch,
      );
    };
    return { start, stop, restart };
  }

  private fswatch(opt: Init) {
    const cwd: string = Deno.cwd();
    const base_dir: string = this.opts?.baseDir ?? "app";
    const app_dir = path.join(cwd, base_dir);
    const watch_blog = chokidar.watch(app_dir, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true,
    });
    watch_blog
      .on(
        "ready",
        () => console.log(`Initial scan complete. Ready for changes`),
      )
      .on("add", (p) => console.log(`File ${p} has been added`))
      .on("change", (p) => {
        console.log(`File ${p} has been changed`);
        opt.stop();
        setTimeout(() => {
          opt.restart();
        }, 5000);
      })
      .on("unlink", (p) => console.log(`File ${p} has been removed`));
  }

  private run(): this {
    if (this.watch) {
      this.fswatch(this.init());
    }
    this.init().start();
    return this;
  }
}
export function blog(options?: HonoBlogOptions) {
  return new HonoBlog(options);
}
