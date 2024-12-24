// contentlayer.config.ts
import { defineDocumentType, DocumentTypeDef, makeSource } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { LineElement } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/*.mdx",
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
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: post => `/blog/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "blog",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
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
          properties: {
            className: ["subheading-anchor"],
            arialLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
