import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import type { Plugin } from 'unified';

export const rehypeExternalEmbed: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element, index: number, parent: any) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string;
        // Using !! at the beginning of the URL to identify if the URL needs to be embedded or not
        if (href.startsWith("!!")) {
          // Remove the "!!" prefix and keep the link as is
          node.properties.href = href.slice(2);
          return;
        }

        const url = node.properties.href as string;

        // Determine embed type
        const getEmbedType = (url: string) => {
          if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
          if (url.includes("twitter.com") || url.includes("x.com")) return "x";
          if (url.includes("codepen.io")) return "codepen";
          if (url.includes("codesandbox.io")) return "codesandbox";

          return null;
        };

        const embedType = getEmbedType(url);

        if (embedType) {
          node.tagName = "external-embed";
          node.type = "element";
          // Clear children
          node.children = [];
          node.properties = {
            // Set URL property
            url: url,
            type: embedType,
          };

          parent.tagName = "div";
          parent.properties = {
            ...parent.properties,
            className: "my-4",
          };
        }
      }
    });
  };
};
