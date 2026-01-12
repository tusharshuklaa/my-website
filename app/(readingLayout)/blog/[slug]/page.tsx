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
import { BlogViewCounter } from "@components/blog-view-counter";
import { MoreBlogContentMobile } from "@components/more-blog-content-mobile";
import { SupportButton } from "@components/support-button";
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
    src: blogPost.img,
    width: 1200,
    height: 630,
    crop: "fill",
    gravity: "auto",
    overlays: [
      {
        publicId: "overlay",
        width: 1200,
        height: 630,
        effects: [
          {
            colorize: "100,co_black",
          },
          {
            opacity: 50,
          },
        ],
      },
      {
        text: {
          text: blogPost.title,
          fontFamily: "Georgia",
          fontSize: 60,
          fontWeight: "bold",
          letterSpacing: -2,
          lineSpacing: -10,
          color: "white",
        },
        position: {
          x: 80,
          y: 100,
        },
        width: 1040,
        crop: "fit",
      },
      {
        text: {
          text: blogPost.summary.substring(0, 120) + (blogPost.summary.length > 120 ? "..." : ""),
          fontFamily: "Georgia",
          fontSize: 20,
          fontWeight: "normal",
          lineSpacing: 3,
          color: "#d1d5db",
        },
        position: {
          x: 80,
          y: 380,
        },
        width: 1040,
        crop: "fit",
      },
      {
        text: {
          text: `by ${blogPost.author}`,
          fontFamily: "Georgia",
          fontSize: 16,
          fontWeight: "normal",
          color: "#9ca3af",
        },
        position: {
          x: 80,
          y: 590,
        },
      },
    ],
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

              <div className="flex w-full items-center justify-between gap-2">
                <BlogViewCounter slug={blog.slug} />
                <GradientText color="purple" text={blog.readingTimeString} className="text-sm" />
              </div>
            </AnimateElement>
          </div>
        </LampContainer>
      </SnapSection>

      <section className="m-auto mt-2 grid max-w-readable grid-cols-1 gap-2 sm:grid-cols-[10rem_minmax(60ch,_6fr)_3fr] sm:gap-4">
        <BlogContent blogCode={blog.body.code} />

        <aside className="order-1 flex px-4 text-slate-400 sm:order-none sm:justify-center sm:pl-4 sm:pr-4">
          <div className="sticky top-32 mt-20 flex h-full max-h-none w-[80%] flex-col items-start gap-4 overflow-y-auto overscroll-contain sm:max-h-[calc(98dvh-8rem)]">
            <TableOfContents tocs={blog.toc} />

            <MoreBlogContent related={blog.related} current={blog.slug} className="hidden sm:block" />

            <div className="mt-8 hidden sm:block">
              <SupportButton />
            </div>
          </div>
        </aside>
      </section>

      <MoreBlogContentMobile related={blog.related} current={blog.slug} />

      <div className="my-32 flex flex-col items-center px-4 sm:hidden">
        <span className="mb-8 text-center text-lg">If you like my work, consider supporting me.</span>
        <SupportButton />
      </div>

      <RaiseIssueBanner issueTitle={blog.title} />

      <SocialShare />
    </>
  );
};

export default BlogPage;
