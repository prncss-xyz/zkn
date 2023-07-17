"use client";

import { NavLink } from "@/components/navLink";
import { useSearchParams } from "next/navigation";

export function InputNotes({}: {}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  params.delete("kanban");
  const query = params.toString();
  return (
    <NavLink href={{ pathname: "/notes", query }}>
      Notes
    </NavLink>
  );
}
