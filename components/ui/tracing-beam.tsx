"use client";

import React, { FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useTransform, useScroll, useSpring, useMotionValueEvent } from "motion/react";
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
  const { mainRef, isMainReady } = useRootRef();

  // Fixed: Proper typing with type assertion for Motion's offset requirements
  const scrollConfig = useMemo(() => {
    if (isMainReady && mainRef.current && targetRef?.current) {
      return {
        container: mainRef,
        target: targetRef || ref,
        // Fixed: Explicit type assertion to match Motion's expected offset type
        offset: ["start start", "end center"] as ["start start", "end center"],
      };
    }
    return undefined; // Return undefined instead of empty object for cleaner conditional logic
  }, [isMainReady, mainRef, targetRef, ref]);

  const { scrollYProgress } = useScroll(scrollConfig);

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Memoize SVG height calculation
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Throttled percentage update for better performance
  const updatePercentage = useCallback((latest: number) => {
    const progress = Math.max(0, Math.min(100, Math.round(latest * 100)));
    setPercentageRead(progress);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", updatePercentage);

  // Memoize spring animations for performance
  const springConfig = useMemo(
    () => ({
      stiffness: 300,
      damping: 190,
      restDelta: 0.001,
    }),
    [],
  );

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]), springConfig);

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 250]), springConfig);

  // Memoize SVG path for performance
  const svgPath = useMemo(() => `M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`, [svgHeight]);

  // Enhanced accessibility
  const progressLabel = `Reading Progress: ${percentageRead}% complete`;

  return (
    <motion.div ref={ref} className={cn("relative mx-auto h-full w-full max-w-4xl", className)}>
      <div className="absolute -left-4 top-3 h-full md:-left-20">
        {/* Progress percentage indicator */}
        <motion.span
          className="absolute left-2 top-[81vh] m-auto h-3 cursor-pointer text-xs text-gray-300 transition-all duration-300 [rotate:-55deg] hover:-left-8 hover:text-4xl hover:text-gray-100"
          aria-label={progressLabel}
          aria-live="polite"
          // Smooth animation for percentage updates
          animate={{
            opacity: percentageRead > 0 ? 1 : 0.5,
            scale: percentageRead === 100 ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {`${percentageRead}%`}
        </motion.span>

        {/* Progress indicator dot */}
        <motion.div
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 shadow-lg shadow-emerald-200"
          animate={{
            scale: percentageRead > 0 ? 1 : 0.8,
            borderColor: percentageRead === 100 ? "#10b981" : "#e5e7eb",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-2 w-2 rounded-full border border-emerald-600 bg-emerald-500"
            animate={{
              backgroundColor: percentageRead === 100 ? "#10b981" : "#6ee7b7",
              scale: percentageRead === 100 ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* SVG Progress Trail */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block h-full"
          aria-hidden="true"
          role="presentation"
        >
          {/* Background path */}
          <motion.path d={svgPath} fill="none" stroke="#9091A0" strokeOpacity="0.16" transition={{ duration: 0.5 }} />

          {/* Animated progress path */}
          <motion.path
            d={svgPath}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 0.5 }}
          />

          <defs>
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
