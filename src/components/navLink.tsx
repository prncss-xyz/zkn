"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { navLink } from "./navLink.css";
import Link from "next/link";
import { RecipeVariants } from "@vanilla-extract/recipes";

export type Props = Omit<
  Exclude<RecipeVariants<typeof navLink>, undefined>,
  "active"
>;

type ILink = {
  href: { pathname: string; query?: string };
  children: ReactNode;
} & RecipeVariants<typeof navLink>;

export function NavLink({ href, children, ...props }: ILink) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  props.active ??=
    href.pathname === pathname && href.query === searchParams.toString();
  return (
    <Link href={href} className={navLink(props)}>
      {children}
    </Link>
  );
}
