import { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

export const SnapSection: FC<BasicUiComponent<ComponentProps<"section">>> = ({ children, className, id }) => {
  return (
    <section className={cn("snap-start", className)} id={id}>
      {children}
    </section>
  );
};
