"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRootRef } from "@/contexts/use-root-ref";

type TracingBeamProps = {
  children: React.ReactNode;
  className?: string;
  targetRef?: React.RefObject<HTMLDivElement>;
};

export const TracingBeam: FC<TracingBeamProps> = ({ children, className, targetRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [percentageRead, setPercentageRead] = useState(0);
  const { rootRef } = useRootRef();

  const { scrollYProgress } = useScroll({
    container: rootRef,
    target: targetRef || ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", latest => {
    const progress = Math.round(latest * 100);
    setPercentageRead(progress);
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [5, svgHeight]), {
    stiffness: 300,
    damping: 190,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [5, svgHeight - 200]), {
    stiffness: 300,
    damping: 190,
  });

  return (
    <motion.div ref={ref} className={cn("relative mx-auto h-full w-full max-w-4xl", className)}>
      <div className="absolute -left-4 top-3 h-full md:-left-20">
        <span
          className="hover-text-gray-100 absolute left-2 top-[81vh] m-auto h-3 -rotate-[55deg] cursor-pointer text-xs text-gray-300 hover:-left-8 hover:text-4xl"
          aria-label="Reading Progress"
          aria-live="polite"
        >
          {`${percentageRead}%`}
        </span>
        <div className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-lg shadow-emerald-200">
          <div className="h-2 w-2 rounded-full border border-emerald-600 bg-emerald-500" />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block h-full"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
