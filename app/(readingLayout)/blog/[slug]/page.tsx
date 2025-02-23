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
import { SocialShare } from '@/components/social-share';

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
      <SnapSection className="max-w-sm md:max-w-5xl m-auto">
        <LampContainer className="pt-[30dvh]">
          <AnimatedHeading className="tracking-wide !leading-snug">
            <GradientText color="blue" text={blog.title} />
          </AnimatedHeading>

          <div className="flex justify-between items-end sm:items-center w-full flex-col sm:flex-row gap-8">
            <div className="flex gap-4 justify-between items-center">
              <AnimateElement delay={0.15}>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={blog.authorImg || "https://avatars.githubusercontent.com/u/7785066?v=4"} alt={blog.author} title={blog.authorDesc} />
                  <AvatarFallback>{ blog.authorAlias }</AvatarFallback>
                </Avatar>
              </AnimateElement>

              <AnimateElement delay={0.25} className="flex flex-col gap-1">
                <GradientText color="purple" text={blog.author} className="font-bold text-xl sm:text-2xl" />
                <span className="text-xs sm:max-w-[60%]">{blog.authorDesc}</span>
              </AnimateElement>
            </div>

            <AnimateElement delay={0.65} className="flex flex-col gap-1 w-[calc(100%-5rem)] sm:w-auto items-start">
              <time dateTime={blog.date}>
                <GradientText color="green" text={`Published on ${format(parseISO(blog.date), 'MMMM dd, yyyy')}`} />
              </time>
              <GradientText color="purple" text={blog.readingTimeString} className="text-sm" />
            </AnimateElement>
          </div>
        </LampContainer>
      </SnapSection>

      <article className="mt-2 max-w-5xl px-4 mx-auto text-base leading-relaxed">
        <Mdx code={blog.body.code} />
      </article>

      <SocialShare />
    </>
  );
};

export default BlogPage;
