import { FC } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
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
import { absoluteUrl } from "@/lib/utils";
import { getCldOgImageUrl } from 'next-cloudinary';

type BlogPageParams = {
  params: {
    slug: string;
  }
};

export async function generateMetadata(
  { params }: BlogPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Find the post for the current slug
  const blogPost = allBlogs.find((blog) => blog.slug === params.slug);

  // If post not found, return minimal metadata
  if (!blogPost) {
    return {
      title: `Blog Not Found | Tushar Shukla`,
      description: "The requested blog post could not be found."
    };
  }

  // Construct image URL - replace with your actual image path pattern
  const ogImage = getCldOgImageUrl({
    src: blogPost.slug
  });

  return {
    title: `${blogPost.title} | ${blogPost.author}'s Blog`,
    description: blogPost.summary,
    authors: [
      {
        name: blogPost.author,
        url: "https://tusharshukla.dev"
      }
    ],
    keywords: blogPost.tags || [],
    creator: blogPost.author,
    publisher: blogPost.author,
    openGraph: {
      type: "article",
      title: blogPost.title,
      description: blogPost.summary,
      url: absoluteUrl(`/blog/${blogPost.slug}`),
      siteName: `${blogPost.author}'s Blog`,
      publishedTime: blogPost.date,
      modifiedTime: blogPost.lastModified,
      authors: [blogPost.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blogPost.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.summary,
      // Replace with your Twitter handle
      creator: "@theTSguy",
      images: [ogImage]
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${blogPost.slug}`)
    }
  };
}

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
