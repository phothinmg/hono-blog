import config from "../_config.ts";

export const siteName = config.siteName ?? "Hono Blog";

export const siteUrl = config.siteUrl ?? "";

export const baseDir = config.baseDir ?? "app";

export const ignore = config.ignore ?? [];

export const logo = config.logo ?? "logo.png";

export const bio = config.bio ?? " ";

export const author = config.meta?.author ?? "";

export const description = config.meta?.description ?? "";

export const generator = config.meta?.generator ?? false;

export const keywords = config.meta?.keywords ?? [];

export const favicon = config.meta?.favicon ?? "";

export const ogtitle = config.meta?.ogTitle ?? "";

export const ogimage = config.meta?.ogImage ?? "";

export const ogtype = config.meta?.ogType ?? "";

export const ogurl = config.meta?.ogUrl ?? "";

export const facebook = config.socialLink?.facebook ?? "";

export const github = config.socialLink?.github ?? "";

export const twitter = config.socialLink?.twitter ?? "";

export const discord = config.socialLink?.discord ?? "";
