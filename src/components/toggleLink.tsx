import { ReactNode } from "react";
import { Link } from "./link";

type ILink = {
  href: { pathname: string; query?: string };
  children: ReactNode;
  active?: boolean;
};

export function ToggleLink({ href, children, active }: ILink) {
  return (
    <Link
      href={href}
      px={5}
      borderRadius={3}
      color="link"
      backgroundColor={active ? "active" : "foreground2"}
      fontWeight="bold"
    >
      {children}
    </Link>
  );
}
