import { type FC, memo, Hono } from "../lib/deps.ts";
import { mark } from "../lib/markdown.ts";
import { Layout } from "./Layout.tsx";
import { getMdFiles } from "../lib/routes.ts";

const homepage = new Hono();

const indexFile = getMdFiles().indexroute[0].fileLoc;
const html = mark(indexFile).html;
const inner = { _html: html };

const Home: FC = memo(() => (
  <>
    <Layout>
      <div
        class="post-body"
        dangerouslySetInnerHTML={{ __html: inner._html }}
      />
    </Layout>
  </>
));

homepage.get("/", (c) => {
  return c.html(<Home />);
});

export default homepage;
