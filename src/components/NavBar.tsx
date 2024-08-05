import { type FC, memo, html } from "../deps.ts";
import { getMdFiles } from "../routes.ts";
import { siteName } from "../config.ts";
const pagesRoute = getMdFiles().pagesroute;
const pages = pagesRoute.map(
  (i) =>
    html`
      <li>
        <a href=${i.path}>${i.linkTitle}</a>
      </li>
    `
);

export const NavBar: FC = memo(() => {
  return (
    <header>
      <nav>
        <ul>
          <li style="font-size: 18px">
            <a href="/" class="nav-link">
              {siteName}
            </a>
          </li>
          <li class="float-right tb" type="button" data-theme-toggle style="font-size: 18px;"></li>
          <li class="float-right">
            <a href="#" class="nav-link">
              Pages &#9660;{" "}
            </a>
            <ul>{pages}</ul>
          </li>
          <li class="float-right">
            <a href="/posts" class="nav-link">
              Posts
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
});
