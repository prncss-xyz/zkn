"use client";

import { sprinkles } from "@/sprinkles.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { paramsToQuery, queryToParams } from "../kanban/query";

function Kanban({ kanban }: { kanban: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const activeKanban = paramsToQuery(params);
  const active = activeKanban === kanban;
  const query = queryToParams(params, kanban);
  return (
    <Link
      className={sprinkles({ color: active ? "active" : "link" })}
      href={{ pathname: "/kanban", query }}
    >
      {kanban}
    </Link>
  );
}

export function InputKanban({ enabledKanbans }: { enabledKanbans: string[] }) {
  return (
    <>
      {enabledKanbans.map((kanban) => (
        <Kanban key={kanban} kanban={kanban} />
      ))}
    </>
  );
}
