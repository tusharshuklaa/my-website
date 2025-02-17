import { FC } from 'react';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { allBlogs } from '@content';
import { AnimatedHeading } from '@components/text/heading';
import { GradientText } from '@components/text';
import { AnimateElement } from '@components/animate-element';
import { LampContainer } from '@ui';
import { SnapSection } from '@components/snap-container';
import { Mdx } from '@components/mdx';

type BlogPageParams = {
  params: {
    slug: string;
  }
};

const BlogPage: FC<BlogPageParams> = ({ params }) => {
  const blog = allBlogs.find((post) => {
    // Remove 'blog/' from the beginning of the path
    const slugWithoutPrefix = post._raw.flattenedPath.replace(/^blog\//, '');
    return slugWithoutPrefix === params.slug;
  });

  if (!blog?.body.code) {
    notFound();
  }

  return (
    <>
      <SnapSection className="max-w-sm md:max-w-5xl m-auto pt-20">
        <LampContainer>
          <AnimatedHeading className="tracking-wide !leading-snug">
            <GradientText color="blue" text={blog.title} />
          </AnimatedHeading>

          <AnimateElement delay={0.5}>
            <time dateTime={blog.date} className="mt-8 mb-2 block text-gray-600 font-bold text-xl sm:text-3xl">
              <GradientText color="purple" text={format(parseISO(blog.date), 'MMMM dd, yyyy')} />
            </time>
          </AnimateElement>

          <AnimateElement delay={0.5}>
            <GradientText color="indigo" text={blog.readingTimeString} className="mt-8 mb-2 block text-gray-600 font-bold text-xl sm:text-2xl" />
          </AnimateElement>
        </LampContainer>
      </SnapSection>

      <article className="mt-2 max-w-5xl px-4 mx-auto text-base sm:text-xl leading-relaxed">
        <Mdx code={blog.body.code} />
      </article>
    </>
  );
};

export default BlogPage;
