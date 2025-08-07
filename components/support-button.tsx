import { FC } from "react";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@components/ui";

type SupportButtonProps = UiComponent & {
  containerClassName?: string;
};

export const SupportButton: FC<SupportButtonProps> = ({ containerClassName, className }) => {
  const supportButtonClasses = cn(
    "dark:bg-slate-950 bg-white text-black dark:text-white flex items-center space-x-2",
    className,
  );

  return (
    <HoverBorderGradient
      data-testid="cmp-support-button"
      className={supportButtonClasses}
      as="a"
      href="/support-me"
      containerClassName={cn("rounded-full h-12", containerClassName)}
    >
      Support My Work
    </HoverBorderGradient>
  );
};

SupportButton.displayName = "SupportButton";
