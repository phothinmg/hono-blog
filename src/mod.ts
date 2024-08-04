import blog from "./components/mod.tsx";

const app = blog({
  siteName: "Pho Thin",
  baseDir: "app",
});

Deno.serve(app.fetch)
console.log("http://localhost:8000/")