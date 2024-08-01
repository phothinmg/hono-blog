import { Hono, serveStatic } from "./deps/hono.ts";
import {
  type Route,
  imagesRoutes,
  indexRoute,
  postRoutes,
  pageRoutes,
} from "./routes/mod.ts";
import { type MarkOpts, mark } from "./lib/mark.ts";
import { MainLayout } from "./components/MainLayout.tsx";

const app = new Hono();

app.get("/", (c) => {
  const md: MarkOpts = mark(indexRoute.file);
  const inner = { _html: md.html };
  return c.html(
    <MainLayout seoTitle={md.title}>
      <article dangerouslySetInnerHTML={{ __html: inner._html }} />
    </MainLayout>
  );
});

pageRoutes.map((i: Route) => {
  const md: MarkOpts = mark(i.file);
  const htm = `
      <article>${md.html}</article>
    `;
  const inner = { _html: htm };
  app.get(i.path, (c) => {
    return c.html(
      <MainLayout seoTitle={md.title}>
        <article dangerouslySetInnerHTML={{ __html: inner._html }} />
      </MainLayout>
    );
  });
});

postRoutes.map((i: Route) => {
  const md: MarkOpts = mark(i.file);
  const htm = `
    <h1>${md.title}</h1>
    <p>${md.description}</p>
    <small>${md.date}</small>
    <article>${md.html}</article>
  `;
  const inner = { _html: htm };
  app.get(i.path, (c) => {
    return c.html(
      <MainLayout seoTitle={md.title}>
        <article dangerouslySetInnerHTML={{ __html: inner._html }} />
      </MainLayout>
    );
  });
});

imagesRoutes.map((i) => {
  return app.use(i.path, serveStatic({ path: i.file}));
});

Deno.serve({ port: 3838 }, app.fetch);
