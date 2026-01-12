"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { compareDesc, format, parseISO } from "date-fns";
import { allBlogs, Blog } from "@content";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem, HoverCards, PlaceholdersAndVanishInput } from "@ui";
import { ArticleHero } from "@components/blog-hero";
import { BentoThreeDCard } from "@components/bento-three-d-card";
import { LuminenceSkeleton, AnimatedContentSkeleton, ChatSkeleton, ImageSkeleton } from "@components/bento-skeleton";
import { SearchResults } from "@components/search-results";
import { BlogSortDropdown, BlogSortTypes, SortingType } from "@components/blog-sort-dropdown";
import { useMdxContent } from "@/hooks/use-mdx-content";

const placeholders = ["react", "performance", "css art", "productivity"];

export const BlogClientPage: FC = () => {
  const [sortingType, setSortingType] = useState<SortingType>(BlogSortTypes.DATE_DESC);
  const blogs = allBlogs
    .filter(blog => blog.published)
    .map(blog => ({
      ...blog,
      date: format(parseISO(blog.date), "LLLL d, yyyy"),
    }));

  const { items, onSubmit, onSearchClear, searchQuery } = useMdxContent(blogs);
  const visibleBlogs = useMemo(() => {
    return (items as Array<Blog>).sort((a, b) => {
      switch (sortingType) {
        case BlogSortTypes.DATE_ASC:
          return compareDesc(new Date(b.date), new Date(a.date));
        case BlogSortTypes.DATE_DESC:
          return compareDesc(new Date(a.date), new Date(b.date));
        case BlogSortTypes.TIME_ASC:
          return a.readingTime - b.readingTime;
        case BlogSortTypes.TIME_DESC:
          return b.readingTime - a.readingTime;
        case BlogSortTypes.TITLE_ASC:
          return a.title.localeCompare(b.title);
        case BlogSortTypes.TITLE_DESC:
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [items, sortingType]);

  const recentBlogs = useMemo(() => {
    return visibleBlogs.slice(0, 5).map((blog, index) => {
      const itemClasses = cn("bg-white dark:bg-black", {
        "md:col-span-2 md:row-span-2": index === 0,
        "md:col-span-2": index === 4,
        "md:col-span-1": !(index === 0 || index === 4),
      });

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
      }

      return {
        title: blog.title,
        description: blog.summary,
        header: <Skeleton />,
        className: itemClasses,
        date: blog.date,
        img: blog.img,
        url: blog.url,
        readingTimeString: blog.readingTimeString,
      };
    });
  }, [visibleBlogs]);

  const remainingBlogs = useMemo(() => visibleBlogs.slice(5), [visibleBlogs]);

  const onSortingChange = useCallback(
    (value: SortingType) => {
      setSortingType(value);
    },
    [setSortingType],
  );

  return (
    <section className="relative mx-auto mt-20 max-w-xs md:mt-40 md:max-w-4xl">
      <ArticleHero text="My Blogs" />

      <div className="mb-10 mt-3 flex min-h-44 flex-col items-center justify-between md:mb-20 md:mt-8">
        <div className="flex w-full flex-col items-center justify-center gap-0 sm:flex-row sm:items-baseline sm:gap-4">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onSubmit={onSubmit}
            className="mb-12 w-full shrink-0"
          />

          <BlogSortDropdown sortType={sortingType} onValueChange={onSortingChange} />
        </div>

        <SearchResults query={searchQuery} itemsCount={visibleBlogs.length} onSearchClear={onSearchClear} />
      </div>

      <BentoGrid className="mb-5">
        {recentBlogs.map((item, i) => {
          if (i === 0) {
            return <BentoThreeDCard key={i} {...item} />;
          }

          return <BentoGridItem {...item} key={i} maxLines={2} className={cn("[&>p:text-lg]", item.className)} />;
        })}
      </BentoGrid>

      <HoverCards items={remainingBlogs} cardClassName="p-6" />
    </section>
  );
};
