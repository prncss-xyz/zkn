import { globalStyle, style } from "@vanilla-extract/css";

export const backlink = style({});

globalStyle(`${backlink} .internal`, {
  fontWeight: "bold",
});
