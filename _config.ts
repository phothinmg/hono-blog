import type { DefinedConfig } from "./src/config/definedConfig.ts";

const siteConfig: DefinedConfig = {
  site: {
    name: "Yamanya",
    author: "PTM",
    description: "Simple Blog theme with Hono",
  },
  baseDirectory: "app",
  logo: "logo.png",
  favicon: "favicon.ico",
};

export default siteConfig;
