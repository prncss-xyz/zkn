import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { sizes, space, borderWidths, fontWeights, fontSizes } from "./style";

import { vars } from "./theme.css";
const { colors } = vars;

// following [stitches](https://stitches.dev/docs/tokens) conventions for property-token relationships
const unconditionalProperties = defineProperties({
  properties: {
    color: colors,
    backgroundColor: colors,
    borderColor: colors,
    borderWidth: borderWidths,
    minWidth: sizes,
    maxWidth: sizes,
    minHeight: sizes,
    maxHeight: sizes,
    width: sizes,
    height: sizes,
    fontWeight: fontWeights,
    fontSize: fontSizes,
    display: ["inline", "flex"],
    flexDirection: ["column", "row"],
    justifyContent: ["flex-start", "space-between", "flex-end", "center"],
    flexShrink: [0],
    textAlign: ["center"],
    alignItems: ["center"],
    borderStyle: {},
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    gap: space,
  },
  shorthands: {
    p: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    pb: ["paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pl: ["paddingLeft"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    m: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    mr: ["marginRight"],
    ml: ["marginLeft"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
  },
});

const responsiveProperties = defineProperties({
  conditions: {
    s: {},
    md: { "@media": "screen and (min-width: 880px)" },
  },
  defaultCondition: "s",
  properties: {},
  shorthands: {},
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  unconditionalProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
