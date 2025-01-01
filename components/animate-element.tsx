'use client';

import { FC } from 'react';
import { BasicUiComponent } from "@/types";
import { Easing, motion } from 'framer-motion';

type AnimateElementProps = BasicUiComponent<{
  duration?: number;
  delay?: number;
  ease?: Easing;
}>;

export const AnimateElement:FC<AnimateElementProps> = ({ children, className, delay = 0.3, duration = 0.8, ease = "easeInOut" }) => {
  return (
    <motion.div
      data-testid="cmp-animate-element"
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

AnimateElement.displayName = 'AnimateElement';
