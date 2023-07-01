import { Box } from "@/app/components/box";
import prisma from "@/lib/data/prisma";
import { getProcessor } from "@/lib/data/processMD";
import { createElement, Fragment, ReactNode } from "react";
import rehypeReact from "rehype-react";
import { getBacklinks, getContent, getIdToTitle } from "@/lib/data/actions";
import { basename, extname, sep } from "node:path";
import { Backlink } from "./backlink";
import { setup } from "@/lib/data/scanFiles";
import { markdown } from "./page.css";
import { Link } from "@/app/components/link";

function IdPath({ id }: { id: string }) {
  const segments = id.split(sep).slice(0, -1);
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={10}>
      {segments.map((segment, i) => (
        <>
          <Link
            fontFamily="monospace"
            key={i}
            href={`/notes?dir=${segments.slice(0, i + 1).join(sep)}`}
          >
            {segment}
          </Link>
          <Box>{sep}</Box>
        </>
      ))}
      <Box fontFamily="monospace">{basename(id)}</Box>
    </Box>
  );
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
    select: {
      id: true,
      wordcount: true,
      links: true,
      tags: true,
      mtime: true,
      event: true,
    },
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

interface IEvent {
  start: Date;
  end: Date;
}

interface IMetaData {
  id: string;
  wordcount: number;
  tags: { tagId: string }[];
  mtime: Date;
  event: IEvent | null;
}

function Event({ event }: { event: IEvent }) {
  const day = true; // TODO:
  const start = day
    ? event.start.toLocaleDateString()
    : event.start.toLocaleString();
  if (event.end === event.start) {
    return <>{start}</>;
  }
  const end = day ? event.end.toLocaleDateString() : event.end.toLocaleString();
  return (
    <>
      {start} &mdash; {end}
    </>
  );
}

function MetaDataEntry({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Box p={5} display="flex" flexDirection="row" alignItems="center">
      <Box width="labelWidth">{label}</Box>
      {children}
    </Box>
  );
}

function MetaData({ ...entry }: IMetaData) {
  const modified = entry.mtime.toLocaleDateString();
  const tags = entry.tags.map((tag) => tag.tagId).sort();
  return (
    <Box backgroundColor="foreground2" p={5} borderRadius={{ xs: 0, md: 5 }}>
      <MetaDataEntry label="modified">
        <Box>{modified}</Box>
      </MetaDataEntry>
      {entry.event && (
        <MetaDataEntry label="event">
          <Event event={entry.event} />
        </MetaDataEntry>
      )}
      {entry.tags.length > 0 && (
        <MetaDataEntry label="tags">
          <Box display="flex" flexDirection="row" gap={10}>
            {tags.map((tag) => (
              <Link
                px={5}
                borderRadius={3}
                backgroundColor="foreground1"
                key={tag}
                href={`/notes?tags=${tag}`}
              >
                {tag}
              </Link>
            ))}
          </Box>
        </MetaDataEntry>
      )}
      <MetaDataEntry label="wordcount">{entry.wordcount}</MetaDataEntry>
    </Box>
  );
}

export default async function Page({
  params: { path },
}: {
  params: { path: string[] };
}) {
  await setup();
  let id = path.map((p) => decodeURI(p)).join("/");
  if (!extname(id)) id += ".md";
  const res = await getNote(id);
  if (!res)
    return (
      <>
        <Box>
          The node with filename <code>{id}</code> cannot be found.
        </Box>
        <Link display="block" href="/">
          Back
        </Link>
      </>
    );
  const { entry, idToTitle, content, backlinks } = res;
  return (
    <Box display="flex" flexDirection="column" gap={10}>
      <IdPath id={entry.id} />
      <Box
        backgroundColor="foreground1"
        p={5}
        borderRadius={{ xs: 0, md: 5 }}
        className={markdown}
      >
        {/* @ts-ignore */}
        <FromMD content={content} idToTitle={idToTitle} />
      </Box>
      <MetaData {...entry} />
      {backlinks.length > 0 && (
        <Box
          backgroundColor="foreground2"
          borderRadius={{ xs: 0, md: 5 }}
          display="flex"
          flexDirection="column"
        >
          <Box as="h2" fontWeight="bold" p={5}>
            Backlinks
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
