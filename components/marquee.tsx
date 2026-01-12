import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { BasicUiComponent } from '@/types';

export const Marquee: FC<BasicUiComponent> = ({ children, className, ...props }) => {
  const marqueeClasses = cn('relative overflow-hidden whitespace-nowrap', className);

  return (
    <div data-testid="cmp-marquee" className={marqueeClasses} {...props}>
      <div className="inline-block w-full animate-marquee">{children}</div>
    </div>
  );
};

Marquee.displayName = 'Marquee';
