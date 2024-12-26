import { FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent, UiComponent } from "@/types";
import { GradientText } from "../text";
import Link from "next/link";

export const BentoGrid: FC<BasicUiComponent> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

type BentoGridItemProps = UiComponent<{
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  header: React.ReactNode;
  maxLines?: 1 | 2 | 3 | 4 | 5;
  date: string;
  url: string;
}>;

export const BentoGridItem: FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  maxLines = 3,
  date,
  url,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-3 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-200 border-transparent justify-between flex flex-col space-y-4 dark:border-gray-800",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <Link href={url}>
          <GradientText text={title} className="font-bold line-clamp-1" />

          <time dateTime={date} className="text-xs">
            {date}
          </time>

          <p
            className={cn(
              "font-normal text-neutral-600 text-xs dark:text-neutral-300 mt-2",
              {
                "line-clamp-1": maxLines === 1,
                "line-clamp-2": maxLines === 2,
                "line-clamp-3": maxLines === 3,
                "line-clamp-4": maxLines === 4,
                "line-clamp-5": maxLines === 5,
              }
            )}
          >
            {description}
          </p>
        </Link>
      </div>
    </div>
  );
};
