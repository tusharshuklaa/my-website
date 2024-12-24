import { FC } from 'react';
import { notFound } from 'next/navigation';
import { getMDXComponent } from 'next-contentlayer2/hooks';
import { format, parseISO } from 'date-fns';
import { allBlogs } from '@content';

type BlogPageParams = {
  params: {
    slug: string;
  }
};

const BlogPage: FC<BlogPageParams> = ({ params }) => {
  const blog = allBlogs.find(blog => blog._raw.flattenedPath === params.slug);

  if (!blog?.body.code) {
    notFound();
  }

  const Content = getMDXComponent(blog.body.code);

  return (
    <article className="container mx-auto p-4">
      <h1>{blog.title}</h1>
      <time dateTime={blog.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(blog.date), 'LLLL d, yyyy')}
      </time>
      <Content />
    </article>
  );
};

export default BlogPage;
