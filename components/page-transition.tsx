"use client";

import { forwardRef } from "react";
import { BasicUiRefComponent } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PageTransition = forwardRef<HTMLDivElement, BasicUiRefComponent>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        {...props}
        ref={ref}
        className={cn(
          "fixed left-0 top-0 h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth sm:snap-y sm:snap-proximity sm:snap-start sm:snap-normal sm:scroll-pt-10",
          className,
        )}
        data-testid="cmp-page-transition"
      >
        {children}
      </motion.div>
    );
  },
);

PageTransition.displayName = "PageTransition";
