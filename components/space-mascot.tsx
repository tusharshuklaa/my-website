import { FC } from 'react';
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";

export const SpaceMascot:FC<BasicUiComponent> = ({ children, className, ...props }) => {
  const spaceMascotClasses = cn('space-mascot absolute top-1/2 left-1/2', className);

  return (
    <div data-testid="cmp-space-mascot" className={ spaceMascotClasses } {...props}>
      <span className="jetpack bg-black dark:bg-white absolute">
        <span className="bg-black dark:bg-white"></span>
        <span className="bg-black dark:bg-white"></span>
        <span className="bg-black dark:bg-white"></span>
        <span className="bg-black dark:bg-white"></span>
      </span>
      <div className='base'>
        <span className="w-0 h-0 absolute before:bg-black dark:before:bg-white border-r-black dark:border-r-white after:border-r-black after:dark:border-r-white before:absolute after:absolute before:rounded-full after:w-0 after:h-0"></span>
        <div className='face absolute bg-black dark:bg-white after:bg-black dark:after:bg-white after:absolute'></div>
      </div>
    </div>
  );
};

SpaceMascot.displayName = 'SpaceMascot';
