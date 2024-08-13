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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/honoblog/index.min.css"
          />
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
