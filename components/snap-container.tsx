import { ComponentProps, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SnapSectionProps = ComponentProps<"section"> & {
  children: ReactNode;
  className?: string;
};

export const SnapSection: FC<SnapSectionProps> = ({ children, className }) => {
  return <section className={cn("snap-start", className)}>{children}</section>;
};
