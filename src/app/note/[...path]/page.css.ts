import { vars } from "@/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

// globalStyle("button, h1, h2, h3, h4, h5, h6, div, ul, li", {

export const markdown = style({});

globalStyle(`${markdown} h1`, {
  fontWeight: "bold",
});

globalStyle(`${markdown} a`, {
  fontWeight: "bold",
  color: vars.colors.link,
});
