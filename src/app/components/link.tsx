// https://nextjs.org/docs/pages/api-reference/components/linkhttps://nextjs.org/docs/pages/api-reference/components/link
import clsx from "clsx";
import { forwardRef } from "react";
import { BoxProps } from "./box";
import Link_, { LinkProps } from "next/link";
import { sprinkles } from "@/sprinkles.css";

// a stylable version of next link
export const Link = forwardRef<
  HTMLAnchorElement,
  Omit<BoxProps, "href"> & LinkProps & { className?: string }
>((props, ref) => {
  const {
    href,
    replace,
    prefetch,
    legacyBehavior,
    passHref,
    scroll,
    shallow,
    locale,
    className,
    children,
    ...extra
  } = props;
  return (
    <Link_
      href={href}
      replace={replace}
      prefetch={prefetch}
      legacyBehavior={legacyBehavior}
      passHref={passHref}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      ref={ref}
      className={clsx(sprinkles(extra), className)}
    >
      {children}
    </Link_>
  );
});

Link.displayName = "Link";
