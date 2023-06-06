export const space = [0, 5, 10, 20];

export const sizes = {
  screenMaxWidth: "min(100%, 1000px)",
  "100%": "100%",
  "100vh": "100vh",
  "100vw": "100vw",
};

export const fontSizes = [];

export const borderRadii = [0, 5];

export const fontWeights = { bold: "bold" };

export const borderWidths = [1];
// this is used to set up theme vars; what is not defined in _dark defaults to values from _light
// don't these values directly, use sprinkles or vars.colors from theme.css instead
// colors used this way will respond to (prefers-color-scheme) media queries
// background and colors are also set as background color and default color

const colors = {
  // https://tailwindcss.com/docs/customizing-colors
  gray050: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",
  gray950: "#030712",
};

export const _light = {
  background: colors.gray300,
  text: "black",
  link: colors.gray400,
  ...colors,
};

export const _dark = {
  background: colors.gray700,
  text: "white",
  link: colors.gray600,

  gray950: "#f9fafb",
  gray900: "#f3f4f6",
  gray800: "#e5e7eb",
  gray700: "#d1d5db",
  gray600: "#9ca3af",
  gray500: "#6b7280",
  gray400: "#4b5563",
  gray300: "#374151",
  gray200: "#1f2937",
  gray100: "#111827",
  gray050: "#030712",
};
