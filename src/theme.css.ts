import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from "@vanilla-extract/css";
import { _dark, _light } from "./style";

export const vars = createThemeContract({ colors: _light });

// css reset + default colors

globalStyle("button:focus-visible", {
  outlineStyle: "dotted",
  outlineWidth: 1,
});

globalStyle("body", {
  margin: 0,
  all: "unset",
  boxSizing: "border-box",
  backgroundColor: vars.colors.background,
  color: vars.colors.text,
});

globalStyle("button, h1, h2, h3, h4, h5, h6, div", {
  all: "unset",
  display: "block",
  boxSizing: "border-box",
});

globalStyle("button", {
  all: "unset",
  display: "block",
  cursor: "pointer",
  boxSizing: "border-box",
});

globalStyle("a", {
  all: "unset",
  display: "inline",
  cursor: "pointer",
  boxSizing: "border-box",
});

export const theme = style({
  vars: assignVars(vars, { colors: _light }),
  "@media": {
    ["screen and (prefers-color-scheme: dark)"]: {
      vars: assignVars(vars, { colors: { ..._light, ..._dark } }),
    },
  },
});
