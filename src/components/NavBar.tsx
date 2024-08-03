import { type FC, memo } from "../deps.ts";
export const NavBar: FC = memo(() => {
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
              <li>
                <a href="#">Menu 1</a>
              </li>
              <li>
                <a href="#">Menu 2</a>
              </li>
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
