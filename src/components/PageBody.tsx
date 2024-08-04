import { type FC, memo } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";

export const PageBody: FC<{ filePath: string }> = memo(({ filePath }) => {
  const opts: MarkOpts = mark(filePath);
  const inner = { _html: opts.html };
  return (
    <div>
      <div
        class="post-body"
        dangerouslySetInnerHTML={{ __html: inner._html }}
      />
    </div>
  );
});
