import type { HonoBlogOptions } from "./configuration.ts";

export const siteData = (config?: HonoBlogOptions) => {
  const siteName = config?.siteName ?? "Hono Blog";

  const siteUrl = config?.siteUrl ?? "";

  const baseDir = config?.baseDir ?? "app";

  const ignore = config?.ignore ?? [];

  const author = config?.meta?.author ?? "";

  const description = config?.meta?.description ?? "";

  const generator = config?.meta?.generator ?? false;

  const keywords = config?.meta?.keywords ?? [];

  const favicon = config?.meta?.favicon ?? "";

  const ogtitle = config?.meta?.ogTitle ?? "";

  const ogimage = config?.meta?.ogImage ?? "";

  const ogtype = config?.meta?.ogType ?? "";

  const ogurl = config?.meta?.ogUrl ?? "";

  const facebook = config?.socialLink?.facebook ?? "";

  const github = config?.socialLink?.github ?? "";

  const twitter = config?.socialLink?.twitter ?? "";

  const discord = config?.socialLink?.discord ?? "";

  const mastodon = config?.socialLink?.mastodon ?? "";

  const linkedin = config?.socialLink?.linkedin ?? "";

  return {
    author,
    baseDir,
    description,
    discord,
    facebook,
    favicon,
    generator,
    github,
    ignore,
    keywords,
    ogimage,
    ogtitle,
    ogtype,
    ogurl,
    siteName,
    siteUrl,
    twitter,
    mastodon,
    linkedin,
  };
};
