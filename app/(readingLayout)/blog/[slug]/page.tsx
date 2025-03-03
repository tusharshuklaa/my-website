import { FC } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { getCldOgImageUrl } from "next-cloudinary";
import { allBlogs } from "@content";
import { LampContainer } from "@ui";
import { AnimatedHeading } from "@components/text/heading";
import { GradientText } from "@components/text";
import { AnimateElement } from "@components/animate-element";
import { SnapSection } from "@components/snap-container";
import { SocialShare } from "@components/social-share";
import { TableOfContents } from "@components/table-of-contents";
import { MoreBlogContent } from "@components/more-blog-content";
import { BlogContent } from "@components/blog-content";
import { MyAvatar } from "@components/my-avatar";
import { RaiseIssueBanner } from "@components/raise-issue-banner";
import { absoluteUrl } from "@/lib/utils";

type BlogPageParams = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPageParams): Promise<Metadata> {
  // Find the post for the current slug
  const blogPost = allBlogs.find(blog => blog.slug === params.slug);

  // If post not found, return minimal metadata
  if (!blogPost) {
    return {
      title: `Blog Not Found | Tushar Shukla`,
      description: "The requested blog post could not be found.",
    };
  }

  const ogImage = getCldOgImageUrl({
    src: blogPost.slug,
  });

  return {
    title: `${blogPost.title} | ${blogPost.author}'s Blog`,
    description: blogPost.summary,
    authors: [
      {
        name: blogPost.author,
        url: "https://tusharshukla.dev",
      },
    ],
    keywords: blogPost.keywords || blogPost.tags || [],
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
          alt: blogPost.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.summary,
      creator: "@theTSguy",
      images: [ogImage],
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${blogPost.slug}`),
    },
  };
}

const BlogPage: FC<BlogPageParams> = ({ params }) => {
  const blog = allBlogs.find(post => {
    // Remove 'blog/' from the beginning of the path
    const slugWithoutPrefix = post._raw.flattenedPath.replace(/^blog\//, "");
    return slugWithoutPrefix === params.slug;
  });

  if (!blog?.body.code) {
    notFound();
  }

  return (
    <>
      <SnapSection className="m-auto max-w-sm md:max-w-5xl">
        <LampContainer className="pt-[30dvh]">
          <AnimatedHeading className="!leading-snug tracking-wide">
            <GradientText color="blue" text={blog.title} />
          </AnimatedHeading>

          <div className="flex w-full flex-col items-end justify-between gap-8 sm:flex-row sm:items-center">
            <div className="flex items-center justify-between gap-4">
              <AnimateElement delay={0.15}>
                <MyAvatar
                  src={blog.authorImg || "https://avatars.githubusercontent.com/u/7785066?v=4"}
                  alt={blog.author}
                  title={blog.authorDesc}
                  fallback={blog.authorAlias}
                />
              </AnimateElement>

              <AnimateElement delay={0.25} className="flex flex-col gap-1">
                <GradientText color="purple" text={blog.author} className="text-xl font-bold sm:text-2xl" />
                <span className="text-xs sm:max-w-[60%]">{blog.authorDesc}</span>
              </AnimateElement>
            </div>

            <AnimateElement delay={0.65} className="flex w-[calc(100%-5rem)] flex-col items-start gap-1 sm:w-auto">
              <time dateTime={blog.date}>
                <GradientText color="green" text={`Published on ${format(parseISO(blog.date), "MMMM dd, yyyy")}`} />
              </time>
              <GradientText color="purple" text={blog.readingTimeString} className="text-sm" />
            </AnimateElement>
          </div>
        </LampContainer>
      </SnapSection>

      <section className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[10rem_minmax(60ch,_7fr)_3fr] sm:gap-4">
        <BlogContent blogCode={blog.body.code} />

        <aside className="order-1 px-4 sm:order-none sm:px-2">
          <div className="sticky top-32 mt-20 flex h-full max-h-none flex-col items-start gap-4 overflow-y-auto sm:max-h-[calc(98dvh-8rem)]">
            <TableOfContents tocs={blog.toc} />

            <MoreBlogContent related={blog.related} current={blog.slug} />
          </div>
        </aside>
      </section>

      <RaiseIssueBanner issueTitle={blog.title} issueSlug={blog.slug} />

      <SocialShare />
    </>
  );
};

export default BlogPage;
