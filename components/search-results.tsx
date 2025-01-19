import { FC } from 'react';
import { SearchX } from 'lucide-react';
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { GradientText } from '@components/text';
import { Button } from '@ui';

type SearchResultsProps = UiComponent<{
  query: string;
  itemsCount: number;
  onSearchClear: () => void;
}>;

export const SearchResults:FC<SearchResultsProps> = ({ className, itemsCount, onSearchClear, query }) => {
  const searchResultsClasses = cn("flex flex-col items-center gap-4", className);

  return query.length > 0 && (
    <h3 data-testid="cmp-search-results" className={searchResultsClasses}>
      <span>Found <GradientText text={itemsCount} /> item{itemsCount > 1 ? "s" : ""} for your search query "<GradientText text={query} />"</span>

      <Button type="button" variant="outline" onClick={onSearchClear} className="flex gap-2 rounded-full">
        <span>Clear Search</span>
        <SearchX className="w-4 h-4" />
      </Button>
    </h3>
  );
};

SearchResults.displayName = 'SearchResults';