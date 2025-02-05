// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { LineElement } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { rehypeExternalEmbed } from "@/lib/rehypeExternalEmbed";
import { formatReadingTime, getReadingTime } from "@/lib/utils";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: post => {
        // Remove 'blog/' from the beginning and add it back with a leading slash
        const slug = post._raw.flattenedPath.replace(/^blog\//, "");
        return `/blog/${slug}`;
      },
    },
    slug: {
      type: "string",
      resolve: post => post._raw.flattenedPath.replace(/^blog\//, ""),
    },
    readingTime: {
      type: "number",
      resolve: doc => getReadingTime(doc.body.raw),
    },
    readingTimeString: {
      type: "string",
      resolve: doc => formatReadingTime(getReadingTime(doc.body.raw)),
    },
  },
}));

export const UsesCoding = defineDocumentType(() => ({
  name: "Coding",
  filePathPattern: "uses-coding/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
}));

export const UsesGadgets = defineDocumentType(() => ({
  name: "Gadgets",
  filePathPattern: "uses-gadgets/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
}));

export const UsesSoftware = defineDocumentType(() => ({
  name: "Software",
  filePathPattern: "uses-software/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
}));

const createLinkIcon = () => {
  return {
    type: "element",
    tagName: "svg",
    properties: {
      xmlns: "http://www.w3.org/2000/svg",
      width: "0.7em",
      height: "0.7em",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: ["anchor-link-icon"],
    },
    children: [
      {
        type: "element",
        tagName: "path",
        properties: {
          d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
        },
      },
      {
        type: "element",
        tagName: "path",
        properties: {
          d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
        },
      },
    ],
  };
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, UsesCoding, UsesGadgets, UsesSoftware],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "tokyo-night",
          defaultLang: {
            block: "typescript",
            inline: "plaintext",
          },
          onVisitLine(node: LineElement) {
            // Prevent lines from collapsing in 'display: grid' mode, and allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children.push({ type: "text", value: "\u00A0" });
            }
          },
          onVisitHighlightedLine(node: LineElement) {
            if (node.properties) {
              node.properties.className = [...(node.properties.className || []), "line--highlighted"];
            }
          },
          onVisitingHighlightedWord(node: LineElement) {
            if (node.properties) {
              node.properties.className = [...(node.properties.className || []), "word--highlighted"];
            }
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: createLinkIcon(),
          properties: {
            className: ["subheading-anchor"],
            ["arial-label"]: "Link to section",
          },
        },
      ],
      rehypeExternalEmbed,
    ],
  },
});
