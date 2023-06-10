"use client";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { sprinkles } from "@/sprinkles.css";
import { hideLinks, overlayLayout } from "./menuBar.css";
import { Box } from "../components/box";
import { screenOverlay } from "../components/screenOverlay.css";
import { sizes } from "@/style";

export function MenuLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const current = pathname === href;
  if (current)
    return (
      <Dialog.Close className={sprinkles({ fontWeight: "bold" })}>
        {children}
      </Dialog.Close>
    );
  return <Link href={href}>{children}</Link>;
}

export function MenuBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Dialog.Root>
        {/* this needs to be inside Dialog.Root because Nav of current page is a Dialog.Close component */}
        <Box
          display={{ xs: "none", s: "flex" }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pl={{ xs: 5, md: 0 }}
        >
          <Box
            display="flex"
            gap={40}
            flexDirection="row"
            justifyContent="flex-start"
          >
            {children}
          </Box>
        </Box>
      </Dialog.Root>
      <Box display={{ xs: "block", s: "none" }}>
        {/* the key prop ensures state will be reset on navigation, closing the dialog */}
        <Dialog.Root key={pathname}>
          <Dialog.Trigger asChild>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              px={{ xs: 5, md: 0 }}
            >
              <Box
                display="flex"
                gap={40}
                flexDirection="row"
                justifyContent="flex-start"
                className={hideLinks}
              >
                {children}
              </Box>
              <Box as="button" height="menuIcon">
                <AiOutlineMenu size={sizes.menuIcon} />
              </Box>
            </Box>
          </Dialog.Trigger>
          <Dialog.Content>
            <Box className={screenOverlay}>
              <Box p={5} width="100%" height="100%">
                <Box className={overlayLayout}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                  >
                    <Box
                      display="flex"
                      gap={40}
                      flexDirection="column"
                      alignItems="center"
                      width="100%"
                    >
                      {children}
                    </Box>
                  </Box>
                  <Dialog.Close asChild>
                    <Box
                      as="button"
                      width="100%"
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-end"
                    >
                      <AiOutlineClose size={25} />
                    </Box>
                  </Dialog.Close>
                </Box>
              </Box>
            </Box>
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </>
  );
}
