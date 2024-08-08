import { type FC, memo, type PropsWithChildren, html } from "../lib/deps.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { siteData } from "../lib/config.ts";
export interface LayoutProps extends PropsWithChildren {
  options?: HonoBlogOptions;
  seoTitle?: string;
  pageDes?: string;
  pageAuthor?: string;
  ogTitle?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
}

export const Layout: FC<LayoutProps> = memo(
  ({
    options,
    seoTitle,
    pageDes,
    pageAuthor,
    ogTitle,
    ogImage,
    ogType,
    ogUrl,
    children,
  }) => {
    const data = siteData(options);
    const title = seoTitle
      ? data.siteName + " " + "|" + " " + seoTitle
      : data.siteName;
    const gen = data.generator ? "Hono" : "";
    const des = pageDes ? pageDes : data.description;
    const aut = pageAuthor ? pageAuthor : data.author;
    const ogtit = ogTitle ?? data.ogtitle;
    const ogtyp = ogType ?? data.ogtype;
    const ogimg = ogImage ?? data.ogimage;
    const ogur = ogUrl ?? data.ogurl;
    return (
      <html prefix="og: https://ogp.me/ns#" lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="color-scheme" content="dark light" />
          <meta name="description" content={des} />
          <meta name="author" content={aut} />
          <meta name="generator" content={gen} />
          <meta name="keywords" content={data.keywords.join(",")} />
          <meta property="og:title" content={ogtit} />
          <meta property="og:type" content={ogtyp} />
          <meta property="og:image" content={ogimg} />
          <meta property="og:url" content={ogur} />
          <link rel="shortcut icon" href={data.favicon} type="image/x-icon" />
          <script
            src="https://kit.fontawesome.com/50c925d5df.js"
            crossorigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/honoblog/index.css"
          ></link>
          <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
          <script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>
          <title>{title}</title>
        </head>
        <body>
          <main>{children}</main>
          {html`
            <script src="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/honoblog/theme-button.min.js"></script>
            <script src="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/honoblog/highlight-copy-button.min.js"></script>
          `}
        </body>
      </html>
    );
  }
);
