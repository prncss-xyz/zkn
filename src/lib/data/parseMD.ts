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
import { visitParents } from "unist-util-visit-parents";
import { toHtml } from "hast-util-to-html";
import { toText } from "hast-util-to-text";
import { remove } from "unist-util-remove";
import { visit } from "unist-util-visit";
import { wordsCount } from "words-count";
import { Element, Root } from "hast";
import { FileEntry } from "./scanFiles";
import matter from "gray-matter";
import { analyzePreamble } from "./analyzePreamble";

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

interface RawLink {
  // TODO: source
  context: string;
  target: string;
  position: Element["position"];
  title: string | null;
}

interface AnalyzeResult {
  title: string | null;
  links: RawLink[];
  rawText: string;
  wordCount: number;
}

// TODO: assets
function analyse(tree: Root): AnalyzeResult {
  const links: RawLink[] = [];
  let title: string | null = null;
  visitParents(tree, "element", function (node, ancestors) {
    if (node.tagName === "h1") {
      title = toText(node);
      return;
    }
    if (node.tagName === "a") {
      const target = node.properties?.href;
      const className = node?.properties?.className;
      const position = node.position;
      if (
        typeof target === "string" &&
        position &&
        (className === "internal" ||
          (Array.isArray(className) && className.includes("internal")))
      ) {
        let i = ancestors.length;
        while (i > 0) {
          --i;
          const ancestor = ancestors[i];
          // finds the enclosing p
          if (
            ancestor.type == "element" &&
            (["p", "li", "dt", "dd"].includes(ancestor.tagName) || i === 1)
          ) {
            const elem: Element = {
              type: "element",
              tagName: "div",
              properties: {
                className: ["backlink"],
              },
              children: ancestor.children,
            };
            const context = toHtml(elem);
            links.push({
              context,
              // TODO: source
              target,
              position,
              title,
            });
            break;
          }
        }
        return;
      }
    }
  });
  remove(
    tree,
    (node: any) =>
      node.type === "element" &&
      node.tagName === "a" &&
      node?.properties.className?.includes("internal")
  );
  const rawText = toText(tree);
  // wiki link titles arbitrarily count as one word
  const wordCount = wordsCount(rawText) + links.length;
  return { title, links, rawText, wordCount };
}

function spit() {
  // @ts-ignore
  this.Compiler = analyse;
}

const processor = unified()
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
  .use(rehypeRaw)
  .use(spit);

export async function analyzeMD(fileEntry: FileEntry, raw: string) {
  const { data, content } = matter(raw);
  // in absence of preamble just pass fileEntry data
  const fromPreamble = analyzePreamble(fileEntry, data || {});
  const result = (await processor.process(content)).result as AnalyzeResult;
  const { title, wordCount } = result;
  const links = result.links.map((link: any, rank: any) => ({
    // sourceId: fileEntry.id,
    targetId: link.target,
    rank,
    context: link.context,
  }));
  return {
    ...fromPreamble,
    entry: { ...fromPreamble.entry, title, wordCount },
    links,
  };
}
