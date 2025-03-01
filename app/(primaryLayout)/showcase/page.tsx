"use client";

import { FC } from "react";
import ShowcaseData from "@/data/showcase.json";
import { Showcase } from "@/components/showcase-slider";
import { ArticleHero } from "@/components/blog-hero";
import { SearchResults } from "@/components/search-results";
import { PlaceholdersAndVanishInput, HoverCards } from "@ui";
import { useMdxContent } from "@/hooks/use-mdx-content";

const placeholders = ["css art", "game", "codepen", "github gist"];

const ShowcasePage: FC = () => {
  const { items, onSubmit, onSearchClear, onTagClick, searchQuery } = useMdxContent(ShowcaseData.showcase);
  const showcaseItems = items as Array<Showcase>;

  return (
    <section className="relative mx-auto mt-20 max-w-xs md:mt-40 md:max-w-4xl">
      <ArticleHero text="Showcase" />

      <div className="mb-10 mt-3 flex min-h-44 flex-col items-center justify-between md:mb-20 md:mt-8">
        <PlaceholdersAndVanishInput placeholders={placeholders} onSubmit={onSubmit} className="mb-12 w-full" />

        <SearchResults query={searchQuery} itemsCount={items.length} onSearchClear={onSearchClear} />
      </div>

      <HoverCards items={showcaseItems} onTagClick={onTagClick} cardClassName="p-6" titleClassName="h-12" />
    </section>
  );
};

export default ShowcasePage;
