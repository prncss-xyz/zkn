"use client";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { overlayLayout } from "./OverlayLayout.css";
import { ScreenOverlay } from "./ScreenOverlay";
import { Box } from "./box";
import { ReactNode } from "react";
import Link from "next/link";
import { sprinkles } from "@/sprinkles.css";

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
  return (
    <Link
      href={href}
      className={sprinkles({ color: "link", fontWeight: "bold" })}
    >
      {children}
    </Link>
  );
}

export function MenuBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Dialog.Root>
        <Box
          display={{ s: "none", md: "flex" }}
          gap={40}
          flexDirection="row"
          justifyContent="flex-start"
          width="100%"
        >
          {children}
        </Box>
      </Dialog.Root>
      <Box display={{ s: "block", md: "none" }}>
        {/* the key prop ensures state will be reset on navigation, closing the dialog */}
        <Dialog.Root key={pathname}>
          <Dialog.Trigger asChild>
            <Box
              as="button"
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
            >
              <AiOutlineMenu size={25} />
            </Box>
          </Dialog.Trigger>
          <Dialog.Content>
            <ScreenOverlay>
              <Box p={5} width="100%" height="100%">
                <div className={overlayLayout}>
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
                </div>
              </Box>
            </ScreenOverlay>
          </Dialog.Content>
        </Dialog.Root>
      </Box>
    </>
  );
}
