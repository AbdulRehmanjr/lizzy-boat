import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f7fcfc] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#1f788b] text-[#f7fcfc] shadow hover:bg-[#1f788b]/90",
        destructive:
          "bg-red-600/30 backdrop-blur-md text-white shadow-sm hover:bg-red-600/40 focus:bg-red-600/50 active:bg-red-600/60",
        outline:
          "border border-[#1f788b] text-[#1f788b] bg-transparent shadow-sm hover:bg-[#1f788b]/10 hover:text-[#1f788b]",
        secondary:
          "bg-gray-700/30 backdrop-blur-md text-[#f7fcfc] shadow-sm hover:bg-gray-700/40 focus:bg-gray-700/50 active:bg-gray-700/60",
        ghost: "hover:bg-[#1f788b]/10 hover:text-[#1f788b]",
        link: "text-[#1f788b] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
