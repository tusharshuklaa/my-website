import { FC } from 'react';
import { UiComponent } from "@/types";
import { allBlogs } from '@/.contentlayer/generated';
import { PrettyLink } from '@components/pretty-link';
import { ToggleContent } from '@components/toggle-list';

type MoreBlogContentProps = UiComponent<{
  related?: Array<string>;
  current: string;
}>;

export const MoreBlogContent: FC<MoreBlogContentProps> = ({ className, current, related }) => {
  const otherBlogs = allBlogs.filter(blog => blog.slug !== current);
  const relatedBlogs = otherBlogs.filter(blog => related?.includes(blog.slug));

  const topFiveUniqueBlogs = Array.from(new Set([...otherBlogs, ...relatedBlogs].slice(0, 5)));

  return topFiveUniqueBlogs.length && (
    <ToggleContent heading='You may also like' defaultOpen={true} className={className}>
      <ul className="list-disc text-2xl">
        {
          topFiveUniqueBlogs.map((blog) => {
            return (
              <li key={blog.slug} className="ml-4">
                <PrettyLink
                  href={blog.slug}
                  title={blog.title}
                  isExternal={false}
                  minimal={true}
                >
                  {blog.title}
                </PrettyLink>
              </li>
            );
          })
        }
      </ul>
    </ToggleContent>
  );
};

MoreBlogContent.displayName = 'MoreBlogContent';
