import { FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

export const Underline: FC<BasicUiComponent> = ({ className, children }) => {
  return (
    <span
      className={cn(
        "duration-250 bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] bg-[length:100%_0.2em] bg-[position:0_100%] md:bg-[position:0_88%] bg-no-repeat transition-[background-size] ease-in hover:bg-[length:100%_88%] grow-0 dark:hover:text-black",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const HighlightText: FC<BasicUiComponent> = ({ className, children }) => {
  return <span className={cn("bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] font-bold text-black px-1", className)}>
    {children}
  </span>;
};
