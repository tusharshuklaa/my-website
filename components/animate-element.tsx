'use client';

import { useScreenType } from '@hooks/use-screen-type';
import { type Easing, motion } from 'motion/react';
import type { FC } from 'react';
import type { BasicUiComponent } from '@/types';

type AnimateElementProps = BasicUiComponent<{
  duration?: number;
  delay?: number;
  ease?: Easing;
  ignoreMobileDelay?: boolean;
}>;

export const AnimateElement: FC<AnimateElementProps> = ({
  children,
  className,
  delay = 0.3,
  duration = 0.8,
  ease = 'easeInOut',
  ignoreMobileDelay = false,
}) => {
  const { isMobile } = useScreenType();
  const actualDelay = ignoreMobileDelay && isMobile ? 0 : delay;
  const actualDuration = isMobile ? duration / 2 : duration;

  return (
    <motion.div
      data-testid="cmp-animate-element"
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: actualDelay,
        duration: actualDuration,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

AnimateElement.displayName = 'AnimateElement';
