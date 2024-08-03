import { type FC, memo } from "../deps.ts";
import { type MarkOpts, mark } from "../markdown.ts";
import { Layout } from "./Layout.tsx";

export const IndexPage: FC<{ filePath: string; heroContent: string }> = memo(
  ({ filePath, heroContent }) => {
    const opts: MarkOpts = mark(filePath);
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
          <div class="hero">{heroContent}</div>
          <div class="post-body">{opts.html}</div>
        </div>
      </Layout>
    );
  }
);
