import { SpaceMascot } from '@components/space-mascot';
import { Heading2 } from '@components/text/heading';
import type { FC } from 'react';

export const LoadingPage: FC = () => {
  return (
    <div
      data-testid="cmp-loading-page"
      className="fixed inset-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center overflow-hidden bg-white opacity-90 dark:bg-background"
    >
      <SpaceMascot />
      <div className="longfazers absolute h-full w-full">
        <span className="absolute w-1/5 bg-black dark:bg-white" />
        <span className="absolute w-1/5 bg-black dark:bg-white" />
        <span className="absolute w-1/5 bg-black dark:bg-white" />
        <span className="absolute w-1/5 bg-black dark:bg-white" />
      </div>
      <Heading2 className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-full animate-pulse text-center">
        Just a sec...
      </Heading2>
    </div>
  );
};

LoadingPage.displayName = 'LoadingPage';
