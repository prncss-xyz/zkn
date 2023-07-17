"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { navLink } from "./navLink.css";
import { RecipeVariants } from "@vanilla-extract/recipes";
import { Link } from "./link";
import { BoxProps } from "./box";

export type Props = Omit<
  Exclude<RecipeVariants<typeof navLink>, undefined>,
  "active"
>;

type ILink = {
  href: { pathname: string; query?: string };
  children: ReactNode;
  className?: string;
} & Omit<BoxProps, "href">;

export function NavLink({ href, children, className, ...props }: ILink) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active =
    href.pathname === pathname && href.query === searchParams.toString();
  return (
    <Link
      href={href}
      fontWeight="bold"
      color={active ? "active" : "link"}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
