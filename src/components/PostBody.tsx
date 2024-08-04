import { type FC, memo } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";
import { Layout } from "./Layout.tsx";
import { readingTime } from "../utils.ts";

export const PostBody: FC<{ filePath: string }> = memo(({ filePath }) => {
  const opts: MarkOpts = mark(filePath);
  const rt = readingTime(opts.html);
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
      <div>
        <div class="post-head">
          <h2>{opts.title}</h2>
          <small class="head-small">{opts.date}</small>
          <small class="head-small">{`Reading Time: ${rt}  minutes`}</small>
          <br />
          {opts.tags?.map((i) => {
            `<small class="badge">${i}</small>`;
          })}
        </div>
        <div
          class="post-body"
          dangerouslySetInnerHTML={{ __html: inner._html }}
        />
      </div>
    </Layout>
  );
});
