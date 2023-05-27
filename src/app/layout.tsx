import clsx from "clsx";
import { Inter } from "next/font/google";
import { theme } from "@/theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "zkn",
  description: "zkn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, theme)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
