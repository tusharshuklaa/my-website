import { FC } from 'react';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { AnimatedHeading } from './text/heading';
import { GradientText, HighlightText } from './text';
import { cn } from '@/lib/utils';
import { PrettyLink } from '@components/pretty-link';
import { ExternalEmbed } from '@components/external-embed';
import { MultiColumn } from '@components/multi-column';

type MdxProps = {
  code: string;
};

const components: MDXComponents = {
  // Heading
  h1: ({ ...props }) => {
    return (
      <AnimatedHeading {...props} className={cn("tracking-wide !leading-snug mt-4", props.className)}>
        <GradientText text={props.children} color="blue" />
      </AnimatedHeading>
    );
  },
  h2: ({ ...props }) => (
    <h2 {...props} className={cn("tracking-wide !leading-snug text-4xl mt-16 mb-2", props.className)}>
      <GradientText text={props.children} color="purple" />
    </h2>
  ),
  h3: ({ ...props }) => (
    <h3 {...props} className={cn("tracking-wide !leading-snug text-2xl mt-8 mb-2", props.className)}>
      <GradientText text={props.children} color="green" />
    </h3>
  ),
  h4: ({ ...props }) => (
    <h4 {...props} className={cn("tracking-wide !leading-snug text-xl font-bold", props.className)}></h4>
  ),
  // Paragraph
  p: ({ ...props }) => (
    <span {...props} className={cn("mb-4 text-justify leading-8 tracking-wider", props.className)}></span>
  ),
  // List
  ol: ({ ...props }) => (
    <ol {...props} className={cn("list-decimal ml-5 mb-4 mt-2 [&:has(>li>label>input[type='checkbox'])]:list-none", props.className)}></ol>
  ),
  ul: ({ ...props }) => (
    <ul {...props} className={cn("list-disc ml-5 mb-4 mt-2 [&:has(>li>label>input[type='checkbox'])]:list-none", props.className)}></ul>
  ),
  // List Item
  li: ({ ...props }) => (
    <li {...props} className={cn("pl-2 [&>ul]:list-inside [&>ol]:list-inside [&>ul]:mt-2 [&>ul]:mb-2 [&>ol]:mt-2 [&>ol]:mb-2 text-justify leading-8 tracking-wider mb-4", props.className)}></li>
  ),
  // Link
  a: ({ ...props }) => {
    if (props.className?.includes("subheading-anchor")) {
      return <Link {...props} href={props.href!} />;
    }

    const target = props.href?.startsWith("http") ? "_blank" : "_self";

    return <PrettyLink {...props as any} target={target} />;
  },
  // Image
  img: ({ ...props }) => (
    <figure className="shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] rounded-lg overflow-hidden w-4/5 mx-auto mt-8 mb-12">
      <img {...props}></img>
      {props.alt && <figcaption className="text-sm text-center text-gray-600 dark:text-gray-400 py-2">{props.alt}</figcaption>}
    </figure>
  ),
  // Code
  code: ({ ...props }) => (
    <code {...props} className={cn(
      "overflow-auto relative inline-block rounded px-1 py-0 [pre_&]:p-4 [pre_&]:my-4 [pre_&]:pt-10 font-mono text-sm shadow border border-gray-200 dark:border-gray-700 translate-y-1",
      "before:[pre_&[data-language]]:content-[attr(data-language)] before:[pre_&[data-language]]:absolute before:[pre_&[data-language]]:right-0 before:[pre_&[data-language]]:top-0 before:[pre_&[data-language]]:left-0",
      "before:[pre_&[data-language]]:p-2 before:[pre_&[data-language]]:bg-black/50 before:[pre_&[data-language]]:leading-none before:[pre_&[data-language]]:text-xs",
      props.className
    )}></code>
  ),
  // Blockquote
  blockquote: ({ ...props }) => (
    <blockquote
      className={cn(
        "my-8 pl-6 border-l-4 border-blue-500 dark:border-blue-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg py-4 pr-8 relative [&:not(:has(footer))]:pb-4 [&:has(footer)]:pb-12 space-y-2 text-gray-700 dark:text-gray-200",
        "[&>p]:text-lg [&>p]:leading-relaxed [&>p]:font-medium [&>p:first-of-type]:before:content-['\u201C'] [&>p:first-of-type]:before:text-blue-500 [&>p:first-of-type]:before:dark:text-blue-400 [&>p:first-of-type]:before:text-4xl",
        "[&>p:first-of-type]:before:leading-3 [&>p:first-of-type]:before:mr-1 [&>p:first-of-type]:before:font-serif [&>p:last-of-type]:after:content-['\u201D'] [&>p:last-of-type]:after:text-blue-500 [&>p:last-of-type]:after:dark:text-blue-400 [&>p:last-of-type]:after:text-4xl [&>p:last-of-type]:after:leading-3 [&>p:last-of-type]:after:ml-1 [&>p:last-of-type]:after:font-serif",
        "before:content-['”'] before:text-blue-500 before:dark:text-blue-400 before:text-7xl before:leading-3 before:absolute before:top-8 before:opacity-50 before:right-1 before:font-serif",
        "[&>footer]:absolute [&>footer]:text-right sm:[&>footer]:text-left [&>footer]:bottom-2 sm:[&>footer]:bottom-4 [&>footer]:right-4 [&>footer]:text-sm [&>footer]:text-gray-600 [&>footer]:dark:text-gray-400 [&>footer]:font-medium [&>footer]:italic [&>footer]:before:content-['—'] [&>footer]:before:mr-1 [&>footer]:before:text-blue-500 [&>footer]:before:dark:text-blue-400 [&>footer]:before:non-italic",
        props.className
      )}
      {...props}
    ></blockquote>
  ),
  // Table
  table: ({ ...props }) => (
    <div className="w-full overflow-x-auto">
      <table {...props} className="
        w-full
        border-collapse
        text-sm
        my-4
        dark:bg-gray-900
        bg-white
        rounded-lg
        overflow-hidden
        shadow-sm
        border
        border-gray-200
        dark:border-gray-700
      ">
        {props.children}
      </table>
    </div>
  ),
  thead: ({ ...props }) => (
    <thead className="
      bg-gray-50
      dark:bg-gray-800
      text-gray-900
      dark:text-gray-100
      border-b
      border-gray-200
      dark:border-gray-700
    ">
      {props.children}
    </thead>
  ),
  tbody: ({ ...props }) => (
    <tbody className="
      divide-y
      divide-gray-200
      dark:divide-gray-700
      bg-white
      dark:bg-gray-900
      text-gray-700
      dark:text-gray-300
    ">
      {props.children}
    </tbody>
  ),
  tr: ({ ...props }) => (
    <tr className="
      transition-colors
      hover:bg-gray-50
      dark:hover:bg-gray-800/50
      group
    ">
      {props.children}
    </tr>
  ),
  th: ({ ...props }) => (
    <th className="
      px-6
      py-4
      font-semibold
      text-left
      whitespace-nowrap
      uppercase
      tracking-wider
      text-xs
      group-hover:bg-gray-50
      dark:group-hover:bg-gray-800/50
      transition-colors
    ">
      {props.children}
    </th>
  ),
  td: ({ ...props }) => (
    <td className="
      px-6
      py-4
      whitespace-nowrap
      group-hover:bg-gray-50
      dark:group-hover:bg-gray-800/50
      transition-colors
    ">
      {props.children}
    </td>
  ),
  // Horizontal Rule
  hr: ({ ...props }) => (
    <hr {...props} className="w-full h-[1px] border-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4" />
  ),
  // Strong
  strong: ({ ...props }) => (
    <strong {...props}></strong>
  ),
  // Emphasis
  em: ({ ...props }) => (
    <em {...props}>
      <HighlightText>{props.children}</HighlightText>
    </em>
  ),
  // Delete
  del: ({ ...props }) => (
    <del {...props}></del>
  ),
  // Inline Code
  inlineCode: ({ ...props }) => (
    <code {...props}></code>
  ),
  // Preformatted Text
  pre: ({ ...props }) => (
    <pre {...props}></pre>
  ),
  input: ({ ...props }) => {
    if (props.type === 'checkbox') {
      return (
        <label className="inline-flex items-center gap-2 relative">
          <input
            {...props}
            className="
              peer
              appearance-none
              w-5 h-5
              border-2 border-gray-300
              rounded
              bg-white
              checked:bg-blue-500
              checked:border-blue-500
              hover:border-blue-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/20
              cursor-pointer
              transition-colors
            "
          />
          <svg
            className="
              absolute
              left-0
              w-5 h-5
              pointer-events-none
              opacity-0
              peer-checked:opacity-100
              stroke-white
              stroke-[3]
            "
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" fill="none" />
          </svg>
          <span className="text-gray-700 hover:text-gray-900 cursor-pointer select-none">
            {props.children}
          </span>
        </label>
      );
    }

    return (
      <input {...props} />
    );
  },
  mark: ({ ...props }) => (
    <mark {...props} className={cn("bg-violet-900", props.className)}></mark>
  ),
  "external-embed": (props) => <ExternalEmbed {...props} />,
  MultiColumn,
};

export const Mdx:FC<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
};

Mdx.displayName = 'MdxComponent';
