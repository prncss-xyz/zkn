"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getVirtualTags, setVirtualTags } from "./query";
import { Link } from "@/components/link";
import { Box } from "../../components/box";
import { toggle } from "@/utils/arrays";

function InputVirtualTag({ tag }: { tag: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const tags = getVirtualTags(params);
  const active = tags.includes(tag);
  setVirtualTags(params, toggle(tags, tag));
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

export function InputVirtualTags({
  enabledVirtualTags,
}: {
  enabledVirtualTags: string[];
}) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <Box fontWeight="bold">virtual tags</Box>
      {enabledVirtualTags.map((tag) => (
        <InputVirtualTag key={tag} tag={tag} />
      ))}
    </Box>
  );
}
