import { type FC, memo, html } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";
import { Layout } from "./Layout.tsx";
import { readingTime } from "../utils.ts";
import { NavBar } from "./NavBar.tsx";
export const PostView: FC<{ filePath: string }> = memo(({ filePath }) => {
  const opts: MarkOpts = mark(filePath);
  const rt = readingTime(opts.html);
  const badges =
    Array.isArray(opts.tags) &&
    opts.tags.map((i) => {
      return html`<small>${i}</small>`;
    });
  const inner = { _html: opts.html };
  return (
    <Layout
      seoTitle={opts.title}
      pageDes={opts.description}
      pageAuthor={opts.author}
      ogTitle={opts.ogtitle}
      ogImage={opts.ogimage}
      ogType={opts.ogtype}
      ogUrl={opts.ogurl}
    >
      <NavBar />
      <div>
        <div class="post-head">
          <h3>{opts.title}</h3>
          <small class="head-small">{opts.date}</small>
          <small class="head-small">{`Reading Time: ${rt}  minutes`}</small>
          <br />
          {badges}
        </div>
        <div
          class="post-body"
          dangerouslySetInnerHTML={{ __html: inner._html }}
        />
      </div>
    </Layout>
  );
});
