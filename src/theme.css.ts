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

globalStyle("button, h1, h2, h3, h4, h5, h6, div, ul, li", {
  all: "unset",
  display: "block",
  boxSizing: "border-box",
});

globalStyle("a", {
  all: "unset",
  display: "inline",
  boxSizing: "border-box",
});

export const theme = style({});
