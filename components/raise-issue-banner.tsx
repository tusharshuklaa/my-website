'use client';

import { GithubIssueButton } from '@components/github-issue-button';
import { GradientText } from '@components/text';
import { EvervaultCard } from '@ui';
import { type FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';

type RaiseIssueBannerProps = UiComponent & {
  issueTitle?: string;
};

export const RaiseIssueBanner: FC<RaiseIssueBannerProps> = ({ issueTitle, className }) => {
  const [titleForIssue, setTitleForIssue] = useState('Add page title here');
  const raiseIssueBannerClasses = cn(
    'max-w-sm md:max-w-4xl lg:max-w-7xl m-auto px-4 sm:px-0 mt-16 md:mt-28 flex flex-col justify-center h-[35dvh] sm:h-[50vh]',
    'relative',
    className,
  );

  useEffect(() => {
    const title = issueTitle || document.title;

    if (title) {
      setTitleForIssue(title);
    }
  }, [issueTitle]);

  return (
    <section data-testid="cmp-raise-issue-banner" className={raiseIssueBannerClasses}>
      <EvervaultCard className="z-10 hidden w-full sm:flex" randomStringCount={10000} />
      <div className="flex flex-col items-center justify-center gap-4 sm:absolute sm:inset-0">
        <GradientText color="blue" className="font-dongle text-6xl font-bold" text="Found an issue?" />

        <p className="max-w-none px-2 text-center text-lg sm:max-w-1/2">
          If you found a typo, incorrect information or have a feature request, please raise an issue by clicking this
          button.
        </p>

        <GithubIssueButton issueTitle={titleForIssue} />
      </div>
    </section>
  );
};

RaiseIssueBanner.displayName = 'RaiseIssueBanner';
