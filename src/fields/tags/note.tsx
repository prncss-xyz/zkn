import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { setTags } from "./query";
import { ToggleLink } from "@/components/toggleLink";

const pathname = "/notes";

function NoteTag({ tag }: { tag: string }) {
  const params = new URLSearchParams();
  setTags(params, [tag]);
  const query = params.toString();
  return (
    <ToggleLink
      href={{
        pathname,
        query,
      }}
    >
      {tag}
    </ToggleLink>
  );
}

export function NoteTags({ entry }: { entry: NoteEntry }) {
  const tags = entry.tags.map((tag) => tag.tagId);
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
