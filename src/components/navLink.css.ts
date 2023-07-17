import { sprinkles } from "@/sprinkles.css";
import { recipe } from "@vanilla-extract/recipes";

export const navLink = recipe({
  base: sprinkles({
    color: "link",
    fontWeight: "bold",
  }),
  variants: {
    type: {
      label: sprinkles({}),
      dir: sprinkles({ fontFamily: "monospace" }),
    },
    active: {
      true: sprinkles({ color: "active" }),
    },
  },
});
