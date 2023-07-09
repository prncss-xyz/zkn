"use client";

import { Link } from "@/components/link";
import { usePathname, useSearchParams } from "next/navigation";

export function InputNotes({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  params.delete("kanban");
  const query = params.toString();
  const active = pathname === "/notes";
  return (
    <Link
      color={active ? "active" : "link"}
      href={{ pathname: "/notes", query }}
    >
      Notes
    </Link>
  );
}
