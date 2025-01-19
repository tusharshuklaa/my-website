"use client";

import { FC, useMemo } from 'react';
import { compareDesc, format, parseISO } from 'date-fns';
import { allBlogs, Blog } from '@content';
import { cn } from '@/lib/utils';
import { BentoGrid, BentoGridItem, HoverCards, PlaceholdersAndVanishInput } from '@ui';
import { ArticleHero } from '@components/blog-hero';
import { BentoThreeDCard } from '@components/bento-three-d-card';
import { LuminenceSkeleton, AnimatedContentSkeleton, ChatSkeleton, ImageSkeleton } from '@components/bento-skeleton';
import { SearchResults } from '@components/search-results';
import { useMdxContent } from '@/hooks/use-mdx-content';

const placeholders = [
  "react",
  "performance",
  "css art",
  "productivity",
];

const AllBlogsPage: FC = () => {
  const blogs = allBlogs
  .filter(blog => blog.published)
  .map(blog => ({
    ...blog,
    date: format(parseISO(blog.date), 'LLLL d, yyyy')
  }))
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const { items, onSubmit, onSearchClear, searchQuery } = useMdxContent(blogs);
  const visibleBlogs = items as Array<Blog>;

  const recentBlogs = useMemo(() => {
    return visibleBlogs.slice(0, 5).map((blog, index) => {
      const itemClasses = cn(
        'bg-white dark:bg-black',
        {
          'md:col-span-2 md:row-span-2': index === 0,
          'md:col-span-2': index === 4,
          'md:col-span-1': !(index === 0 || index === 4),
        },
      );

      let Skeleton: () => JSX.Element = LuminenceSkeleton;
      switch (index) {
        case 0:
          // Case for 3D card
          break;
        case 1:
          Skeleton = AnimatedContentSkeleton;
          break;
        case 2:
          Skeleton = ChatSkeleton;
          break;
        case 3:
          Skeleton = LuminenceSkeleton;
          break;
        case 4:
          Skeleton = () => ImageSkeleton(blog.title, blog.img);
          break;
        default:
          Skeleton = LuminenceSkeleton;
      };

      return {
        title: blog.title,
        description: blog.summary,
        header: <Skeleton />,
        className: itemClasses,
        date: blog.date,
        img: blog.img,
        url: blog.url,
      };
    });
  }, [visibleBlogs]);

  const remainingBlogs = useMemo(() => visibleBlogs.slice(5), [visibleBlogs]);

  return (
    <section className="relative mt-20 md:mt-40 max-w-xs md:max-w-4xl mx-auto">
      <ArticleHero text="My Blogs" />

      <div className="flex flex-col items-center justify-between mb-10 md:mb-20 mt-3 md:mt-8 min-h-44">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onSubmit={onSubmit}
          className="mb-12 w-full"
        />

        <SearchResults query={ searchQuery } itemsCount={visibleBlogs.length} onSearchClear={ onSearchClear } />
      </div>

      <BentoGrid className="mb-5">
        {recentBlogs.map((item, i) => {
          if (i === 0) {
            return <BentoThreeDCard key={i} {...item} />;
          }

          return (
            <BentoGridItem
              {...item}
              key={i}
              maxLines={2}
              className={cn("[&>p:text-lg]", item.className)}
            />
          );
        })}
      </BentoGrid>

      <HoverCards items={remainingBlogs} cardClassName='p-6' />
    </section>
  );
};

export default AllBlogsPage;
