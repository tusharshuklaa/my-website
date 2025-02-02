import { useState } from "react";
import { Blog, Coding, Gadgets, Showcase, Software } from "@/.contentlayer/generated";

export const useMdxContent = (content: Array<Coding | Gadgets | Software | Blog | Showcase >) => {
  const [visibleItems, setVisibleItems] = useState(content);
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.querySelector('input')?.value;

    if (value) {
      setSearchQuery(value);
      const filteredItems = content.filter(item => {
        const title = item.title.toLowerCase();
        const summary = 'summary' in item ? item.summary.toLowerCase() : '';
        const tags = item.tags.map(tag => tag.toLowerCase()).join(" ");
        const lowercaseValue = value.toLowerCase();

        return title.includes(lowercaseValue) || summary.includes(lowercaseValue) || tags.includes(value);
      });
      setVisibleItems(filteredItems);
    };
  };

  const onSearchClear = () => {
      setSearchQuery("");
      setVisibleItems(content);
    };
  
  const onTagClick = (tag: string) => {
    setSearchQuery(tag);
    const filteredItems = content.filter(item => item.tags.includes(tag));
    setVisibleItems(filteredItems);
  };

  return {
    items: visibleItems,
    searchQuery,
    onSubmit,
    onSearchClear,
    onTagClick,
  };
};
