import { type FC, memo, html } from "../lib/deps.ts";
import { Layout } from "./Layout.tsx";
import linkArray from "../lib/linkarray.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { NavBar } from "./NavBar.tsx";
export const PostsList: FC<{ options?: HonoBlogOptions }> = memo(
  ({ options }) => {
    const linkA = linkArray(options);
    const cards = linkA.map(
      (i) =>
        html`
          <div class="card">
            <a href=${i.path}>
              <h3>${i.title}</h3>
            </a>
            <small>${i.date}</small>
            <small>${i.readingTime}</small>
            <br />
            <br />
            ${Array.isArray(i.tags)
              ? i.tags.map((tag) => html`<small>${tag}</small>`)
              : ""}
            <br />
            <br />
            <hr />
            <p>${i.des ?? " "}</p>
          </div>
        `
    );
    return (
      <Layout options={options} seoTitle="All Posts">
        <NavBar options={options} />
        {cards}
      </Layout>
    );
  }
);
