import { GlowingGradientBox } from '@components/glowing-gradient-box';
import { Select, SelectContent, SelectItem, SelectTriggerWithoutIcon, SelectValue } from '@ui';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';

export const BlogSortTypes = {
  DATE_ASC: 'date_asc',
  DATE_DESC: 'date_desc',
  TIME_ASC: 'time_asc',
  TIME_DESC: 'time_desc',
  TITLE_ASC: 'title_asc',
  TITLE_DESC: 'title_desc',
} as const;

export type SortingType = (typeof BlogSortTypes)[keyof typeof BlogSortTypes];

type BlogSortDropdownProps = UiComponent<{
  sortType: SortingType;
  onValueChange: (sortType: SortingType) => void;
}>;

export const BlogSortDropdown: FC<BlogSortDropdownProps> = ({ className, onValueChange, sortType }) => {
  const blogSortDropdownClasses = cn(
    'w-36 h-12 px-4 rounded-full dark:bg-slate-900/90 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)]',
    className,
  );
  const sortOptions = Object.values(BlogSortTypes).map(item => {
    const label = item
      .split('_')
      .map((word, idx) => {
        if (idx === 0) return word.charAt(0).toUpperCase() + word.slice(1);
        if (word === 'asc') return ' ↑';
        return '↓';
      })
      .join(' ');

    return {
      label,
      value: item,
    };
  });

  return (
    <Select data-testid="cmp-blog-sort-dropdown" value={sortType} onValueChange={onValueChange}>
      <GlowingGradientBox className="max-w-xl rounded-full before:rounded-full after:rounded-full">
        <SelectTriggerWithoutIcon className={blogSortDropdownClasses}>
          <span>Sort By : </span>
          <SelectValue placeholder="Published ↑" />
        </SelectTriggerWithoutIcon>
      </GlowingGradientBox>

      <SelectContent>
        {sortOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

BlogSortDropdown.displayName = 'BlogSortDropdown';
