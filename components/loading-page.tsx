import { FC } from 'react';
import { SpaceMascot } from '@components/space-mascot';
import { Heading2 } from '@components/text/heading';

export const LoadingPage: FC = () => {
  return (
    <div
      data-testid="cmp-loading-page"
      className="fixed inset-0 w-[100vw] h-[100vh] flex items-center justify-center overflow-hidden bg-white dark:bg-background opacity-90 z-50"
    >
      <SpaceMascot />
      <div className='longfazers absolute w-full h-full'>
        <span className="bg-black dark:bg-white w-1/5 absolute" />
        <span className="bg-black dark:bg-white w-1/5 absolute" />
        <span className="bg-black dark:bg-white w-1/5 absolute" />
        <span className="bg-black dark:bg-white w-1/5 absolute" />
      </div>
      <Heading2 className="animate-pulse text-center absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-full">Just a sec...</Heading2>
    </div>
  );
};

LoadingPage.displayName = 'LoadingPage';
