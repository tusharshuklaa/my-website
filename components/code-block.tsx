"use client";

import { cloneElement, isValidElement, useMemo, useState } from "react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { Check, ChevronsDownUp, Clipboard, WrapText } from "lucide-react";
import { cn } from "@/lib/utils";

type PreWithDataLanguage = HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
};

type CodeBlockProps = PreWithDataLanguage & {
  children?: ReactNode;
};

type CodeElementProps = {
  children?: ReactNode;
  className?: string;
  "data-language"?: string;
};

type ElementWithChildren = ReactElement<CodeElementProps>;

const isCodeElement = (node: ReactNode): node is ReactElement => {
  return isValidElement(node) && typeof node.type === "string" && node.type === "code";
};

const findCodeChild = (children?: ReactNode): ElementWithChildren | null => {
  if (!children) return null;

  const array = Array.isArray(children) ? children : [children];
  for (const child of array) {
    if (isCodeElement(child)) return child as ElementWithChildren;
    if (isValidElement(child)) {
      const childWithChildren = child as ElementWithChildren;
      if (childWithChildren.props?.children) {
        const nested = findCodeChild(childWithChildren.props.children);
        if (nested) return nested;
      }
    }
  }

  return null;
};

const extractLanguage = (preLanguage?: string, code?: ReactElement | null): string => {
  const langFromPre = preLanguage?.trim();
  if (langFromPre) return langFromPre;

  const langFromCode = (code?.props?.["data-language"] as string | undefined)?.trim();
  if (langFromCode) return langFromCode;

  const className = code?.props?.className as string | undefined;
  const match = className?.match(/language-([\w-]+)/);
  if (match?.[1]) return match[1];

  return "text";
};

const getNodeText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement(node)) return getNodeText(node.props?.children);
  return "";
};

export const CodeBlock = ({ className, children, ...preProps }: CodeBlockProps) => {
  const codeChild = findCodeChild(children);
  const language = extractLanguage(preProps["data-language"], codeChild);
  const [isWrapped, setIsWrapped] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => getNodeText(codeChild?.props?.children ?? children), [codeChild, children]);
  const lineCount = useMemo(() => (codeText ? codeText.split(/\r?\n/).length : 0), [codeText]);

  const handleCopy = async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Failed to copy code", error);
      setCopied(false);
    }
  };

  const toolbarButtonClass =
    "inline-flex h-8 items-center justify-center gap-1 rounded-lg px-3 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white";

  const clonedCode = codeChild
    ? cloneElement(codeChild, {
        className: cn(
          "block min-w-full rounded-none bg-transparent p-0 text-sm leading-6",
          isWrapped ? "whitespace-pre-wrap break-words" : "whitespace-pre",
          codeChild.props.className,
        ),
      })
    : children;

  return (
    <div className="not-prose relative mb-6 mt-4 overflow-hidden rounded-xl border border-gray-200/80 bg-white/40 shadow-sm backdrop-blur dark:border-gray-800/80 dark:bg-black/30">
      <div className="flex h-10 items-center justify-between gap-3 border-b border-gray-200/70 bg-gray-950/95 px-4 text-gray-100 dark:border-gray-800 dark:bg-black">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300">{language}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={isCollapsed ? "Expand code" : "Collapse code"}
            title={isCollapsed ? "Expand code" : "Collapse code"}
            onClick={() => setIsCollapsed(prev => !prev)}
            className={toolbarButtonClass}
          >
            <ChevronsDownUp className="h-4 w-4" />
            <span className="hidden sm:inline">{isCollapsed ? "Expand" : "Collapse"}</span>
          </button>
          <button
            type="button"
            aria-label={isWrapped ? "Disable wrapping" : "Enable wrapping"}
            title={isWrapped ? "Disable wrapping" : "Enable wrapping"}
            onClick={() => setIsWrapped(prev => !prev)}
            className={toolbarButtonClass}
          >
            <WrapText className="h-4 w-4" />
            <span className="hidden sm:inline">Wrap</span>
          </button>
          <button
            type="button"
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
            onClick={handleCopy}
            className={toolbarButtonClass}
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {!isCollapsed ? (
        <pre
          {...preProps}
          className={cn(
            "not-prose !m-0 w-full bg-transparent px-4 py-4 text-sm leading-6",
            isWrapped ? "overflow-x-hidden whitespace-pre-wrap break-words" : "overflow-x-auto whitespace-pre",
            className,
          )}
        >
          {clonedCode}
        </pre>
      ) : (
        <div className="border-t border-gray-200/70 bg-white/60 px-4 py-3 text-xs text-gray-600 dark:border-gray-800/70 dark:bg-black/40 dark:text-gray-300">
          {lineCount} line{lineCount === 1 ? "" : "s"} hidden…
        </div>
      )}
    </div>
  );
};

CodeBlock.displayName = "CodeBlock";
