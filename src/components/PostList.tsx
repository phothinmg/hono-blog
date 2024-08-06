import { type FC, memo, html } from "../lib/deps.ts";
import { Layout } from "./Layout.tsx";
import linkArray from "../lib/linkarray.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";

export const PostsList: FC<{ options?: HonoBlogOptions }> = memo(
  ({ options }) => {
    const linkA = linkArray(options);
    const cards = linkA.map(
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
    );
    return (
      <Layout options={options} seoTitle="All Posts">
        {cards}
      </Layout>
    );
  }
);
