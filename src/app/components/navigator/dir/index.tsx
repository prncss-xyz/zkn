"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { paramsToQuery, queryToParams } from "./query";
import { Box } from "../../box";
import Link from "next/link";
import { sprinkles } from "@/sprinkles.css";

function InputDir({ dir }: { dir: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const active = paramsToQuery(params) === dir;
  const query = queryToParams(params, dir);
  return (
    <Link
      className={sprinkles({
        color: active ? "active" : "link",
        fontFamily: "monospace",
      })}
      href={{ pathname, query }}
    >
      {dir || "."}
    </Link>
  );
}

export function InputDirs({ enabledDirs }: { enabledDirs: string[] }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      gap={10}
    >
      <Box fontWeight="bold">Dirs</Box>
      {enabledDirs.map((dir) => (
        <InputDir key={dir} dir={dir} />
      ))}
    </Box>
  );
}
