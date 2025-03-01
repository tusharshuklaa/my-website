"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UiComponent } from "@/types";
import { useRootRef } from "@contexts/use-root-ref";
import { GradientText } from "@components/text";

type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

type TimelineProps = UiComponent<{
  containerRef: React.RefObject<HTMLDivElement>;
  data: Array<TimelineEntry>;
}>;

export const Timeline: FC<TimelineProps> = ({ className, containerRef, data }) => {
  const itemsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { rootRef } = useRootRef();

  useEffect(() => {
    if (itemsRef.current) {
      const rect = itemsRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [itemsRef]);

  const { scrollYProgress } = useScroll({
    container: rootRef,
    target: containerRef,
    offset: ["start 10%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={itemsRef} className={cn("relative mx-auto max-w-7xl pb-20", className)}>
      {data.map((item, index) => (
        <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-20">
          <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start sm:top-60 md:top-80 md:w-full md:flex-row lg:max-w-sm">
            <div className="absolute left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-lightYellow md:left-3 md:h-10 md:w-10">
              <div className="h-1 w-1 rounded-full border border-neutral-300 bg-neutral-200 p-1 dark:border-neutral-700 dark:bg-neutral-800 md:h-4 md:w-4 md:p-2" />
            </div>

            <GradientText text={item.title} className="hidden text-xl md:block md:pl-20 md:text-5xl" color="pink" />
          </div>

          <div className="relative w-full pl-12 pr-4 sm:pl-16 md:pl-4">
            <GradientText text={item.title} className="mb-4 block text-left text-2xl font-bold md:hidden" />

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                },
              }}
              viewport={{
                once: true,
                margin: "400px",
              }}
            >
              {item.content}
            </motion.div>
          </div>
        </div>
      ))}

      <div
        style={{
          height: height + "px",
        }}
        className="absolute left-5 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8"
      >
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
          className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
        />
      </div>
    </div>
  );
};
