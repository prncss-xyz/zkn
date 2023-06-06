import { ReactNode } from "react";
import { overlayLayout } from "./OverlayLayout.css";

export function OverlayLayout({ children }: { children: ReactNode }) {
  return <div className={overlayLayout}>{children}</div>;
}
