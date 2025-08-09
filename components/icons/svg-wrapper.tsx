import { FC } from "react";
import { CustomIcon } from "@/types/icons";
import { cn } from "@/lib/utils";

type SvgWrapperProps = CustomIcon & {
  children: React.ReactNode;
  className?: string;
};

export const SvgWrapper: FC<SvgWrapperProps> = ({ children, width = 20, height = 20, className }) => (
  <svg
    className={cn("mr-2 h-4 w-4", className)}
    role="img"
    viewBox={`0 0 24 24`}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-width="0.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {children}
  </svg>
);
