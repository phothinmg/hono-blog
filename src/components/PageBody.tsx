import { type FC, memo } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";
import { NavBar } from "./NavBar.tsx";
import { Layout } from "./Layout.tsx";

export const PageView: FC<{ filePath: string }> = memo(({ filePath }) => {
  const opts: MarkOpts = mark(filePath);
  const inner = { _html: opts.html };
  return (
    <Layout seoTitle={opts.title}>
      <NavBar />
      <div>
        <div
          class="post-body"
          dangerouslySetInnerHTML={{ __html: inner._html }}
        />
      </div>
    </Layout>
  );
});
