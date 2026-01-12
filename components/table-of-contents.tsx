'use client';

import { ToggleContent } from '@components/toggle-list';
import Link from 'next/link';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';

export type TableOfContent = {
  content: string;
  level: number;
  slug: string;
};

type TableOfContentsProps = UiComponent<{
  tocs: Array<TableOfContent>;
}>;

export const TableOfContents: FC<TableOfContentsProps> = ({ className, tocs }) => (
  <ToggleContent heading="Table of Contents" className={className}>
    <ul className="text-2xl">
      {tocs.map(heading => {
        const listClasses = cn('', {
          'ml-4': heading.level === 2,
          'ml-8 first:mt-4': heading.level === 3,
          'ml-12': heading.level === 4,
        });

        return (
          <li key={heading.slug} className={listClasses}>
            <Link href={`#${heading.slug}`} title={heading.content} className="leading-5 hover:text-white">
              {heading.content}
            </Link>
          </li>
        );
      })}
    </ul>
  </ToggleContent>
);

TableOfContents.displayName = 'TableOfContents';
