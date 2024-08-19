import { blog } from "./src/index.ts";

blog({
    siteName: "TEST APP",
    socialLink: {
        github: "https://github.com/",
        facebook: "https://facebook.com",
    },
    meta: {
        favicon: "favicon.ico",
    },
    server: {
        open: true,
        watch: true,
    },
});

// export default app;
