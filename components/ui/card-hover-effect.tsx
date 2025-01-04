"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardTitle, CardDescription, CardDate } from "./card";
import { UiComponent } from "@/types";
import { GradientText } from "../text";

type HoverCardItem = {
  title: string;
  date?: string;
  summary: string | React.ReactNode;
  url: string;
};

type HoverCardsType = UiComponent<{
  items: Array<HoverCardItem>;
  cardClassName?: string;
}>;

export const HoverCards: FC<HoverCardsType> = ({ items, cardClassName, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.url}
          key={item?.url}
          className="group relative block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
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
            <CardDescription
              className={cn(
                "line-clamp-5", {
                "text-white": hoveredIndex === idx,
              })}
            >
              {item.summary}
            </CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};
