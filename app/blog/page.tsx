"use client";

import { FC } from 'react';
import { compareDesc, format, parseISO } from 'date-fns';

import { allBlogs } from '@content';
import { BentoGrid, BentoGridItem, HoverCards, PlaceholdersAndVanishInput } from '@ui';
import { cn } from '@/lib/utils';
import { BlogHero } from '@components/blog-hero';
import { BentoThreeDCard } from '@components/bento-three-d-card';
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
  const recentBlogs = blogs.slice(0, 5).map((blog, index) => {
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
        // Case for 3d card
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <section className="relative mt-40 max-w-4xl mx-auto">
      <BlogHero text="My Blogs" />

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        className="mb-32 mt-8"
      />

      <BentoGrid className="mb-4">
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

      <HoverCards items={blogs.splice(5)} />
    </section>
  );
};

export default AllBlogsPage;
