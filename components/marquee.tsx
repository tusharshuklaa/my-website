import { FC } from "react";
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";

export const Marquee: FC<BasicUiComponent> = ({ children, className, ...props }) => {
  const marqueeClasses = cn("relative overflow-hidden whitespace-nowrap", className);

  return (
    <div data-testid="cmp-marquee" className={marqueeClasses} {...props}>
      <div className="inline-block w-full animate-marquee">{children}</div>
    </div>
  );
};

Marquee.displayName = "Marquee";
