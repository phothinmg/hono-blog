import { type FC, html, memo } from "../lib/deps.ts";
import { mark, type MarkOpts } from "../lib/markdown.ts";
import { Layout } from "./Layout.tsx";
import { readingTime } from "../lib/utils.ts";
import { PNLink } from "./PNLink.tsx";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { NavBar } from "./NavBar.tsx";
export const PostView: FC<{ filePath: string; options?: HonoBlogOptions }> =
  memo(({ filePath, options }) => {
    const opts: MarkOpts = mark(filePath);
    const _rt = readingTime(opts.html);
    const badges = Array.isArray(opts.tags) &&
      opts.tags.map((i) => {
        return html`<small class="chip">${i}</small>`;
      });
    const inner = { _html: opts.html };
    let post_head: string = `
     <h1>${opts.title}</h1>
     <p>${opts.date}</p>
      ${badges}
    `;
    if (opts.cover_photo) {
      post_head = `
      <h1>${opts.title}</h1>
      <p>${opts.date}</p>
      ${badges}
       <img src=${opts.cover_photo} alt="cover_photo" />
      `;
    }
    const inner2 = { _html: post_head };
    return (
      <Layout
        seoTitle={opts.title}
        pageDes={opts.description}
        pageAuthor={opts.author}
        ogTitle={opts.ogtitle}
        ogImage={opts.ogimage}
        ogType={opts.ogtype}
        ogUrl={opts.ogurl}
      >
        <NavBar options={options} />
        <div class="post">
          <div
            class="post-head"
            dangerouslySetInnerHTML={{ __html: inner2._html }}
          />

          <div
            class="post-body"
            dangerouslySetInnerHTML={{ __html: inner._html }}
          />
          <PNLink title={opts.title} options={options} />
        </div>
      </Layout>
    );
  });
