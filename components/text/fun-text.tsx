import { FC } from "react";
import { cn } from "@/lib/utils";

type FunTextProps = {
  children: string;
  className?: string;
};

export const FunText: FC<FunTextProps> = ({ children, className }) => (
  <span
    className={cn(
      "hover:[text-shadow:0px_0px_2rem_navajowhite] text-transparent bg-clip-text bg-50% cursor-pointer animate-conic-text-rev hover:animate-conic-text bg-collage-gradient",
      className,
    )}
  >
    {children}
  </span>
);
