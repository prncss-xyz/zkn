import { baseProcessor } from "@/lib/md";
import { createElement, Fragment } from "react";
import rehypeReact from "rehype-react";
import { getContent } from "@/lib/data/actions";

const processor = baseProcessor.use(rehypeReact, { createElement, Fragment });

export async function Note({ id }: { id: string }) {
  const content = await getContent(id);
  const { result } = await processor.process(content);
  return result;
}
