import { FC } from 'react';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { allBlogs } from '@content';
import { AnimatedHeading } from '@components/text/heading';
import { GradientText } from '@components/text';
import { AnimateElement } from '@components/animate-element';
import { Avatar, AvatarFallback, AvatarImage, LampContainer } from '@ui';
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

          <div className="flex justify-between items-end mt-20 w-full">
            <div className="flex gap-4 justify-between items-center">
              <AnimateElement delay={0.15}>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={blog.authorImg || "https://avatars.githubusercontent.com/u/7785066?v=4"} alt={blog.author} title={blog.authorDesc} />
                  <AvatarFallback>{ blog.authorAlias }</AvatarFallback>
                </Avatar>
              </AnimateElement>

              <AnimateElement delay={0.25} className="flex flex-col gap-1">
                <GradientText color="purple" text={blog.author} className="font-bold text-xl sm:text-2xl" />

                <time dateTime={blog.date}>
                  <GradientText color="purple" text={`Published on ${format(parseISO(blog.date), 'MMMM dd, yyyy')}`} />
                </time>
              </AnimateElement>
            </div>

            <AnimateElement delay={0.65}>
              <GradientText color="green" text={blog.readingTimeString} className="text-sm" />
            </AnimateElement>
          </div>
        </LampContainer>
      </SnapSection>

      <article className="mt-2 max-w-5xl px-4 mx-auto text-base leading-relaxed">
        <Mdx code={blog.body.code} />
      </article>
    </>
  );
};

export default BlogPage;
