import { cn } from "@/lib/utils";
import { BasicUiComponent, UiComponent } from "@/types";
import { FC } from "react";

export const Card: FC<BasicUiComponent> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent p-4 group-hover:border-slate-700 dark:border-white/[0.2]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle: FC<BasicUiComponent> = ({ className, children }) => {
  return <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>{children}</h4>;
};

export const CardDate: FC<UiComponent<{ date: string }>> = ({ className, date }) => {
  return <time dateTime={date} className={cn("text-neutral-500 text-sm mt-1 dark:text-neutral-300 inline-block", className)}>{date}</time>;
};

export const CardDescription: FC<BasicUiComponent> = ({ className, children }) => {
  return <p className={cn("mt-4 text-sm leading-relaxed tracking-wide text-zinc-400", className)}>{children}</p>;
};

export const CardFooter: FC<BasicUiComponent> = ({ className, children }) => {
  return <div className={cn("mt-4 flex", className)}>{children}</div>;
};
