import { type FC, memo, html } from "../deps/hono.ts";
export const NavBar: FC = memo(() => {
  return (
    <nav class="navigation" id="navigation">
      <div class="container">
        <div class="logo">
          <img src="logo.png" alt="logo" />
        </div>
        <ul class="navigation-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/posts">Posts</a>
          </li>
          <li>about</li>
          <li type="button" data-theme-toggle></li>
          <a href="javascript:void(0);" class="icon" onclick="responsiveMenu()">
            <i class="fa fa-bars"></i>
          </a>
        </ul>
      </div>
      {html`
        <script>
          function responsiveMenu() {
            var x = document.getElementById("navigation");
            if (x.className === "navigation") {
              x.className += " responsive";
            } else {
              x.className = "navigation";
            }
          }
        </script>
      `}
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
          const currentCta =
            currentThemeSetting === "dark" ? "Light Theme" : "Dark Theme";
          button.setAttribute("aria-label", currentCta);
          button.innerText = currentCta;
          button.addEventListener("click", () => {
            const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
            const newCta = newTheme === "dark" ? "Light" : "Dark";
            button.innerText = newCta;
            button.setAttribute("aria-label", newCta);
            document.querySelector("html").setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            currentThemeSetting = newTheme;
          });
        </script>
      `}
    </nav>
  );
});
