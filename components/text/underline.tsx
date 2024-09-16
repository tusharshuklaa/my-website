import { FC } from "react";
import { cn } from "@/lib/utils";

type UnderlineSize = "sm" | "md" | "lg";
type UnderlineProps = {
  children: string;
  className?: string;
  size?: UnderlineSize;
};

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
