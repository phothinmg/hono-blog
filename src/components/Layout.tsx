import { type FC, memo, type PropsWithChildren, html } from "../deps.ts";
import { bundled_css } from "../bundlecss.ts";
import type { HonoBlogOptions } from "../configuration.ts";
import { NavBar } from "./NavBar.tsx";

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
    //
    seoTitle,
    pageDes,
    pageAuthor,
    ogTitle,
    ogImage,
    ogType,
    ogUrl,
    children,
  }) => {
    const title = seoTitle
      ? options?.siteName + " " + "|" + " " + seoTitle
      : options?.siteName;
    const kw = options?.meta?.keywords ?? [];
    const gen = options?.meta?.generator ? "Hono" : "";
    const des = pageDes ? pageDes : options?.meta?.description;
    const aut = pageAuthor ? pageAuthor : options?.meta?.author;
    const ogtit = ogTitle ?? options?.meta?.ogtitle;
    const ogtyp = ogType ?? options?.meta?.ogtype;
    const ogimg = ogImage ?? options?.meta?.ogimage;
    const ogur = ogUrl ?? options?.meta?.ogurl;
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
          <link
            rel="shortcut icon"
            href={options?.meta?.favicon}
            type="image/x-icon"
          />
          <script
            src="https://kit.fontawesome.com/50c925d5df.js"
            crossorigin="anonymous"
          ></script>
          <title>{title}</title>
          <style>{bundled_css}</style>
        </head>
        <body>
          <NavBar baseUrl={options?.baseDir} ignore={options?.ignore} />
          <main>{children}</main>
          {html`<script src="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/theme-switch.min.js"></script>`}
        </body>
      </html>
    );
  }
);
