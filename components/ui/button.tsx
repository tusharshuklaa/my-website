import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { BasicComponent, BasicUiComponent } from "@/types";

const PrimaryButtonInternal: React.FC<BasicComponent> = ({ children }) => {
  return (
    <>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
        {children}
      </div>
    </>
  );
};

const MagicButtonInternal: React.FC<BasicUiComponent> = ({ children }) => {
  return (
    <>
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl dark:bg-[#0a1728]">
        {children}
      </span>
    </>
  );
};

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
      outline:
        "border border-black dark:border-white bg-transparent hover:bg-zinc-900 dark:hover:bg-white hover:text-gray-200 dark:hover:text-gray-900",
      ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
      shimmer:
        "inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
      clear: "",
      primary: "",
      magic: "",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
      auto: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const defaultClasses =
      variant === "clear"
        ? ""
        : "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300";

    if (variant === "primary") {
      return (
        <Comp
          className={cn("relative overflow-hidden rounded-md p-1", buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <PrimaryButtonInternal>{props.children}</PrimaryButtonInternal>
        </Comp>
      );
    }

    if (variant === "magic") {
      return (
        <Comp
          className={cn(
            "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
            buttonVariants({ variant, size, className }),
          )}
          ref={ref}
          {...props}
        >
          <MagicButtonInternal>{props.children}</MagicButtonInternal>
        </Comp>
      );
    }

    return <Comp className={cn(defaultClasses, buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
