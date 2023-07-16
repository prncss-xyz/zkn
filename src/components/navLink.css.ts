import { sprinkles } from "@/sprinkles.css";
import { vars } from "@/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const navLink = recipe({
  base: sprinkles({
    color: "link",
    fontWeight: "bold",
  }),
  variants: {
    type: {
      label: sprinkles({
        fontWeight: "bold",
      }),
      dir: sprinkles({ fontFamily: "monospace" }),
      toggle: sprinkles({
        px: 5,
        borderRadius: 3,
      }),
    },
    active: {
      true: sprinkles({ color: "active" }),
    },
  },
  compoundVariants: [
    {
      variants: { type: "toggle", active: true },
      style: {
        color: vars.colors.link,
        backgroundColor: vars.colors.active,
      },
    },
    {
      variants: { type: "toggle", active: false },
      style: {
        color: vars.colors.link,
        backgroundColor: vars.colors.foreground2,
      },
    },
  ],
});
