"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getTags, setTags } from "./query";
import { Link } from "@/components/link";
import { Box } from "../../components/box";
import { toggle } from "@/utils/arrays";

function InputTag({ tag }: { tag: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const tags = getTags(params);
  const active = tags.includes(tag);
  setTags(params, toggle(tags, tag));
  const query = params.toString();
  return (
    <Link
      px={5}
      borderRadius={3}
      backgroundColor={active ? "active" : "foreground2"}
      href={{
        pathname,
        query,
      }}
    >
      {tag}
    </Link>
  );
}

export function InputTags({
  enabledTags: { direct, reverse },
}: {
  enabledTags: { direct: string[]; reverse: string[] };
}) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <Box fontWeight="bold">tags</Box>
      {direct.map((tag) => (
        <InputTag key={tag} tag={tag} />
      ))}
      {!!direct.length && !!reverse.length && "|"}

      {reverse.map((tag) => (
        <InputTag key={tag} tag={tag} />
      ))}
    </Box>
  );
}
