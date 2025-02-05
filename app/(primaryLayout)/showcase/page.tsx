'use client';

import { FC } from "react";
import ShowcaseData from "@/data/showcase.json";
import { Showcase } from "@/components/showcase-slider";
import { ArticleHero } from "@/components/blog-hero";
import { SearchResults } from "@/components/search-results";
import { PlaceholdersAndVanishInput, HoverCards } from "@ui";
import { useMdxContent } from "@/hooks/use-mdx-content";

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
