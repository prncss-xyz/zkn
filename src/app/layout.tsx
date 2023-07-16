import clsx from "clsx";
import { Inter as Font } from "next/font/google";
import { theme } from "@/theme.css";
import { Box } from "@/components/box";

import "the-new-css-reset/css/reset.css";

const font = Font({ subsets: ["latin"] });

export const metadata = {
  title: "zkn",
  description: "zkn",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Box
        as="body"
        className={clsx(font.className, theme)}
        mx={{ xs: 0, md: 20 }}
        my={{ xs: 10, md: 20 }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        {children}
      </Box>
    </html>
  );
}
