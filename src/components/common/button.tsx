import { extendVariants, Button as NextButton } from "@nextui-org/react";

export const Button = extendVariants(NextButton, {
  variants: {
    color: {
      primary: "bg-primary text-white",
    },
  },
});
