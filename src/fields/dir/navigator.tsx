"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getDir, setDir } from "./query";
import { Box } from "@/components/box";
import { Link } from "@/components/link";

function InputDir({ dir }: { dir: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const active = getDir(params) === dir;
  setDir(params, dir);
  const query = params.toString();
  return (
    <Link
      color={active ? "active" : "link"}
      fontFamily="monospace"
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
