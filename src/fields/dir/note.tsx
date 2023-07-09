import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import { basename } from "node:path";

const sep = "/";

export function NoteDir({ entry }: { entry: NoteEntry }) {
  const id = entry.id;
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
