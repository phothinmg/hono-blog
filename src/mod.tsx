import { Hono } from "./deps.ts";

import { Layout } from "./components/Layout.tsx";
import { PostsList } from "./components/PostList.tsx";
import { IndexPage } from "./components/IndexPage.tsx";

const app = new Hono();

app.get("/", (c) => {
  return c.html(
    <Layout>
      <IndexPage filePath="app/index.md" />
    </Layout>
  );
});

Deno.serve(app.fetch);
