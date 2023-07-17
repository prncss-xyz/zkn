import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { setVirtualTags } from "./query";
import { virtualTags, virtualTagsOpts } from "./opts";
import { ToggleLink } from "@/components/toggleLink";

const pathname = "/notes";

function NoteVirtualTag({ tag }: { tag: string }) {
  const params = new URLSearchParams();
  setVirtualTags(params, [tag]);
  const query = params.toString();
  return <ToggleLink href={{ pathname, query }}>{tag}</ToggleLink>;
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
