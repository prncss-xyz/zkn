import clsx from "clsx";
import { Inter as Font } from "next/font/google";
import { theme } from "@/theme.css";
import { Box } from "./components/box";

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
      <body className={clsx(font.className, theme)}>
        <Box
          mx={{ xs: 0, md: 20 }}
          my={{ xs: 10, md: 20 }}
          display="flex"
          justifyContent="center"
        >
          <Box width="screenMaxWidth">{children}</Box>
        </Box>
      </body>
    </html>
  );
}
