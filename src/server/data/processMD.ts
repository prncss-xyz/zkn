import { extname } from "path";
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

type IdToTitle = {
  [k: string]: { title: string } | { untitled: true } | { broken: true };
};

function transform(idToTitle: IdToTitle) {
  return async function (tree: any) {
    visit(tree, "wikiLink", (node: any) => {
      node.data.hProperties.className = "internal";
      let id = node.data.alias;
      if (!extname(id)) id += extension;
      node.data.hProperties.href = id;
      const res = idToTitle?.[id];
      if (res) {
        const className =
          ("broken" in res && "broken") ||
          ("untitled" in res && "untitled") ||
          "inner";
        node.data.hProperties.className += " " + className;
        const text = "title" in res ? res.title : id;
        node.data.hChildren = [{ type: "text", value: text }];
      } else node.data.hChildren = [];
    });
  };
}

// we need to export this function instead of raw constant for processor to work both on client and server
export function getProcessor(idToTitle?: any) {
  return (
    // @ts-ignore
    unified()
      .use(remarkParse)
      .use(transform, idToTitle)
      .use(wikiLink)
      .use(breaks)
      .use(emoji)
      .use(gfm)
      .use(smartyPants)
      .use(removeComments)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
  );
}
