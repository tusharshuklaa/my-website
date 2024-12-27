"use client";

import { FC, useMemo, useState } from 'react';
import { compareDesc, format, parseISO } from 'date-fns';
import { SearchX } from 'lucide-react';
import { allBlogs } from '@content';
import { BentoGrid, BentoGridItem, Button, HoverCards, PlaceholdersAndVanishInput } from '@ui';
import { cn } from '@/lib/utils';
import { BlogHero } from '@components/blog-hero';
import { BentoThreeDCard } from '@components/bento-three-d-card';
import { GradientText } from '@components/text';
import { LuminenceSkeleton, AnimatedContentSkeleton, ChatSkeleton, ImageSkeleton } from '@components/bento-skeleton';

const placeholders = [
  "react",
  "performance",
  "css art",
  "productivity",
];

const AllBlogsPage: FC = () => {
  // Pick blogs that are published
  const blogs = allBlogs
  .filter(blog => blog.published)
  .map(blog => ({
    ...blog,
    date: format(parseISO(blog.date), 'LLLL d, yyyy')
  }))
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const [visibleBlogs, setVisibleBlogs] = useState(blogs);
  const [searchQuery, setSearchQuery] = useState("");

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.querySelector('input')?.value;

    if (value) {
      setSearchQuery(value);
      const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(value.toLowerCase()));
      setVisibleBlogs(filteredBlogs);
    };
  };

  const onSearchClear = () => {
    setSearchQuery("");
    setVisibleBlogs(blogs);
  };

  return (
    <section className="relative mt-20 md:mt-40 max-w-xs md:max-w-4xl mx-auto">
      <BlogHero text="My Blogs" />

      <div className="flex flex-col items-center justify-between mb-10 md:mb-20 mt-3 md:mt-8 min-h-44">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onSubmit={onSubmit}
          className="mb-12 w-full"
        />

        {
          searchQuery?.length > 0 && (
            <h3 className="flex flex-col items-center gap-4">
              <span>Found <GradientText text={visibleBlogs.length} /> blog{visibleBlogs.length > 1 ? "s" : ""} for your search query "<GradientText text={searchQuery} />"</span>

              <Button type="button" variant="outline" onClick={onSearchClear} className="flex gap-2 rounded-full">
                <span>Clear Search</span>
                <SearchX className="w-4 h-4" />
              </Button>
            </h3>
          )
        }
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

      <HoverCards items={remainingBlogs} />
    </section>
  );
};

export default AllBlogsPage;
