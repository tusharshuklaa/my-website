import { FC } from "react";
import Link from "next/link";
import { UiComponent } from "@/types";
import { allBlogs } from "@/.contentlayer/generated";
import { AdvImage } from "@components/adv-image";
import { ToggleContent } from "@components/toggle-list";

type MoreBlogContentProps = UiComponent<{
  related?: Array<string>;
  current: string;
}>;

export const MoreBlogContent: FC<MoreBlogContentProps> = ({ className, current, related }) => {
  const relatedBlogs = allBlogs.filter(blog => blog.slug !== current && related?.includes(blog.slug));

  return (
    relatedBlogs.length && (
      <ToggleContent heading="You may also like" defaultOpen={true} className={className}>
        <ul className="text-3xl leading-6">
          {relatedBlogs.map(blog => {
            return (
              <li key={blog.slug} className="ml-4 border-b border-gray-200 py-4">
                <Link href={blog.slug} title={blog.title}>
                  <div className="flex w-3/4 gap-4">
                    <AdvImage
                      src={blog.img}
                      alt={blog.title}
                      width={100}
                      height={100}
                      className="rounded-md border border-gray-500"
                    />
                    <span>{blog.title}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </ToggleContent>
    )
  );
};

MoreBlogContent.displayName = "MoreBlogContent";
