"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { badgeVariants, Card, CardTitle, CardDescription, CardDate, CardFooter, } from "@ui";
import { GradientText } from "@components/text";
import { UiComponent } from "@/types";

type HoverCardItem = {
  title: string;
  date?: string;
  summary?: string | React.ReactNode;
  url: string;
  tags?: Array<string>;
  heroImg?: string;
};

type HoverCardsType = UiComponent<{
  items: Array<HoverCardItem>;
  cardClassName?: string;
  onTagClick?: (tag: string) => void;
}>;

export const HoverCards: FC<HoverCardsType> = ({ items, cardClassName, className, onTagClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTagClick = (event: React.MouseEvent<HTMLButtonElement>, tag: string) => {
    event.preventDefault();
    onTagClick?.(tag);

    return;
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", className)}>
      {items.map((item, idx) => (
        <Link
          target={ item?.url.startsWith('http') ? '_blank' : '_self' }
          href={item?.url}
          key={item?.url}
          className="group relative block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
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
            <CardTitle className="line-clamp-2">
              {
                hoveredIndex === idx ? (<GradientText text={item.title} />) : (item.title)
              }
            </CardTitle>
            {
              item.date && (
                <CardDate date={item.date} className={cn({
                  "font-bold": hoveredIndex === idx,
                })} />
              )
            }
            
            {
              item.summary && (
                <CardDescription
                  className={cn(
                    "line-clamp-5", {
                    "text-white": hoveredIndex === idx,
                  })}
                >
                  {item.summary}
                </CardDescription>
              )
            }

            {
              item.heroImg && (
                <div className="mt-2 w-full h-44">
                  <Image
                    src={item.heroImg}
                    alt={item.title}
                    width={170}
                    height={170}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )
            }

            {
              item.tags?.length && (
                <CardFooter className="justify-end gap-2">
                  {
                    item.tags.map((tag) => (
                      <button
                        key={tag}
                        className={badgeVariants({ variant: "destructive" })}
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleTagClick(event, tag)}
                      >
                        {tag}
                      </button>
                    ))
                  }
                </CardFooter>
              )
            }
          </Card>
        </Link>
      ))}
    </div>
  );
};
