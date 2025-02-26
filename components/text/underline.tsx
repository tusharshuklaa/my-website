import { FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

type UnderlineProps = BasicUiComponent & {
  minimal?: boolean;
};

export const Underline: FC<UnderlineProps> = ({ className, children, minimal }) => {
  const underlineClasses = cn(
    "duration-250 bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] bg-[position:0_100%] md:bg-[position:0_88%] bg-no-repeat transition-[background-size] ease-in hover:bg-[length:100%_88%] grow-0 dark:hover:text-black",
    {
      "bg-[length:100%_0.2em]": !minimal,
      "bg-[length:100%_0.0em]": minimal,
    },
    className
  );
  return (
    <span className={underlineClasses}>
      {children}
    </span>
  );
};

export const HighlightText: FC<BasicUiComponent> = ({ className, children }) => {
  return <span className={cn("bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] font-bold text-black px-1", className)}>
    {children}
  </span>;
};
