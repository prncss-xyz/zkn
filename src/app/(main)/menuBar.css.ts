import { globalStyle, style } from "@vanilla-extract/css";

export const menuOverlay = style({
  width: "100%",
  height: "100%",
  position: "relative",
});

globalStyle(`${menuOverlay}>*`, {
  position: "absolute",
});

export const hideLinks = style({});

globalStyle(`${hideLinks} a`, {
  display: "none",
});
