import { type FC, memo } from "../deps.ts";
import { getMdFiles } from "../routes.ts";
import type { BlogConfig } from "../configuration.ts";

export const NavBar: FC<{ baseUrl?: BlogConfig["baseURL"]; ignore?: string[] }> =
  memo(({ baseUrl = "app", ignore = [] }) => {
    const pr = getMdFiles(baseUrl, ignore).pagesroute;
    return (
      <header>
        <nav>
          <ul>
            <li style="font-size: 18px">
              <a href="/" class="nav-link">
                Hono Blog
              </a>
            </li>
            <li class="float-right tb" type="button" data-theme-toggle></li>
            <li class="float-right">
              <a href="#" class="nav-link">
                Pages &#9660;{" "}
              </a>
              <ul>
                {pr.map((i) => {
                  return `
                   <li>
                    <a href=${i.path}>${i.linkTitle}</a>
                  </li>
                  `;
                })}
              </ul>
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
