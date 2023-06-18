import { style } from "@vanilla-extract/css";
import { colors } from "@/sprinkles.css";

export const checkbox = style({
  backgroundColor: colors.foreground1,
  ":checked": {
    backgroundColor: colors.active,
  },
});

export const hideScrollbar = style({
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});
