"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "@/components/link";
import { getAll, setAll } from "./query";

export function InputAll({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const active = getAll(params);
  setAll(params, !active);
  const query = params.toString();
  return (
    <Link
      px={5}
      borderRadius={3}
      backgroundColor={active ? "active" : "foreground2"}
      href={{
        pathname,
        query,
      }}
    >
      All
    </Link>
  );
}
