import { type FC, memo, Hono } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";
import { type HonoBlogOptions } from "../configuration.ts";
import { getMdFiles } from "../routes.ts";
import { Layout } from "./Layout.tsx";

  export const IndexPage: FC<{ filePath: string; heroContent?: string }> = memo(
    ({ filePath, heroContent }) => {
      const opts: MarkOpts = mark(filePath);
      const inner = { _html: opts.html };
      return (
        <div>
          <div class="hero">{heroContent ?? ""}</div>
          <div
            class="post-body"
            dangerouslySetInnerHTML={{ __html: inner._html }}
          />
        </div>
      );
    }
  );
  