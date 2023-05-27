import rehypeRaw from "rehype-raw";
import breaks from "remark-breaks";
import emoji from "remark-emoji";
import gfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// @ts-ignore
import removeComments from "remark-remove-comments";
import smartyPants from "remark-smartypants";
// @ts-ignore
import wikiLink from "remark-wiki-link";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const extension = ".md";

function transform() {
  return async function (tree: any) {
    visit(tree, "wikiLink", (node: any) => {
      node.data.hProperties.className = "internal";
      node.data.hProperties.href = node.data.alias + extension;
      node.data.hChildren = [];
    });
  };
}

export const baseProcessor = unified()
  .use(remarkParse)
  .use(transform)
  .use(wikiLink)
  .use(breaks)
  .use(emoji)
  .use(gfm)
  .use(smartyPants)
  .use(removeComments)
  // @ts-ignore
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw);
