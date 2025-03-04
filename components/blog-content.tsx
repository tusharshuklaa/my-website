"use client";

import React, { FC, useRef } from "react";
import dynamic from "next/dynamic";
import { Mdx } from "@components/mdx";

type BlogContentProps = {
  blogCode: string;
};

const TracingBeam = dynamic(() => import("../components/ui/tracing-beam").then(comp => comp.TracingBeam), {
  ssr: false,
});

export const BlogContent: FC<BlogContentProps> = ({ blogCode }) => {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen sm:block">
        <TracingBeam className="left-[125%]" targetRef={articleRef}>
          <div className="h-screen"></div>
        </TracingBeam>
      </aside>

      <article ref={articleRef} className="order-3 mx-auto max-w-full px-4 text-base leading-relaxed sm:order-none">
        <Mdx code={blogCode} />
      </article>
    </>
  );
};
