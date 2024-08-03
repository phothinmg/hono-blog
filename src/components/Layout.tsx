import { type FC, memo, type PropsWithChildren, html } from "../deps.ts";
import { bundled_css } from "../bundlecss.ts";
import type { BlogConfig } from "../configuration.ts";

export interface LayoutProps extends PropsWithChildren {
  opts?: BlogConfig;
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
    opts,
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
      ? opts?.name + " " + "|" + " " + seoTitle
      : opts?.name;
    const kw = opts?.meta?.keywords ?? [];
    const gen = opts?.meta?.generator ? "Hono" : "";
    const des = pageDes ? pageDes : opts?.meta?.description;
    const author = pageAuthor ? pageAuthor : opts?.meta?.author;
    const cs = opts?.meta?.colorScheme ?? "normal";
    const ogtitle = ogTitle ?? opts?.openGraph?.ogTitle;
    const ogtype = ogType ?? opts?.openGraph?.ogType;
    const ogimage = ogImage ?? opts?.openGraph?.ogImage;
    const ogurl = ogUrl ?? opts?.openGraph?.ogUrl;
    return (
      <html prefix="og: https://ogp.me/ns#" lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="color-scheme" content={cs} />
          <meta name="description" content={des} />
          <meta name="author" content={author} />
          <meta name="generator" content={gen} />
          <meta name="keywords" content={kw.join(",")} />
          <meta property="og:title" content={ogtitle} />
          <meta property="og:type" content={ogtype} />
          <meta property="og:image" content={ogimage} />
          <meta property="og:url" content={ogurl} />
          <link
            rel="shortcut icon"
            href={opts?.meta?.favicon}
            type="image/x-icon"
          />
          <title>{title}</title>
          <style>{bundled_css}</style>
        </head>
        <body>
          <main>{children}</main>
          {html`<script src="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/theme-switch.js"></script>`}
        </body>
      </html>
    );
  }
);
