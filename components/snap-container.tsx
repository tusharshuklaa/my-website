import { ComponentProps, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

export const SnapSection: FC<BasicUiComponent<ComponentProps<"section">>> = ({ children, className }) => {
  return <section className={cn("snap-start", className)}>{children}</section>;
};
