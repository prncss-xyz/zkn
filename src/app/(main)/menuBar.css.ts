import { globalStyle, style } from "@vanilla-extract/css";

export const overlayLayout = style({
  width: "100%",
  height: "100%",
  position: "relative",
});

globalStyle(`${overlayLayout}>*`, {
  position: "absolute",
});

export const hideLinks = style({});

globalStyle(`${hideLinks} a`, {
  display: "none",
});
