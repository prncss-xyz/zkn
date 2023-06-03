import clsx from "clsx";
import { Inter } from "next/font/google";
import { theme } from "@/theme.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
