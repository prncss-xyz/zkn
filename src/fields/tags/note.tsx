import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import { queryToParams } from "./query";

const pathname = "/notes";

function NoteTag({ tag }: { tag: string }) {
  const params = new URLSearchParams();
  const query = queryToParams(params, [tag]);
  return (
    <Link
      px={5}
      borderRadius={3}
      backgroundColor="foreground2"
      href={{
        pathname,
        query,
      }}
    >
      {tag}
    </Link>
  );
}

export function NoteTags({ note }: { note: NoteEntry }) {
  const tags = note.tags.map((tag) => tag.tagId);
  if (!tags.length) return null;
  return (
     <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <Box fontWeight="bold">tags</Box>
      {tags.map((tag) => (
        <NoteTag key={tag} tag={tag} />
      ))}
    </Box>
  );
}
