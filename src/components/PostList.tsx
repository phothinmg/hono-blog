import { type FC, memo, html } from "../lib/deps.ts";
import { Layout } from "./Layout.tsx";
import linkArray from "../lib/linkarray.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { NavBar } from "./NavBar.tsx";
import { Footer } from "./Footer.tsx";
export const PostsList: FC<{ options?: HonoBlogOptions }> = memo(
  ({ options }) => {
    const linkA = linkArray(options);
    // const cards = linkA.map(
    //   (i) =>
    //     html`
    //       <div>
    //         <ol>
    //           <li class="post-title">
    //             <a href=${i.path} style="margin-right: 10px">${i.title}</a>
    //             <small>${i.date}</small>
    //           </li>
    //         </ol>
    //       </div>
    //     `
    // );
    return (
      <Layout options={options} seoTitle="All Posts">
        <NavBar options={options} />
        <h3 class="post-title">All Posts</h3>
        <ol>
          {linkA.map(
            (i) => html`
              <li class="post-title">
                <a href=${i.path} style="margin-right: 10px">${i.title}</a>
                <small>${i.date}</small>
              </li>
            `
          )}
        </ol>
        <Footer options={options} />
      </Layout>
    );
  }
);
