import { createElement, Fragment } from "react";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Root } from "hast";
import { getBacklinks, getIdToTitle, getTitle } from "@/lib/data/actions";
import { Box } from "@/app/components/box";
import { ButtonLink } from "@/app/components/buttonLink";

function transform() {
  return async function (tree: Root) {
    const links: string[] = [];
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const className_ = node?.properties?.className;
      if (
        className_ === "internal" ||
        (Array.isArray(className_) && className_.includes("internal"))
      ) {
        const href = node.properties?.href;
        if (typeof href === "string") links.push(href);
      }
    });
    const idToTitle = await getIdToTitle(links);
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      console.log(node);
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

export async function Backlink({
  backlink,
}: {
  backlink: Awaited<ReturnType<typeof getBacklinks>>[0];
}) {
  const { title, status } = await getTitle(backlink.sourceId);
  const { result } = await unified()
    .use(rehypeParse, { fragment: true })
    .use(transform)
    .use(rehypeReact, {
      createElement,
      Fragment,
    })
    .process(backlink.context);
  return (
    <ButtonLink href={`/note/${backlink.sourceId}`}>
      <Box as="h2" className={status}>
        {title}
      </Box>
      <Box>{result}</Box>
    </ButtonLink>
  );
}
