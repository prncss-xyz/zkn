"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { paramsToQuery, queryToParams } from "./query";
import Link from "next/link";
import { Box } from "../../box";
import { sprinkles } from "@/sprinkles.css";
import { toggle } from "@/utils/arrays";

function InputTag({ tag }: { tag: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const tags = paramsToQuery(params);
  const active = tags.includes(tag);
  const query = queryToParams(params, toggle(tags, tag));
  return (
    <Link
      className={sprinkles({
        px: 5,
        borderRadius: 3,
        backgroundColor: active ? "active" : "foreground2",
      })}
      href={{
        pathname,
        query,
      }}
    >
      {tag}
    </Link>
  );
}

export function InputTags({ enabledTags }: { enabledTags: string[] }) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <Box fontWeight="bold">Tags</Box>
      {enabledTags.map((tag) => (
        <InputTag key={tag} tag={tag} />
      ))}
    </Box>
  );
}
