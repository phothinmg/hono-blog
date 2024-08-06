import { type FC, memo } from "../lib/deps.ts";
import { mark } from "../lib/markdown.ts";
import { Layout } from "./Layout.tsx";
import { getMdFiles } from "../lib/routes.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";

export const Home: FC<{ options?: HonoBlogOptions }> = memo(({ options }) => {
  const indexFile = getMdFiles(options).indexroute[0].fileLoc;
  const html = mark(indexFile).html;
  const inner = { _html: html };
  return (
    <Layout options={options}>
      <div
        class="post-body"
        dangerouslySetInnerHTML={{ __html: inner._html }}
      />
    </Layout>
  );
});
