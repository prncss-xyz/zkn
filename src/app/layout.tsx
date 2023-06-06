import clsx from "clsx";
import { Inter } from "next/font/google";
import { theme } from "@/theme.css";
import { Box } from "./components/box";
import { Nav } from "./components/Nav";

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
  // await setup();
  return (
    <html lang="en">
      <body className={clsx(inter.className, theme)}>
        <Box m={{ s: 0, md: 20 }} display="flex" justifyContent="center">
          <Box
            width="screenMaxWidth"
            display="flex"
            flexDirection="column"
            gap={20}
          >
            <Nav />
            <Box as="main">{children}</Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
