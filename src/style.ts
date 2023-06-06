export const space = [10];

export const sizes = {
  "100%": "100%",
  "100vh": "100vh",
  "100vw": "100vw",
};

export const fontSizes = [];

export const fontWeights = {};

export const borderWidths = [1];
// this is used to set up theme vars; what is not defined in _dark defaults to values from _light
// don't these values directly, use sprinkles or vars.colors from theme.css instead
// colors used this way will respond to (prefers-color-scheme) media queries
// background and colors are also set as background color and default color
//
export const _light = {
  background: "white",
  text: "black",
  link: "#1453F5",
  gray: "#F9F8F8",
  pink: "pink"
};

export const _dark = {
  background: "black",
  text: "white",
};
