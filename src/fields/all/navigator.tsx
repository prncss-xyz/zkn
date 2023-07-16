"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getAll, setAll } from "./query";
import { NavLink } from "@/components/navLink";

export function InputAll({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const active = getAll(params);
  setAll(params, !active);
  const query = params.toString();
  return (
    <NavLink
      type="toggle"
      href={{
        pathname,
        query,
      }}
    >
      All
    </NavLink>
  );
}
