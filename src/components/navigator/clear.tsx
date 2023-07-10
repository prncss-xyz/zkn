"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "../link";
import {
  getKanban,
  setKanban,
} from "@/fields/kanban/query";
import { getAll, setAll } from "@/fields/all/query";

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
  const active = searchParams.toString() === query;
  return (
    <Link color={active ? "active" : "link"} href={{ pathname, query }}>
      Clear filters
    </Link>
  );
}
