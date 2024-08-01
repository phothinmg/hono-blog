import { type FC, memo, type PropsWithChildren } from "../deps/hono.ts";
import {
  siteName,
  siteAuthor,
  siteDescription,
  siteKeywords,
  siteFavicon,
} from "../lib/config.ts";
import { bundled_css } from "../bundlecss/mod.ts";
import { NavBar } from "./NavBar.tsx";
interface MainLayoutProps extends PropsWithChildren {
  seoTitle?: string;
}

export const MainLayout: FC<MainLayoutProps> = memo(
  ({ seoTitle, children }) => {
    const title: string = seoTitle ? siteName + " | " + seoTitle : siteName;
    return (
      <html prefix="og: https://ogp.me/ns#" lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content={siteDescription} />
          <meta name="author" content={siteAuthor} />
          <meta name="keywords" content={siteKeywords.join(",")} />
          <link rel="shortcut icon" href={siteFavicon} type="image/x-icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <script
            src="https://kit.fontawesome.com/50c925d5df.js"
            crossorigin="anonymous"
          ></script>
          <title>{title}</title>
          <style>{bundled_css}</style>
        </head>
        <body>
          <main>
            <NavBar />
            {children}
          </main>
        </body>
      </html>
    );
  }
);
