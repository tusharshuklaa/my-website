import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';

export const SpaceMascot: FC<UiComponent> = ({ className, ...props }) => {
  const spaceMascotClasses = cn('space-mascot absolute top-1/2 left-1/2', className);

  return (
    <div data-testid="cmp-space-mascot" className={spaceMascotClasses} {...props}>
      <span className="jetpack absolute bg-black dark:bg-white">
        <span className="bg-black dark:bg-white"></span>
        <span className="bg-black dark:bg-white"></span>
        <span className="bg-black dark:bg-white"></span>
        <span className="bg-black dark:bg-white"></span>
      </span>
      <div className="base">
        <span className="absolute h-0 w-0 border-r-black before:absolute before:rounded-full before:bg-black after:absolute after:h-0 after:w-0 after:border-r-black dark:border-r-white dark:before:bg-white after:dark:border-r-white"></span>
        <div className="face absolute bg-black after:absolute after:bg-black dark:bg-white dark:after:bg-white"></div>
      </div>
    </div>
  );
};

SpaceMascot.displayName = 'SpaceMascot';
