import { getMdFiles } from "../lib/routes.ts";
import { type FC, memo } from "../lib/deps.ts";
import type { MarkOpts } from "../lib/markdown.ts";
import type { HonoBlogOptions } from "../lib/configuration.ts";

export const PNLink: FC<{
  title: MarkOpts["title"];
  options?: HonoBlogOptions;
}> = memo(({ title, options }) => {
  const postarray = getMdFiles(options).postsroute;

  const found = postarray.find((i) => i.linkTitle === title);
  const index = found !== undefined ? postarray.indexOf(found) : -1;
  //const length = postarray.length;
  const { path: nextL, linkTitle: nextT } = postarray[index + 1] || {
    path: "#",
    linkTitle: "No Post Found",
  };
  const { path: prevL, linkTitle: prevT } = postarray[index - 1] || {
    path: "#",
    linkTitle: "No Post Found",
  };

  return (
    <div class="blog-nav">
      <div class="left-blog">
        <a href={prevL}>
          <i className="fa-solid fa-angles-left"></i>
          {prevT}
        </a>
      </div>
      <div class="right-blog">
        <a href={nextL}>
          {nextT}
          <i className="fa-solid fa-angles-right"></i>
        </a>
      </div>
    </div>
  );
});
