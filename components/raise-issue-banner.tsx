import { FC } from "react";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { GradientText } from "@components/text";
import { GithubIssueButton } from "@components/github-issue-button";
import { EvervaultCard } from "@ui";

type RaiseIssueBannerProps = UiComponent & {
  issueTitle?: string;
  issueSlug?: string;
};

export const RaiseIssueBanner: FC<RaiseIssueBannerProps> = ({ issueSlug, issueTitle, className }) => {
  const raiseIssueBannerClasses = cn(
    "max-w-sm md:max-w-4xl lg:max-w-7xl m-auto px-4 sm:px-0 mt-16 md:mt-28 flex flex-col justify-center h-[35dvh] sm:h-[50vh]",
    "relative",
    className,
  );

  return (
    <section data-testid="cmp-raise-issue-banner" className={raiseIssueBannerClasses}>
      <EvervaultCard className="w-full z-10 hidden sm:flex" randomStringCount={10000} />
      <div className="flex flex-col items-center justify-center gap-4 absolute inset-0">
        <GradientText
          color="blue"
          className="font-dongle text-7xl font-bold"
          text="Found an issue?"
        />

        <p className="text-lg px-2 max-w-none sm:max-w-1/2 text-center">
          If you found a typo, incorrect information or have a feature request, please raise an issue by clicking this button.
        </p>

        <GithubIssueButton issueTitle={issueTitle} issueSlug={issueSlug} />
      </div>
    </section>
  );
};

RaiseIssueBanner.displayName = "RaiseIssueBanner";
