import { FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

export const Heading: FC<BasicUiComponent> = ({ children, className }) => {
  return <h2 className={cn("mb-4 max-w-4xl text-lg text-black dark:text-white md:text-4xl", className)}>{children}</h2>;
};
