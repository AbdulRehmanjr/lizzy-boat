import React from "react";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white shadow hover:bg-black/90",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-600/90",
        outline:
          "border border-gray-200 bg-white text-black shadow-sm hover:bg-gray-100",
        secondary: "bg-gray-700 text-white shadow-sm hover:bg-gray-700/80",
        ghost: "hover:bg-gray-100 text-black",
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
