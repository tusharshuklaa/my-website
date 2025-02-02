import { FC } from 'react';
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";

type MultiColumnProps = BasicUiComponent<{
  columns?: 2 | 3;
  gap?: 4 | 6 | 8 | 10 | 12;
}>;

export const MultiColumn: FC<MultiColumnProps> = ({ children, className, columns = 2, gap = 4, ...props }) => {
  const multiColumnClasses = cn(
    'grid',
    {
      'grid-cols-2': columns === 2,
      'grid-cols-3': columns === 3,
      'gap-4': gap === 4,
      'gap-6': gap === 6,
      'gap-8': gap === 8,
      'gap-10': gap === 10,
      'gap-12': gap === 12,
    },
    className
  );

  return (
    <div data-testid="cmp-multi-column" className={multiColumnClasses} {...props}>
      {children}
    </div>
  );
};

MultiColumn.displayName = 'MultiColumn';
