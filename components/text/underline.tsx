import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { BasicUiComponent } from '@/types';

type UnderlineProps = BasicUiComponent & {
  minimal?: boolean;
  hoverEffect?: boolean;
};

export const Underline: FC<UnderlineProps> = ({ className, children, hoverEffect = true, minimal }) => {
  const underlineClasses = cn(
    'duration-250 bg-[position:0_100%] md:bg-[position:0_84%] bg-no-repeat bg-[length:100%_0.075em] grow-0',
    {
      'hover:bg-[length:100%_100%] dark:hover:text-black': hoverEffect,
      'bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] transition-[background-size] ease-in': !minimal,
      'bg-white': minimal,
    },
    className,
  );
  return <span className={underlineClasses}>{children}</span>;
};

export const HighlightText: FC<BasicUiComponent> = ({ className, children }) => {
  return (
    <span className={cn('bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] px-1 font-bold text-black', className)}>
      {children}
    </span>
  );
};
