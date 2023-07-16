"use client";

import { useSearchParams } from "next/navigation";
import { setKanban } from "../kanban/query";
import { NavLink } from "@/components/navLink";

function Kanban({ kanban }: { kanban: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  setKanban(params, kanban);
  const query = params.toString();
  return <NavLink href={{ pathname: "/kanban", query }}>{kanban}</NavLink>;
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
