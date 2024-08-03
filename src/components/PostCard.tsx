import { type FC, memo } from "../deps.ts";
import { type MarkOpts } from "../markdown.ts";
import { readingTime } from "../utils.ts";

export const PostCard: FC<{ opts: MarkOpts }> = memo(({ opts }) => {
  const rt = readingTime(opts.html);
  return (
    <div class="card">
      <h3>{opts.title}</h3>
      <small class="head-small">{opts.date}</small>
      <small class="head-small">{`Reading Time: ${rt} minutes`}</small>
      <br />
      <small class="badge">javascript</small>
      {opts.tags?.map((i) => {
        `<small class="badge">${i}</small>`;
      })}
      <br />
      <hr />
      <p>{opts.description ?? ""}</p>
    </div>
  );
});
