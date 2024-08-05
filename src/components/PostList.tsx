import { type FC, memo, Hono, html } from "../lib/deps.ts";
import { Layout } from "./Layout.tsx";
import linkArray from "../lib/linkarray.ts";
const postslist = new Hono();

const PostCards: FC = memo(() => (
  <>
    {linkArray.map(
      (i) =>
        html`
          <div class="card">
            <a href=${i.path} class="post-link" rel="noopener noreferrer">
              <h3>${i.title}</h3>
            </a>
            <small class="head-small">${i.date}</small>
            <small class="head-small">${i.readingTime}</small>
            <br />
            <br />
            ${Array.isArray(i.tags)
              ? i.tags.map(
                  (tag) =>
                    html`<small class="badge" style="margin-right: 7px;"
                      >${tag}</small
                    >`
                )
              : ""}
            <br />
            <br />
            <hr />
            <p>${i.des ?? " "}</p>
          </div>
        `
    )}
  </>
));

const PostList: FC = memo(() => (
  <>
    <Layout seoTitle="All Posts">
      <PostCards />
    </Layout>
  </>
));

postslist.get("/", (c) => {
  return c.html(<PostList />);
});

export default postslist;
