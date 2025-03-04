// contentlayer.config.ts
import { spawn } from "child_process";
import { statSync } from "fs";
import path from "path";
import Slugger from "github-slugger";
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { LineElement } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { rehypeExternalEmbed } from "@/lib/rehypeExternalEmbed";
import { formatReadingTime, getReadingTime } from "@/lib/utils";

const lastModifiedCache = new Map<string, Date>();

// Function to get git last modified date
async function getLastModifiedDate(filePath: string): Promise<Date | null> {
  if (lastModifiedCache.has(filePath)) {
    return lastModifiedCache.get(filePath)!;
  }

  try {
    return new Promise(resolve => {
      // Git command to get the last modified date
      const git = spawn("git", ["log", "-1", "--format=%at", "--", filePath]);

      let output = "";

      git.stdout.on("data", data => {
        output += data;
      });

      git.on("close", code => {
        if (code === 0 && output) {
          // Convert git timestamp to Date
          const timestamp = parseInt(output.trim()) * 1000;
          const date = new Date(timestamp);
          lastModifiedCache.set(filePath, date);
          resolve(date);
        } else {
          try {
            // Fallback to file system stats if git fails
            const stats = statSync(filePath);
            lastModifiedCache.set(filePath, stats.mtime);
            resolve(stats.mtime);
          } catch (error) {
            console.warn(`Could not get file stats for ${filePath}:`, error);
            resolve(null);
          }
        }
      });

      git.on("error", () => {
        try {
          // Fallback to file system stats if git fails
          const stats = statSync(filePath);
          lastModifiedCache.set(filePath, stats.mtime);
          resolve(stats.mtime);
        } catch (error) {
          console.warn(`Could not get file stats for ${filePath}:`, error);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error(`Error getting last modified date for ${filePath}:`, error);
    return null;
  }
}

// eslint-disable-next-line
const getBlogSlug = (blog: any) => blog._raw.flattenedPath.replace(/^blog\//, "");

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
    author: {
      type: "string",
      required: true,
    },
    authorImg: {
      type: "string",
      required: false,
    },
    authorDesc: {
      type: "string",
      required: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    keywords: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    related: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: post => {
        // Remove 'blog/' from the beginning and add it back with a leading slash
        const slug = getBlogSlug(post);
        return `/blog/${slug}`;
      },
    },
    slug: {
      type: "string",
      resolve: post => getBlogSlug(post),
    },
    readingTime: {
      type: "number",
      resolve: doc => getReadingTime(doc.body.raw),
    },
    readingTimeString: {
      type: "string",
      resolve: doc => formatReadingTime(getReadingTime(doc.body.raw)),
    },
    authorAlias: {
      type: "string",
      resolve: doc =>
        doc.author
          .split(" ")
          .slice(0, 2)
          .map(word => word[0])
          .join("")
          .toUpperCase(),
    },
    lastModified: {
      type: "date",
      resolve: async doc => {
        // Get the relative path from the source file path
        const relativePath = path.relative(path.join(process.cwd(), "content"), doc._raw.sourceFilePath);
        const date = await getLastModifiedDate(relativePath);

        return date?.toISOString() || doc.date;
      },
    },
    toc: {
      type: "json",
      resolve: doc => {
        const regExp = /\n(?<flag>#{2,6})\s+(?<content>.+)/g;
        const slugger = new Slugger();
        const headings = Array.from(doc.body.raw.matchAll(regExp)).map(({ groups }) => {
          const content = groups?.content || "";

          return {
            level: groups?.flag.length || 0,
            content,
            slug: content ? slugger.slug(content) : undefined,
          };
        });

        return headings;
      },
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
