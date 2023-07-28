import { getProcessor } from "@/server/data/processMD";
import { LuExternalLink, LuLink } from "react-icons/lu";
import { createElement, Fragment, ReactNode } from "react";
import rehypeReact from "rehype-react";
import { getIdToTitle } from "@/server/actions";
import { Link } from "@/components/link";
import { NoteEntry } from "./page";
import fs from "node:fs/promises";
import path from "node:path";
import { notebookDir } from "@/server/notebookDir";
import matter from "gray-matter";
import { luExternalLink, luLink } from "./contents.css";

export async function getContent(id: string) {
  const file = path.join(notebookDir, id);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { content } = matter(raw);
    return content;
  } catch (_) {
    return null;
  }
}

// This is used while rendering markdown contents. It intecepts internal links to render them as `Link` elements
function MDLink({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children?: ReactNode;
}) {
  if (href?.startsWith("/"))
    return (
      <Link href={href} className={className}>
        <LuLink className={luLink} />
        {children}
      </Link>
    );
  return (
    <a href={href} className={className} target="_blank">
      <LuExternalLink className={luExternalLink} />
      {children}
    </a>
  );
}

export async function Contents({ entry }: { entry: NoteEntry }) {
  const content = await getContent(entry.id);
  if (!content) return null;
  const idToTitle = await getIdToTitle(
    entry.links.map((link) => link.targetId),
  );
  const processor = getProcessor({ idToTitle, live: true }).use(rehypeReact, {
    createElement,
    Fragment,
    components: {
      a: MDLink,
    },
  });
  const { result } = await processor.process(content);
  return result;
}
