import { FC } from 'react';
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";

type ToggleContentProps = BasicUiComponent<{
  heading: string;
  defaultOpen?: boolean;
}>;

export const ToggleContent: FC<ToggleContentProps> = ({ children, className, heading, defaultOpen }) => {
  const toggleContentClasses = cn(
    "marker:text-xl font-dongle cursor-pointer",
    className
  );

  // Added punctuation space to add space after marker in the summary - U+2008 as there is no other way to do it in CSS due to browser support
  return (
    <details data-testid="cmp-toggle-list" className={toggleContentClasses} open={defaultOpen}>
      <summary className="text-3xl font-bold">{heading.padStart(18, ' ')}</summary>
      <nav className="pl-6">
        {children}
      </nav>
    </details>
  );
};

ToggleContent.displayName = 'ToggleContent';
