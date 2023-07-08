import { getProcessor } from "@/server/data/processMD";
import { createElement, Fragment, ReactNode } from "react";
import rehypeReact from "rehype-react";
import { getIdToTitle } from "@/server/actions";
import { Link } from "@/components/link";
import { NoteEntry } from "./page";
export const dynamic = "force-dynamic";
import fs from "node:fs/promises";
import path from "node:path";
import { notebookDir } from "@/server/notebookDir";
import matter from "gray-matter";

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
        {children}
      </Link>
    );
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export async function Contents({ note }: { note: NoteEntry }) {
  const content = await getContent(note.id);
  if (!content) return null;
  const idToTitle = await getIdToTitle(note.links.map((link) => link.targetId));
  const processor = getProcessor(idToTitle).use(rehypeReact, {
    createElement,
    Fragment,
    components: {
      a: MDLink,
    },
  });
  const { result } = await processor.process(content);
  return result;
}
