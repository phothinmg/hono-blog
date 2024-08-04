import { type FC, memo } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";
import { Layout } from "./Layout.tsx";

export const IndexPage: FC<{ filePath: string; heroContent?: string }> = memo(
  ({ filePath, heroContent }) => {
    const opts: MarkOpts = mark(filePath);
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
          <div class="hero">{heroContent ?? ""}</div>
          <div
            class="post-body"
            dangerouslySetInnerHTML={{ __html: inner._html }}
          />
        </div>
      </Layout>
    );
  }
);
