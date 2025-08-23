import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils"; // keep your existing helper import

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transform-gpu focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-neutral hover:bg-primary-dark active:bg-primary-dark active:scale-95",
        secondary:
          "bg-secondary text-neutral hover:bg-secondary-dark active:bg-secondary-dark active:scale-95",
        accent:
          "bg-accent text-neutral hover:bg-accent-dark active:bg-accent-dark active:scale-95",
        neutral:
          "bg-neutral text-highlight hover:bg-neutral-dark active:bg-neutral-dark active:scale-95",
        outline: "btn-outline",
        destructive: "btn-destructive",
        ghost: "btn-ghost",
        link: "bg-transparent underline-offset-4 text-neutral hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
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
