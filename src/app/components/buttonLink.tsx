"use client";

import { useRouter } from "next/navigation";
import { Box, BoxProps } from "./box";
import { forwardRef, ReactNode } from "react";

export const ButtonLink = forwardRef<
  HTMLDivElement,
  BoxProps & { className?: string; children: ReactNode; href: string }
>((props, ref) => {
  const { children, className, href, ...extra } = props;
  const router = useRouter();
  return (
    <Box
      ref={ref}
      as="button"
      {...extra}
      className={className}
      onClick={() => router.push(href)}
    >
      {children}
    </Box>
  );
});

ButtonLink.displayName = "ButtonLink";
