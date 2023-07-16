"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getVirtualTags, setVirtualTags } from "./query";
import { Box } from "../../components/box";
import { toggle } from "@/utils/arrays";
import { NavLink } from "@/components/navLink";

function InputVirtualTag({ tag }: { tag: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const tags = getVirtualTags(params);
  const active = tags.includes(tag);
  setVirtualTags(params, toggle(tags, tag));
  const query = params.toString();
  return (
    <NavLink
      type="toggle"
      active={active}
      href={{
        pathname,
        query,
      }}
    >
      {tag}
    </NavLink>
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
