import { FC } from "react";
import { UiComponent } from "@/types";
import { allBlogs } from "@/.contentlayer/generated";
import { ToggleContent } from "@components/toggle-list";
import { RelatedBlogListItem } from "@components/related-blog-list-item";

export type MoreBlogContentProps = UiComponent<{
  related?: Array<string>;
  current: string;
}>;

export const MoreBlogContent: FC<MoreBlogContentProps> = ({ className, current, related }) => {
  const relatedBlogs = allBlogs.filter(blog => blog.slug !== current && related?.includes(blog.slug));

  return (
    relatedBlogs.length && (
      <ToggleContent heading="You may also like" defaultOpen={true} className={className}>
        <ul className="text-3xl leading-6">
          {relatedBlogs.map(blog => (
            <RelatedBlogListItem key={blog.slug} blog={blog} className="ml-4 border-b border-gray-200 py-4" />
          ))}
        </ul>
      </ToggleContent>
    )
  );
};

MoreBlogContent.displayName = "MoreBlogContent";
