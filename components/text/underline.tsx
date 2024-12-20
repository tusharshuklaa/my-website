import { FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

type UnderlineSize = "sm" | "md" | "lg";
type UnderlineProps = BasicUiComponent<{
  size?: UnderlineSize;
}>;

export const Underline: FC<UnderlineProps> = ({ className, children, size = "sm" }) => {
  const sizeClassMap: Record<UnderlineSize, string> = {
    sm: "after:-bottom-1 after:h-2 after:-left-1 after:-right-1",
    md: "after:-bottom-[0.125rem] after:h-3 after:-left-2 after:-right-2",
    lg: "after:-bottom-[0.125rem] after:h-3 after:-left-2 after:-right-2",
  };

  return (
    <span
      className={cn(
        "atfer:bg-cover relative after:absolute after:-z-[1] after:-rotate-[2deg] after:bg-[url('/img/underline.svg')] after:bg-no-repeat after:content-['']",
        sizeClassMap[size],
        className,
      )}
    >
      {children}
    </span>
  );
};

export const PrettyUnderline: FC<Omit<UnderlineProps, "size">> = ({ className, children }) => {
  return (
    <span
      className={cn(
        "duration-250 bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] bg-[length:100%_0.2em] bg-[position:0_88%] bg-no-repeat transition-[background-size] ease-in hover:bg-[length:100%_88%]",
        className,
      )}
    >
      {children}
    </span>
  );
};
