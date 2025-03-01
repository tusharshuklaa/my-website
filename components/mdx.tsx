import { FC } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { AnimatedHeading } from "./text/heading";
import { GradientText, HighlightText } from "./text";
import { cn } from "@/lib/utils";
import { PrettyLink } from "@components/pretty-link";
import { ExternalEmbed } from "@components/external-embed";
import { MultiColumn } from "@components/multi-column";
import { AdvImage } from "./adv-image";

type MdxProps = {
  code: string;
};

const components: MDXComponents = {
  // Heading
  h1: ({ ...props }) => {
    return (
      <AnimatedHeading {...props} className={cn("mt-4 !leading-snug tracking-wide", props.className)}>
        <GradientText text={props.children} color="blue" />
      </AnimatedHeading>
    );
  },
  h2: ({ ...props }) => (
    <h2 {...props} className={cn("mb-2 mt-16 text-4xl !leading-snug tracking-wide", props.className)}>
      <GradientText text={props.children} color="purple" />
    </h2>
  ),
  h3: ({ ...props }) => (
    <h3 {...props} className={cn("mb-2 mt-8 text-2xl !leading-snug tracking-wide", props.className)}>
      <GradientText text={props.children} color="green" />
    </h3>
  ),
  h4: ({ ...props }) => (
    <h4 {...props} className={cn("text-xl font-bold !leading-snug tracking-wide", props.className)}></h4>
  ),
  // Paragraph
  p: ({ ...props }) => (
    <span {...props} className={cn("mb-4 text-justify leading-8 tracking-wider", props.className)}></span>
  ),
  // List
  ol: ({ ...props }) => (
    <ol
      {...props}
      className={cn("mb-4 ml-5 mt-2 list-decimal [&:has(>li>label>input[type='checkbox'])]:list-none", props.className)}
    ></ol>
  ),
  ul: ({ ...props }) => (
    <ul
      {...props}
      className={cn("mb-4 ml-5 mt-2 list-disc [&:has(>li>label>input[type='checkbox'])]:list-none", props.className)}
    ></ul>
  ),
  // List Item
  li: ({ ...props }) => (
    <li
      {...props}
      className={cn(
        "mb-4 pl-2 text-justify leading-8 tracking-wider [&>ol]:mb-2 [&>ol]:mt-2 [&>ol]:list-inside [&>ul]:mb-2 [&>ul]:mt-2 [&>ul]:list-inside",
        props.className,
      )}
    ></li>
  ),
  // Link
  a: ({ ...props }) => {
    const href = props.href || "";

    if (props.className?.includes("subheading-anchor")) {
      return <Link {...props} href={href} />;
    }

    const target = props.href?.startsWith("http") ? "_blank" : "_self";
    const title = props.title || "";

    return <PrettyLink {...props} href={href} target={target} title={title} />;
  },
  // Image
  img: ({ ...props }) => {
    const altText = props.alt || props.title || "";

    return (
      <figure className="mx-auto mb-12 mt-8 w-4/5 overflow-hidden rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
        <AdvImage src={props.src || ""} width="500" height="500" alt={altText} className="h-full w-full object-cover" />
        {altText && (
          <figcaption className="py-2 text-center text-sm text-gray-600 dark:text-gray-400">{altText}</figcaption>
        )}
      </figure>
    );
  },
  // Code
  code: ({ ...props }) => (
    <code
      {...props}
      className={cn(
        "relative inline-block translate-y-1 overflow-auto rounded border border-gray-200 px-1 py-0 font-mono text-sm shadow dark:border-gray-700 [pre_&]:my-4 [pre_&]:p-4 [pre_&]:pt-10",
        "before:[pre_&[data-language]]:absolute before:[pre_&[data-language]]:left-0 before:[pre_&[data-language]]:right-0 before:[pre_&[data-language]]:top-0 before:[pre_&[data-language]]:content-[attr(data-language)]",
        "before:[pre_&[data-language]]:bg-black/50 before:[pre_&[data-language]]:p-2 before:[pre_&[data-language]]:text-xs before:[pre_&[data-language]]:leading-none",
        props.className,
      )}
    ></code>
  ),
  // Blockquote
  blockquote: ({ ...props }) => (
    <blockquote
      className={cn(
        "relative my-8 space-y-2 rounded-r-lg border-l-4 border-blue-500 bg-gray-50 py-4 pl-6 pr-8 text-gray-700 dark:border-blue-400 dark:bg-gray-800/50 dark:text-gray-200 [&:has(footer)]:pb-12 [&:not(:has(footer))]:pb-4",
        "[&>p:first-of-type]:before:text-4xl [&>p:first-of-type]:before:text-blue-500 [&>p:first-of-type]:before:content-['“'] [&>p:first-of-type]:before:dark:text-blue-400 [&>p]:text-lg [&>p]:font-medium [&>p]:leading-relaxed",
        "[&>p:first-of-type]:before:mr-1 [&>p:first-of-type]:before:font-serif [&>p:first-of-type]:before:leading-3 [&>p:last-of-type]:after:ml-1 [&>p:last-of-type]:after:font-serif [&>p:last-of-type]:after:text-4xl [&>p:last-of-type]:after:leading-3 [&>p:last-of-type]:after:text-blue-500 [&>p:last-of-type]:after:content-['”'] [&>p:last-of-type]:after:dark:text-blue-400",
        "before:absolute before:right-1 before:top-8 before:font-serif before:text-7xl before:leading-3 before:text-blue-500 before:opacity-50 before:content-['”'] before:dark:text-blue-400",
        "[&>footer]:before:non-italic [&>footer]:absolute [&>footer]:bottom-2 [&>footer]:right-4 [&>footer]:text-right [&>footer]:text-sm [&>footer]:font-medium [&>footer]:italic [&>footer]:text-gray-600 [&>footer]:before:mr-1 [&>footer]:before:text-blue-500 [&>footer]:before:content-['—'] [&>footer]:dark:text-gray-400 [&>footer]:before:dark:text-blue-400 sm:[&>footer]:bottom-4 sm:[&>footer]:text-left",
        props.className,
      )}
      {...props}
    ></blockquote>
  ),
  // Table
  table: ({ ...props }) => (
    <div className="w-full overflow-x-auto">
      <table
        {...props}
        className="my-4 w-full border-collapse overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        {props.children}
      </table>
    </div>
  ),
  thead: ({ ...props }) => (
    <thead className="border-b border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
      {props.children}
    </thead>
  ),
  tbody: ({ ...props }) => (
    <tbody className="divide-y divide-gray-200 bg-white text-gray-700 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-300">
      {props.children}
    </tbody>
  ),
  tr: ({ ...props }) => (
    <tr className="group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">{props.children}</tr>
  ),
  th: ({ ...props }) => (
    <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider transition-colors group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50">
      {props.children}
    </th>
  ),
  td: ({ ...props }) => (
    <td className="whitespace-nowrap px-6 py-4 transition-colors group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50">
      {props.children}
    </td>
  ),
  // Horizontal Rule
  hr: ({ ...props }) => (
    <hr
      {...props}
      className="mb-4 h-[1px] w-full border-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
    />
  ),
  // Strong
  strong: ({ ...props }) => <strong {...props}></strong>,
  // Emphasis
  em: ({ ...props }) => (
    <em {...props}>
      <HighlightText>{props.children}</HighlightText>
    </em>
  ),
  // Delete
  del: ({ ...props }) => <del {...props}></del>,
  // Inline Code
  inlineCode: ({ ...props }) => <code {...props}></code>,
  // Preformatted Text
  pre: ({ ...props }) => <pre {...props}></pre>,
  input: ({ ...props }) => {
    if (props.type === "checkbox") {
      return (
        <label className="relative inline-flex items-center gap-2">
          <input
            {...props}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <svg
            className="pointer-events-none absolute left-0 h-5 w-5 stroke-white stroke-[3] opacity-0 peer-checked:opacity-100"
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" fill="none" />
          </svg>
          <span className="cursor-pointer select-none text-gray-700 hover:text-gray-900">{props.children}</span>
        </label>
      );
    }

    return <input {...props} />;
  },
  mark: ({ ...props }) => <mark {...props} className={cn("bg-violet-900", props.className)}></mark>,
  "external-embed": props => <ExternalEmbed {...props} />,
  MultiColumn,
};

export const Mdx: FC<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
};

Mdx.displayName = "MdxComponent";
