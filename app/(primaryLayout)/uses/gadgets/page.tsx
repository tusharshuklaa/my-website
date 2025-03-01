"use client";

import { FC } from "react";
import { allGadgets, Gadgets } from "@content";
import { DialogHoverCards, PlaceholdersAndVanishInput } from "@ui";
import { ArticleHero } from "@components/blog-hero";
import { SearchResults } from "@components/search-results";
import { useMdxContent } from "@/hooks/use-mdx-content";

const placeholders = ["laptop", "keyboard", "mouse", "monitor"];

const UsesGadtesPage: FC = () => {
  const { items, onSubmit, onSearchClear, onTagClick, searchQuery } = useMdxContent(allGadgets);
  const codingItems = items as Array<Gadgets>;

  return (
    <section className="relative mx-auto mt-20 max-w-xs md:mt-40 md:max-w-4xl">
      <ArticleHero text="Gadgets" />

      <div className="mb-10 mt-3 flex min-h-44 flex-col items-center justify-between md:mb-20 md:mt-8">
        <PlaceholdersAndVanishInput placeholders={placeholders} onSubmit={onSubmit} className="mb-12 w-full" />

        <SearchResults query={searchQuery} itemsCount={items.length} onSearchClear={onSearchClear} />
      </div>

      <DialogHoverCards items={codingItems} onTagClick={onTagClick} cardClassName="p-6" />
    </section>
  );
};

export default UsesGadtesPage;
