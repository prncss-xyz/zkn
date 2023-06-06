import { vars } from "@/theme.css";
import { style } from "@vanilla-extract/css";

export const screenOverlay = style({
  backgroundColor: vars.colors.background,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  maxWidth: "100%",
  height: "100vh",
  zIndex: 10,
});
