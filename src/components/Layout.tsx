import { type FC, memo, type PropsWithChildren, html } from "../deps.ts";
import type { HonoBlogOptions } from "../configuration.ts";
import {
  siteName,
  keywords,
  generator,
  description,
  author,
  ogtitle,
  ogimage,
  ogtype,
  ogurl,
  favicon,
} from "../config.ts";
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
    seoTitle,
    pageDes,
    pageAuthor,
    ogTitle,
    ogImage,
    ogType,
    ogUrl,
    children,
  }) => {
    const title = seoTitle ? siteName + " " + "|" + " " + seoTitle : siteName;
    const kw = keywords ?? [];
    const gen = generator ? "Hono" : "";
    const des = pageDes ? pageDes : description;
    const aut = pageAuthor ? pageAuthor : author;
    const ogtit = ogTitle ?? ogtitle;
    const ogtyp = ogType ?? ogtype;
    const ogimg = ogImage ?? ogimage;
    const ogur = ogUrl ?? ogurl;
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
          <meta name="keywords" content={kw.join(",")} />
          <meta property="og:title" content={ogtit} />
          <meta property="og:type" content={ogtyp} />
          <meta property="og:image" content={ogimg} />
          <meta property="og:url" content={ogur} />
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          <script
            src="https://kit.fontawesome.com/50c925d5df.js"
            crossorigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/hono-blog.css"
          ></link>
          <title>{title}</title>
        </head>
        <body>
          <main>{children}</main>
          {html`<script src="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/theme-switch.min.js"></script>`}
        </body>
      </html>
    );
  }
);
