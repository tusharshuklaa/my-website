"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AdvImage } from "@components/adv-image";
import { cn } from "@/lib/utils";
import { badgeVariants, Card, CardTitle, CardDescription, CardDate, CardFooter } from "@ui";
import { GradientText } from "@components/text";
import { UiComponent } from "@/types";

type HoverCardItem = {
  title: string;
  date?: string;
  readingTimeString?: string;
  summary?: string | React.ReactNode;
  url: string;
  tags?: Array<string>;
  img?: string;
};

type HoverCardsType = UiComponent<{
  items: Array<HoverCardItem>;
  cardClassName?: string;
  titleClassName?: string;
  onTagClick?: (tag: string) => void;
}>;

export const HoverCards: FC<HoverCardsType> = ({ items, cardClassName, className, onTagClick, titleClassName }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTagClick = (event: React.MouseEvent<HTMLButtonElement>, tag: string) => {
    event.preventDefault();
    onTagClick?.(tag);

    return;
  };

  return (
    <div className={cn("grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => {
        const isHovered = hoveredIndex === idx;

        return (
          <Link
            target={item?.url.startsWith("http") ? "_blank" : "_self"}
            href={item?.url}
            key={item?.url}
            className="group relative block h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-2xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <Card className={cardClassName}>
              <CardTitle className={cn("line-clamp-2", titleClassName)}>
                {isHovered ? <GradientText text={item.title} /> : item.title}
              </CardTitle>

              {(item.date || item.readingTimeString) && (
                <div>
                  {item.date && (
                    <CardDate
                      date={item.date}
                      className={cn({
                        "font-bold": isHovered,
                      })}
                    />
                  )}

                  {item.readingTimeString && (
                    <>
                      <span className="mx-1">•</span>
                      <span
                        className={cn("mt-1 inline-block text-sm text-neutral-500 dark:text-neutral-300", {
                          "font-bold": isHovered,
                        })}
                      >
                        {item.readingTimeString}
                      </span>
                    </>
                  )}
                </div>
              )}

              {item.summary && (
                <CardDescription
                  className={cn("line-clamp-5", {
                    "text-white": isHovered,
                  })}
                >
                  {item.summary}
                </CardDescription>
              )}

              {item.img && (
                <div className="mt-2 h-44 w-full">
                  <AdvImage
                    src={item.img}
                    alt={item.title}
                    width={170}
                    height={170}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              )}

              {item.tags?.length && (
                <CardFooter className="justify-end gap-2">
                  {item.tags.map(tag => (
                    <button
                      key={tag}
                      className={badgeVariants({ variant: "destructive" })}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleTagClick(event, tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </CardFooter>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
