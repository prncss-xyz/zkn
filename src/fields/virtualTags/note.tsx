import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import { queryToParams } from "./query";
import { virtualTags, virtualTagsOpts } from "./opts";

const pathname = "/notes";

function NoteVirtualTag({ tag }: { tag: string }) {
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

export function NoteVirtualTags({ entry }: { entry: NoteEntry }) {
  const tags = virtualTags.filter((tag) => virtualTagsOpts[tag].test(entry));
  if (!tags.length) return null;
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <Box fontWeight="bold">virtual tags</Box>
      {tags.map((tag) => (
        <NoteVirtualTag key={tag} tag={tag} />
      ))}
    </Box>
  );
}
