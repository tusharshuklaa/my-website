import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";
import { FC } from "react";

export const Card: FC<BasicUiComponent> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent p-4 group-hover:border-slate-700 dark:border-white/[0.2]",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle: FC<BasicUiComponent> = ({ className, children }) => {
  return <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>{children}</h4>;
};
export const CardDescription: FC<BasicUiComponent> = ({ className, children }) => {
  return <p className={cn("mt-8 text-sm leading-relaxed tracking-wide text-zinc-400", className)}>{children}</p>;
};
