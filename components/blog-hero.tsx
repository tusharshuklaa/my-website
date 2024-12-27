'use client';

import { FC } from 'react';
import { SparklesCore } from '@ui';
import { cn } from '@/lib/utils';
import { UiComponent } from '@/types';

type BlogHeroProps = UiComponent<{
  text: string;
}>;

export const BlogHero: FC<BlogHeroProps> = ({ className, text }) => {
  const blogHeroClasses = cn(
    "h-64 md:h-[30rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md",
    className,
  );
  return (
    <div data-testid="cmp-blog-hero" className={blogHeroClasses}>
      <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-center text-white relative z-20 text-glow">
        {text}
      </h1>
      <div className="w-80 sm:w-[40rem] h-28 sm:h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full rounded-[20%_20%_50%_50%_/_40%_40%_100%_100%] overflow-hidden"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
};

BlogHero.displayName = 'BlogHero';
