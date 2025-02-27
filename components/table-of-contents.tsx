'use client';

import { FC } from "react";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { PrettyLink } from '@components/pretty-link';
import { ToggleContent } from "@components/toggle-list";

export type TableOfContent = {
  content: string;
  level: number;
  slug: string;
};

type TableOfContentsProps = UiComponent<{
  tocs: Array<TableOfContent>;
}>;

export const TableOfContents: FC<TableOfContentsProps> = ({ className, tocs }) => (
  <ToggleContent heading="Table of Contents" defaultOpen={true} className={className}>
    <ul className="list-disc text-2xl">
      {
        tocs.map((heading) => {
          const listClasses = cn("", {
            "ml-4": heading.level === 2,
            "ml-8 first:mt-4": heading.level === 3,
            "ml-12": heading.level === 4,
          });

          return (
            <li key={heading.slug} className={listClasses}>
              <PrettyLink
                href={`#${heading.slug}`}
                title={heading.content}
                isExternal={false}
                minimal={true}
              >
                {heading.content}
              </PrettyLink>
            </li>
          );
        })
      }
    </ul>
  </ToggleContent>
);

TableOfContents.displayName = 'TableOfContents';
