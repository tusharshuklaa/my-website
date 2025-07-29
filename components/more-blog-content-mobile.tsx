import { FC } from "react";
import { allBlogs } from "@/.contentlayer/generated";
import { MoreBlogContentProps } from "@components/more-blog-content";
import { GradientText } from "@components/text";
import { RelatedBlogListItem } from "@components/related-blog-list-item";
import { cn } from "@/lib/utils";

export const MoreBlogContentMobile: FC<MoreBlogContentProps> = ({ className, current, related }) => {
  const relatedBlogs = allBlogs.filter(blog => blog.slug !== current && related?.includes(blog.slug));
  const containerClasses = cn(className, "block sm:hidden px-4 mt-16");

  return (
    relatedBlogs.length && (
      <section className={containerClasses}>
        <GradientText color="darkBlue" className="font-dongle text-6xl font-bold" text="You may also like" />

        <ul className="text-3xl leading-6">
          {relatedBlogs.map(blog => (
            <RelatedBlogListItem key={blog.slug} blog={blog} className="py-4" titleClassName="text-lg" />
          ))}
        </ul>
      </section>
    )
  );
};

MoreBlogContentMobile.displayName = "MoreBlogContentMobile";
