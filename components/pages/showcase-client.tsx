"use client";

import { useMdxContent } from "@/hooks/use-mdx-content";
import { FC } from "react";
import { ArticleHero } from "../blog-hero";
import { SearchResults } from "../search-results";
import { Showcase } from "../showcase-slider";
import ShowcaseData from "@/data/showcase.json";
import { PlaceholdersAndVanishInput, HoverCards } from "@ui";

const placeholders = ["css art", "game", "codepen", "github gist"];

export const ShowcaseClientPage: FC = () => {
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
