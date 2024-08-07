import { type FC, memo } from "../lib/deps.ts";
import { mark } from "../lib/markdown.ts";
import { Layout } from "./Layout.tsx";
import { getMdFiles } from "../lib/routes.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { NavBar } from "./NavBar.tsx";
import { Footer } from "./Footer.tsx";

export const Home: FC<{ options?: HonoBlogOptions }> = memo(({ options }) => {
  const indexFile = getMdFiles(options).indexroute[0].fileLoc;
  const data = mark(indexFile);
  const html = data.html;
  const inner = { _html: html };
  return (
    <Layout options={options} seoTitle={data.title}>
      <NavBar options={options} />
      <div
        class="post-body"
        dangerouslySetInnerHTML={{ __html: inner._html }}
      />
      <Footer options={options} />
    </Layout>
  );
});
