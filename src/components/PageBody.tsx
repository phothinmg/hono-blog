import { type FC, memo } from "../lib/deps.ts";
import { type MarkOpts, mark } from "../lib/markdown.ts";
import { Layout } from "./Layout.tsx";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { NavBar } from "./NavBar.tsx";
import { Footer } from "./Footer.tsx";
export const PageView: FC<{ filePath: string; options?: HonoBlogOptions }> =
  memo(({ filePath, options }) => {
    const opts: MarkOpts = mark(filePath);
    const inner = { _html: opts.html };
    return (
      <Layout seoTitle={opts.title} options={options}>
        <NavBar options={options} />
        <div>
          <div
            class="post-body"
            dangerouslySetInnerHTML={{ __html: inner._html }}
          />
        </div>
        <Footer options={options} />
      </Layout>
    );
  });
