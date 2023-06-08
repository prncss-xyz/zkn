export const space = [0, 5, 10, 20, 40];

export const sizes = {
  screenMaxWidth: "min(100%, 1000px)",
  labelWidth: 120,
  "100%": "100%",
  "100vh": "100vh",
  "100vw": "100vw",
  menuIcon: 30,
};

export const fontSizes = [];

export const borderRadii = [0, 3, 5];

export const fontWeights = { bold: "bold" };

export const borderWidths = [1];

// this is used to set up theme vars; what is not defined in _dark defaults to values from _light
// don't these values directly, use sprinkles or vars.colors from theme.css instead
// colors used this way will respond to (prefers-color-scheme) media queries
// background and colors are also set as background color and default color

export const _light = {
  text: "hsl(0, 0%, 30%)",
  link: "hsl(260, 80%, 63%)",
  foreground1: "hsl(150, 10%, 80%)",
  foreground2: "hsl(150, 10%, 70%)",
  background: "hsl(150, 10%, 50%)",
};

export const _dark = {
  ..._light,
  text: "hsl(0, 0%, 65%)",
  link: "hsl(260, 80%, 60%)",
  foreground1: "hsl(150, 10%, 25%)",
  foreground2: "hsl(150, 10%, 17%)",
  background: "hsl(150, 10%, 10%)",
};
