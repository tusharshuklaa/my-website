'use client';

import { Mdx } from '@components/mdx';
import dynamic from 'next/dynamic';
import { type FC, useRef } from 'react';

type BlogContentProps = {
  blogCode: string;
};

const TracingBeam = dynamic(() => import('../components/ui/tracing-beam').then(comp => comp.TracingBeam), {
  ssr: false,
});

export const BlogContent: FC<BlogContentProps> = ({ blogCode }) => {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <aside className="pointer-events-none sticky top-0 hidden h-screen sm:block">
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
