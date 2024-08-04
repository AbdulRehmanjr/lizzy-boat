import React from "react";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white/30 backdrop-blur-md text-white shadow hover:bg-white/40 focus:bg-white/50 active:bg-white/60",
        destructive:
          "bg-red-600/30 backdrop-blur-md text-white shadow-sm hover:bg-red-600/40 focus:bg-red-600/50 active:bg-red-600/60",
        outline:
          "border border-white/30 backdrop-blur-md text-white shadow-sm hover:bg-white/40 focus:bg-white/50 active:bg-white/60",
        secondary:
          "bg-gray-700/30 backdrop-blur-md text-white shadow-sm hover:bg-gray-700/40 focus:bg-gray-700/50 active:bg-gray-700/60",
        ghost:
          "bg-transparent backdrop-blur-sm text-white hover:bg-white/10 focus:bg-white/20 active:bg-white/30",
        link: "text-blue-600 underline-offset-4 hover:underline",
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
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Component = asChild ? "span" : "button";
    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
