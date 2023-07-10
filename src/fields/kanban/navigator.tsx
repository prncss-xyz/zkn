"use client";

import { sprinkles } from "@/sprinkles.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getKanban, setKanban } from "../kanban/query";

function Kanban({ kanban }: { kanban: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const activeKanban = getKanban(params);
  const active = activeKanban === kanban;
  setKanban(params, kanban);
  const query = params.toString();
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
