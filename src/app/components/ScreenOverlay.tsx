import React, { ReactNode } from "react";
import { screenOverlay } from "./ScreenOverlay.css";

export const ScreenOverlay = React.forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>(({ children }, ref) => (
  <div ref={ref} className={screenOverlay}>
    {children}
  </div>
));
ScreenOverlay.displayName = "ScreenOverlay";
