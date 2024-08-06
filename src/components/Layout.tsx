import {
  type FC,
  memo,
  type PropsWithChildren,
  html,
  css,
  Style,
} from "../lib/deps.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";
import { NavBar } from "./NavBar.tsx";
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
            href="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/honoblog.css"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/highlightjs@9.16.2/styles/a11y-dark.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"
          />
          <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
          <script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>
          <title>{title}</title>
          <Style>
            {css`
              .blog-nav {
                padding: 10px;
                font-size: small;
                display: block;
              }
              .blog-nav .left-blog {
                float: left;
              }
              .blog-nav .left-blog a {
                color: var(--cfg);
                text-decoration: none;
              }
              .blog-nav .left-blog a i {
                margin-right: 18px;
              }
              .blog-nav .left-blog a:hover {
                cursor: pointer;
                color: var(--clink);
              }
              .blog-nav .right-blog {
                float: right;
              }
              .blog-nav .right-blog a {
                color: var(--cfg);
                text-decoration: none;
              }
              .blog-nav .right-blog a i {
                margin-left: 18px;
              }
              .blog-nav .right-blog a:hover {
                cursor: pointer;
                color: var(--clink);
              }
              .post {
                display: block;
              }
              .post div.post-head {
                text-align: center;
                border-bottom: 0.5px solid var(--cmed);
                padding: 5px;
              }
              .post div.post-head small {
                margin-right: 27px;
                font-style: italic;
                font-weight: 600;
              }
              .post div.post-body {
                padding: 5px;
                display: contents;
              }
              .post div.post-body p {
                text-align: justify;
                text-indent: 36px;
              }
              .post div.post-body img {
                border-radius: 10px;
                width: 100%;
                height: 100px;
              }
              .nav-link {
                color: var(--cfg);
                text-decoration: none;
              }
              .tb {
                cursor: pointer;
                background-color: transparent;
                border: none;
              }
              .badge {
                background-color: var(--cfg);
                color: var(--cbg);
                text-align: center;
                border-radius: 5px;
                padding: 4px 8px;
                font-size: x-small;
              }
              .head-small {
                margin-right: 18px;
                font-style: italic;
                font-weight: 600;
              }
              .post-link {
                color: var(--cfg);
                text-decoration: none;
              }
            `}
          </Style>
        </head>
        <body>
          <main>
            <NavBar options={options} />
            {children}
          </main>
          {html`
            <script>
              hljs.addPlugin(
                new CopyButtonPlugin({
                  hook: (text, el) => {
                    let { replace, replacewith } = el.dataset;
                    if (replace && replacewith) {
                      return text.replace(replace, replacewith);
                    }
                    return text;
                  },
                  callback: (text, el) => {
                    console.log(text);
                  },
                })
              );
              hljs.highlightAll();
            </script>
          `}
          {/* {html`<script src="https://cdn.jsdelivr.net/gh/phothinmg/master-repo@main/honoB-switch.min.js"></script>`} */}
          {html`
            <script>
              function calculateSettingAsThemeString({
                localStorageTheme,
                systemSettingDark,
              }) {
                if (localStorageTheme !== null) {
                  return localStorageTheme;
                }

                if (systemSettingDark.matches) {
                  return "dark";
                }

                return "light";
              }

              const localStorageTheme = localStorage.getItem("theme");
              const systemSettingDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              );

              let currentThemeSetting = calculateSettingAsThemeString({
                localStorageTheme,
                systemSettingDark,
              });
              const button = document.querySelector("[data-theme-toggle]");
              const currentCta = currentThemeSetting === "dark" ? "☀" : "☪";
              button.innerHTML = currentCta;

              // Set the initial theme on page load
              document
                .querySelector("html")
                .setAttribute("data-theme", currentThemeSetting);

              button.addEventListener("click", () => {
                const newTheme =
                  currentThemeSetting === "dark" ? "light" : "dark";
                const newCta = newTheme === "dark" ? "☀" : "☪";
                button.innerHTML = newCta;
                document
                  .querySelector("html")
                  .setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);
                currentThemeSetting = newTheme;
              });
            </script>
          `}
        </body>
      </html>
    );
  }
);
