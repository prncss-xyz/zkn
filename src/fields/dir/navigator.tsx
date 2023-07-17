"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { setDir } from "./query";
import { Box } from "@/components/box";
import { NavLink } from "@/components/navLink";

function InputDir({ dir }: { dir: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  setDir(params, dir);
  const query = params.toString();
  return (
    <NavLink fontFamily="monospace" href={{ pathname, query }}>
      {dir || "."}
    </NavLink>
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
