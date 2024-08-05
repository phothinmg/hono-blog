import { type FC, memo, Hono, html } from "../deps.ts";
import { Layout } from "./Layout.tsx";
import { NavBar } from "./NavBar.tsx";
import linkArray from "../linkarray.ts";
const postslist = new Hono();

const PostCards: FC = memo(() => (
  <>
    {linkArray.map(
      (i) =>
        html`
          <div class="card">
            <a href="{linkArray.}" class="post-link">
              <h3>${i.title}</h3>
            </a>
            <small class="head-small">${i.date}</small>
            <small class="head-small">${i.readingTime}</small>
            <br />
            ${i.tags?.map((i) => html`<small class="badge">${i}</small>`)}
            <hr />
            <p>${i.des ?? ""}</p>
          </div>
        `
    )}
  </>
));

const PostList: FC = memo(() => (
  <>
    <Layout seoTitle="All Posts">
      <NavBar />
      <PostCards />
    </Layout>
  </>
));

postslist.get("/", (c) => {
  return c.html(<PostList />);
});

export default postslist;
