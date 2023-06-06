import { Box } from "@/app/components/box";
import prisma from "@/lib/data/prisma";
import { getProcessor } from "@/lib/data/processMD";
import Link from "next/link";
import { createElement, Fragment, ReactNode } from "react";
import rehypeReact from "rehype-react";
import { getBacklinks, getContent, getIdToTitle } from "@/lib/data/actions";
import { extname } from "path";
import { Backlink } from "./backlink";
import { setup } from "@/lib/data/scanFiles";
import { markdown } from "./page.css";

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

async function FromMD({
  idToTitle,
  content,
}: {
  idToTitle: Awaited<ReturnType<typeof getIdToTitle>>;
  content: string;
}) {
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

async function getEntry(id: string) {
  const entry = await prisma.entry.findUnique({
    where: { id },
    select: { id: true, wordCount: true, links: true },
  });
  if (!entry) return null;
  const idToTitle = await getIdToTitle(
    entry.links.map((link) => link.targetId)
  );
  return { entry, idToTitle };
}

async function getNote(id: string) {
  const [resEntry, content, backlinks] = await Promise.all([
    getEntry(id),
    getContent(id),
    getBacklinks(id),
  ] as const);
  if (!resEntry || !content) return null;
  const { entry, idToTitle } = resEntry;
  return {
    entry,
    idToTitle,
    content,
    backlinks,
  };
}

export default async function Page({
  params: { path },
}: {
  params: { path: string[] };
}) {
  await setup();
  let id = path.join("/");
  if (!extname(id)) id += ".md";
  const res = await getNote(id);
  if (!res)
    return (
      <>
        <Box>
          The node with filename <code>{id}</code> cannot be found.
        </Box>
        <Box>
          <Link href="/">Back</Link>
        </Box>
      </>
    );
  const { entry, idToTitle, content, backlinks } = res;
  return (
    <Box display="flex" flexDirection="column" gap={10}>
      <Box
        backgroundColor="gray100"
        p={5}
        borderRadius={{ s: 0, md: 5 }}
        className={markdown}
      >
        {/* @ts-ignore */}
        <FromMD content={content} idToTitle={idToTitle} />
      </Box>
      <Box backgroundColor="gray200" p={5} borderRadius={{ s: 0, md: 5 }}>
        <b>wordcount: </b>
        {entry.wordCount}
      </Box>
      {backlinks.length > 0 && (
        <Box
          backgroundColor="gray200"
          borderRadius={{ s: 0, md: 5 }}
          display="flex"
          flexDirection="column"
        >
          <Box as="h2" fontWeight="bold" p={5}>
            Backlnks
          </Box>
          <Box display="flex" flexDirection="column">
            {backlinks.map((backlink) => {
              return (
                <Box
                  key={backlink.sourceId + backlink.rank}
                  borderStyle="top"
                  borderColor="background"
                  borderWidth={1}
                  p={5}
                >
                  {/* @ts-ignore */}
                  <Backlink backlink={backlink} />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
