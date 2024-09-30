import { FC } from "react";
import clsx from "clsx";

type FunTextProps = {
  children: string;
  className?: string;
};

export const FunText: FC<FunTextProps> = ({ children, className }) => (
  <span
    className={clsx(
      "animate-conic-text-rev cursor-pointer bg-collage-gradient bg-50% bg-clip-text text-transparent hover:animate-conic-text",
      className,
    )}
  >
    {children}
  </span>
);
