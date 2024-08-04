import { type FC, memo } from "../deps.ts";
import { PostCard } from "./PostCard.tsx";
import { type MarkOpts } from "../markdown.ts";

type MarkOptions = Array<MarkOpts>;

export const Posts: FC<{ opts: MarkOptions }> = memo(({ opts }) => (
  <>
    {opts.map((i) => (
      <PostCard opts={i} />
    ))}
  </>
));
