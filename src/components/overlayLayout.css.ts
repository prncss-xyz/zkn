import { globalStyle, style } from "@vanilla-extract/css";

export const overlayLayout = style({
  width: "100%",
  position: "relative",
});

globalStyle(`${overlayLayout}>*`, {
  width: "100%",
  position: "absolute",
});
