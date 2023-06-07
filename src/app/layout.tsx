import clsx from "clsx";
import { Inter } from "next/font/google";
import { theme } from "@/theme.css";
import { Box } from "./components/box";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={clsx(inter.className, theme)}>
        <Box mx={{ s: 0, md: 20 }} my={{ s: 10, md: 20 }} display="flex" justifyContent="center">
          <Box width="screenMaxWidth">{children}</Box>
        </Box>
      </body>
    </html>
  );
}
