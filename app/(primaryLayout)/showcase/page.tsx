'use client';

import { FC } from "react";
import { Metadata } from "next";
import ShowcaseData from "@/data/showcase.json";
import { Showcase } from "@/components/showcase-slider";
import { ArticleHero } from "@/components/blog-hero";
import { SearchResults } from "@/components/search-results";
import { PlaceholdersAndVanishInput, HoverCards } from "@ui";
import { useMdxContent } from "@/hooks/use-mdx-content";

export const metadata: Metadata = {
  title: "Collection of useful, fun and informative code snippets, github repositories, tools, codepens and more | tusharshukla",
  description:
    "tusharshukla.dev - A collection of useful, fun and informative code snippets, github repositories, tools, codepens and more.",
  keywords: [
    "tushar shukla",
    "code collection",
    "tools collection",
    "code snippets",
    "github repositories",
    "codepens",
    "useful code",
    "fun code",
    "informative code",
    "css art",
    "side projects",
    "web development",
    "frontend",
  ],
  openGraph: {
    url: "https://tusharshukla.dev",
    type: "website",
    title: "Collection of useful, fun and informative code snippets, github repositories, tools, codepens and more | tusharshukla",
    description:
      "tusharshukla.dev - A collection of useful, fun and informative code snippets, github repositories, tools, codepens and more.",
    images: [
      {
        url: "https://tusharshukla.dev/images/tusharshukla_website.png",
        width: 1200,
        height: 630,
        alt: "tusharshukla"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Collection of useful, fun and informative code snippets, github repositories, tools, codepens and more | tusharshukla",
    description:
      "tusharshukla.dev - A collection of useful, fun and informative code snippets, github repositories, tools, codepens and more.",
    creator: "@theTSguy",
    site: "@theTSguy",
    images: [
      {
        url: "https://tusharshukla.dev/images/tusharshukla_website.png",
        width: 1200,
        height: 630,
        alt: "tusharshukla"
      }
    ]
  },
  alternates: {
    canonical: "https://tusharshukla.dev"
  }
};

const placeholders = [
  "css art",
  "game",
  "codepen",
  "github gist",
];

const ShowcasePage: FC = () => {
  const { items, onSubmit, onSearchClear, onTagClick, searchQuery } = useMdxContent(ShowcaseData.showcase);
  const showcaseItems = items as Array<Showcase>;

  return (
    <section className="relative mt-20 md:mt-40 max-w-xs md:max-w-4xl mx-auto">
      <ArticleHero text="Showcase" />

      <div className="flex flex-col items-center justify-between mb-10 md:mb-20 mt-3 md:mt-8 min-h-44">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onSubmit={onSubmit}
          className="mb-12 w-full"
        />

        <SearchResults query={searchQuery} itemsCount={items.length} onSearchClear={onSearchClear} />
      </div>

      <HoverCards items={showcaseItems} onTagClick={onTagClick} cardClassName='p-6' titleClassName="h-12" />
    </section>
  );
};

export default ShowcasePage;
