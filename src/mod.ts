import { Hono } from "./deps.ts";
import homepage from "./components/Home.tsx";
import postslist from "./components/PostList.tsx";
const app = new Hono();

app.route("/", homepage);
app.route("/posts", postslist);

export default app;
