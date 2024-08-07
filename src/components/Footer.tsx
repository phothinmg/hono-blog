import { type FC, memo, html } from "../lib/deps.ts";
import { siteData } from "../lib/config.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";

const SocialIcon: FC<{ options?: HonoBlogOptions }> = memo(({ options }) => {
  const data = siteData(options);
  const social = [
    {
      link: data.facebook,
      icon: html`<i class="fa-brands fa-facebook"></i>`,
    },
    {
      link: data.github,
      icon: html`<i class="fa-brands fa-github"></i>`,
    },
    {
      link: data.twitter,
      icon: html`<i class="fa-brands fa-square-x-twitter"></i>`,
    },
    {
      link: data.discord,
      icon: html`<i class="fa-brands fa-discord"></i>`,
    },
    {
      link: data.linkedin,
      icon: html`<i class="fa-brands fa-linkedin"></i>`,
    },
    {
      link: data.mastodon,
      icon: html`<i class="fa-brands fa-mastodon"></i>`,
    },
  ];
  return (
    <>
      {social.map((i) => {
        if (i.link !== "") {
          return (
            <a href={i.link} target="_blank">
              {i.icon}
            </a>
          );
        }
      })}
    </>
  );
});

export const Footer: FC<{ options?: HonoBlogOptions }> = memo(({ options }) => {
  const data = siteData(options);
  return (
    <footer>
      <small>
        {new Date().getFullYear() + " " + "@" + " " + data.siteName}
      </small>
      <SocialIcon options={options} />
    </footer>
  );
});
