import { blog } from "./components/mod.tsx";

const app = blog({
  siteName: "Test Blog",
  meta: {
    author: "Ptm",
  },
});

export default app;
