import { FC } from 'react';
import { compareDesc, format, parseISO } from 'date-fns'
import { allBlogs, Blog } from '@content';
import { Card, CardDescription, CardTitle } from '@ui';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

const BlogCard: FC<Blog> = (blog: Blog) => {
  return (
    <Card>
      <CardTitle>
        <Link href={blog.url}>
          {blog.title}
        </Link>
      </CardTitle>
      <CardDescription>{blog.summary}</CardDescription>
      <time dateTime={blog.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(blog.date), 'LLLL d, yyyy')}
      </time>
      <p>{blog.summary}</p>
      <p>{blog.published}</p>
    </Card>
  );
};

const AllBlogsPage: FC = () => {
  const blogs = allBlogs.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-4">
        {
          blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))
        }
      </div>
    </div>
  );
};

export default AllBlogsPage;
