import { FC } from "react";
import Link, { LinkProps } from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { Underline } from "@components/text";

type PrettyLinkProps = LinkProps &
  BasicUiComponent<{
    target?: "_blank" | "_self" | "_parent" | "_top";
    title: string;
    isExternal?: boolean;
    minimal?: boolean;
  }>;

export const PrettyLink: FC<PrettyLinkProps> = ({
  children,
  className,
  isExternal = true,
  minimal = false,
  ...props
}) => {
  const prettyLinkClasses = cn(
    "group inline-flex relative before:[&[title]]:content-[attr(title)] before:[&[title]]:absolute before:[&[title]]:hidden hover:before:[&[title]]:block before:[&[title]]:bg-gray-800 before:[&[title]]:text-white before:[&[title]]:px-2 before:[&[title]]:py-1 before:[&[title]]:rounded before:[&[title]]:text-sm before:[&[title]]:-top-8 before:[&[title]]:left-1/2 before:[&[title]]:-translate-x-1/2 before:[&[title]]:whitespace-nowrap before:[&[title]]:z-10",
    className,
  );

  return (
    <Link {...props} href={props.href} className={prettyLinkClasses}>
      <Underline minimal={minimal}>{children}</Underline>
      {isExternal && (
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
};

PrettyLink.displayName = "PrettyLink";
