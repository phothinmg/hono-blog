import { type FC, memo } from "../lib/deps.ts";
import { type MarkOpts, mark } from "../lib/markdown.ts";
import { Layout } from "./Layout.tsx";

export const PageView: FC<{ filePath: string }> = memo(({ filePath }) => {
  const opts: MarkOpts = mark(filePath);
  const inner = { _html: opts.html };
  return (
    <Layout seoTitle={opts.title}>
      <div>
        <div
          class="post-body"
          dangerouslySetInnerHTML={{ __html: inner._html }}
        />
      </div>
    </Layout>
  );
});
