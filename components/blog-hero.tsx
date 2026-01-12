'use client';

import { SparklesCore } from '@ui';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';

type ArticleHeroProps = UiComponent<{
  text: string;
}>;

export const ArticleHero: FC<ArticleHeroProps> = ({ className, text }) => {
  const articleHeroClasses = cn(
    'h-64 md:h-[30rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md',
    className,
  );
  return (
    <div data-testid="cmp-article-hero" className={articleHeroClasses}>
      <h1 className="text-glow relative z-20 text-center text-5xl font-bold text-white md:text-7xl lg:text-9xl">
        {text}
      </h1>
      <div className="relative h-28 w-80 sm:h-40 sm:w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-12 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm sm:inset-x-20" />
        <div className="absolute inset-x-12 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent sm:inset-x-20" />
        <div className="absolute inset-x-28 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm sm:inset-x-60" />
        <div className="absolute inset-x-28 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent sm:inset-x-60" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full overflow-hidden rounded-[20%_20%_50%_50%_/_40%_40%_100%_100%]"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
};

ArticleHero.displayName = 'BlogHero';
