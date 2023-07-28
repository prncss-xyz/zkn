// https://nextjs.org/docs/pages/api-reference/components/linkhttps://nextjs.org/docs/pages/api-reference/components/link
import { forwardRef } from "react";
import { Box, BoxProps } from "./box";

// a stylable version of next link
export const Button = forwardRef<HTMLButtonElement, BoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      as="button"
      px={5}
      borderRadius={3}
      color="link"
      backgroundColor="foreground2"
      fontWeight="bold"
      {...props}
    />
  );
});

Button.displayName = "Button";
