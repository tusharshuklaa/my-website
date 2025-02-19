'use client';

import { forwardRef } from 'react';
import { BasicUiRefComponent } from "@/types";
import { motion } from 'framer-motion';


export const PageTransition = forwardRef<HTMLDivElement, BasicUiRefComponent>(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      {...props}
      ref={ref}
      className="fixed left-0 top-0 h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth sm:snap-start sm:snap-normal sm:snap-y sm:snap-proximity sm:scroll-pt-10"
      data-testid="cmp-page-transition"
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';
