'use client';

import { ProductItem } from '@components/ui';
import { allBlogs } from '@content';

const getRecentBlogs = (limit: number) =>
  allBlogs
    .filter(blog => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

export function NavbarRecentBlogsPanel() {
  const recentBlogs = getRecentBlogs(4);

  return (
    <div className="grid grid-cols-2 gap-10 p-4 text-sm">
      {recentBlogs.map(blog => (
        <ProductItem key={blog.title} title={blog.title} href={blog.url} src={blog.img} description={blog.summary} />
      ))}
    </div>
  );
}
