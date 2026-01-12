import { AdvImage } from '@components/adv-image';
import Link from 'next/link';
import type { FC } from 'react';
import type { Blog } from '@/.contentlayer/generated';
import type { UiComponent } from '@/types';

type RelatedBlogListItemProps = UiComponent<{
  blog: Blog;
  titleClassName?: string;
}>;

export const RelatedBlogListItem: FC<RelatedBlogListItemProps> = ({ blog, className, titleClassName }) => {
  return (
    <li data-testid="cmp-related-blog-list-item" className={className}>
      <Link href={blog.slug} title={blog.title}>
        <div className="flex gap-3">
          <AdvImage
            src={blog.img}
            alt={blog.title}
            width={100}
            height={100}
            className="max-h-max max-w-[40%] rounded-md border border-gray-500"
          />
          <span className={titleClassName}>{blog.title}</span>
        </div>
      </Link>
    </li>
  );
};

RelatedBlogListItem.displayName = 'RelatedBlogListItem';
