import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { BasicUiComponent } from '@/types';

export const GlitchText: FC<BasicUiComponent> = ({ children, className }) => (
  <span
    data-text={children}
    className={cn(
      'before:text-shadow-[1px_0_blue] after:text-shadow-[-1px_0_red] before:clip-rect-[0,900px,0,0] after:clip-rect-[0,900px,0,0] relative inline-block before:absolute before:left-[2px] before:top-0 before:animate-noise-anim-2 before:overflow-hidden before:bg-black before:text-white before:content-[attr(data-text)] after:absolute after:left-[2px] after:top-0 after:animate-noise-anim-1 after:overflow-hidden after:bg-black after:text-white after:content-[attr(data-text)]',
      className,
    )}
  >
    {children}
  </span>
);
