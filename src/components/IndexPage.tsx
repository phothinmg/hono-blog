import { type FC, memo } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";

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
