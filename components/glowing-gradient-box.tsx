import { FC } from 'react';
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";

export const GlowingGradientBox: FC<BasicUiComponent> = ({ children, className, ...props }) => {
  const glowingGradientBoxClasses = cn(
    "relative bg-[linear-gradient(135deg,_#1e1e24_10%,_#050505_60%)] bg-[length:200%_200%] select-none animate-gradient-shift",
    "before:absolute before:top-[-5px] before:left-[-5px] before:w-[calc(100%+10px)] before:h-[calc(100%+10px)] before:z-[-2]",
    "before:blur-[2vmin] before:animate-blur-animation",
    "before:bg-[radial-gradient(circle_at_0_0,hsl(27,93%,60%),transparent),radial-gradient(circle_at_100%_0,#00a6ff,transparent),radial-gradient(circle_at_0_100%,#ff0056,transparent),radial-gradient(circle_at_100%_100%,#6500ff,transparent)]",
    "after:bg-[radial-gradient(circle_at_0_0,hsl(27,93%,60%),transparent),radial-gradient(circle_at_100%_0,#00a6ff,transparent),radial-gradient(circle_at_0_100%,#ff0056,transparent),radial-gradient(circle_at_100%_100%,#6500ff,transparent)]",
    "after:absolute after:top-[-1px] after:left-[-1px] after:w-[calc(100%+2px)] after:h-[calc(100%+2px)] after:z-[-1]",
    className
  );

  return (
    <div data-testid={`cmp-neon-box`} className={glowingGradientBoxClasses} {...props}>
      {children}
    </div>
  );
};

GlowingGradientBox.displayName = 'GlowingGradientBox';
