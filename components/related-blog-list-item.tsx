import { FC } from "react";
import Link from "next/link";
import { UiComponent } from "@/types";
import { Blog } from "@/.contentlayer/generated";
import { AdvImage } from "@components/adv-image";

type RelatedBlogListItemProps = UiComponent<{
  blog: Blog;
  titleClassName?: string;
}>;

export const RelatedBlogListItem: FC<RelatedBlogListItemProps> = ({ blog, className, titleClassName }) => {
  return (
    <li data-testid="cmp-related-blog-list-item" className={className}>
      <Link href={blog.slug} title={blog.title}>
        <div className="flex gap-4">
          <AdvImage
            src={blog.img}
            alt={blog.title}
            width={100}
            height={100}
            className="rounded-md border border-gray-500"
          />
          <span className={titleClassName}>{blog.title}</span>
        </div>
      </Link>
    </li>
  );
};

RelatedBlogListItem.displayName = "RelatedBlogListItem";
