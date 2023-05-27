import { globalStyle, style } from "@vanilla-extract/css";
import { colors } from "./style";

// css reset + default colors

globalStyle("button:focus-visible", {
  outlineStyle: "dotted",
  outlineWidth: 1,
});

globalStyle("body", {
  margin: 0,
  all: "unset",
  boxSizing: "border-box",
  backgroundColor: colors.background,
  color: colors.text,
});

globalStyle("button, h1, h2, h3, h4, h5, h6, div, a", {
  all: "unset",
  display: "block",
  boxSizing: "border-box",
});

globalStyle("ul, li", {
  all: "unset",
  display: "block",
  boxSizing: "border-box",
});

export const theme = style({});
