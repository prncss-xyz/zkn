"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "../link";
import { kanbanClear } from "@/fields/kanban/query";

export function Clear({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const query = pathname === "/kanban" ? kanbanClear(params) : "";
  const active = searchParams.toString() === query;
  return (
    <Link color={active ? "active" : "link"} href={{ pathname, query }}>
      Clear filters
    </Link>
  );
}
