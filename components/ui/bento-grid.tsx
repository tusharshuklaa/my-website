import Link from 'next/link';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { BasicUiComponent, UiComponent } from '@/types';
import { GradientText } from '../text';

export const BentoGrid: FC<BasicUiComponent> = ({ className, children }) => {
  return (
    <div className={cn('mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3', className)}>
      {children}
    </div>
  );
};

type BentoGridItemProps = UiComponent<{
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  header: React.ReactNode;
  maxLines?: 1 | 2 | 3 | 4 | 5;
  date: string;
  readingTimeString?: string;
  url: string;
}>;

export const BentoGridItem: FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  maxLines = 3,
  date,
  readingTimeString,
  url,
}) => {
  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-gray-200 border-transparent bg-white p-3 shadow-input transition duration-200 hover:shadow-xl dark:border-gray-800 dark:border-white/[0.2] dark:bg-black dark:shadow-none',
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <Link href={url}>
          <GradientText text={title} className="line-clamp-1 font-bold" />

          <div className="flex text-xs font-extrabold">
            <time dateTime={date}>{date}</time>
            {readingTimeString && (
              <>
                <span className="mx-1">•</span>
                <span>{readingTimeString}</span>
              </>
            )}
          </div>

          <p
            className={cn('mt-2 text-xs font-normal text-neutral-600 dark:text-neutral-300', {
              'line-clamp-1': maxLines === 1,
              'line-clamp-2': maxLines === 2,
              'line-clamp-3': maxLines === 3,
              'line-clamp-4': maxLines === 4,
              'line-clamp-5': maxLines === 5,
            })}
          >
            {description}
          </p>
        </Link>
      </div>
    </div>
  );
};
