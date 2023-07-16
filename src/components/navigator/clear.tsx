"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getKanban, setKanban } from "@/fields/kanban/query";
import { getAll, setAll } from "@/fields/all/query";
import { NavLink } from "../navLink";

export function Clear({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams as any);
  const all = getAll(params);
  const kanban = pathname === "/kanban" ? getKanban(params) : "";
  const paramsOut = new URLSearchParams();
  setAll(paramsOut, all);
  setKanban(paramsOut, kanban);
  const query = paramsOut.toString();
  return <NavLink href={{ pathname, query }}>Clear filters</NavLink>;
}
