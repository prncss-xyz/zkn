import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Root } from "hast";
import { normalizePath } from "@/utils/path";
import { createElement, Fragment } from "react";
import { getIdToTitle } from "@/server/actions";

export function transform() {
  return async function (tree: Root) {
    const links: string[] = [];
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const className_ = node?.properties?.className;
      if (
        className_ === "internal" ||
        (Array.isArray(className_) && className_.includes("internal"))
      ) {
        if (node.properties) {
          const href = node.properties.href;
          if (href && typeof href === "string") {
            const normalized = normalizePath(href);
            node.properties.href = normalized;
            links.push(normalized);
          }
        }
      }
    });
    const idToTitle = await getIdToTitle(links);
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      node.tagName = "span";
      const className_ = node?.properties?.className;
      if (
        className_ === "internal" ||
        (Array.isArray(className_) && className_.includes("internal"))
      ) {
        const href = node.properties?.href;
        if (typeof href !== "string") return;
        const res = idToTitle[href];
        node.properties = { className: ["internal", res.status] };
        node.children = [{ type: "text", value: res.title }];
        return;
      }
      node.properties ??= {};
      node.properties.className = ["external"];
    });
  };
}

export async function getContents(context: string) {
  const { result } = await unified()
    .use(rehypeParse, { fragment: true })
    .use(transform)
    .use(rehypeReact, {
      createElement,
      Fragment,
    })
    .process(context);
  return result;
}
