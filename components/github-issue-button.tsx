import { FC } from "react";
import Link from "next/link";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from '@ui';

type GithubIssueButtonProps = UiComponent<{
  url?: string;
  issueTitle?: string;
  issueSlug?: string;
}>;

export const GithubIssueButton: FC<GithubIssueButtonProps> = ({ issueSlug, issueTitle, className }) => {
  const githubIssueButtonClasses = cn(
    "overflow-hidden z-20 relative rounded-full p-1 h-12 text-xl mt-8",
    className
  );

  const title = `Found an issue for post - '${issueTitle}'`;
  const issueDescription = `Issue raised for file - '/content/blog/${issueSlug}.mdx' \n\n **Describe the issue:**`;
  const issueUrl = `https://github.com/tusharshuklaa/my-website/issues/new?title=${title}&body=${issueDescription}`;

  return (
    <div data-testid="cmp-github-issue-button" className={githubIssueButtonClasses}>
      <Button
        variant="magic"
        asChild
      >
        <Link
          href={issueUrl}
          className="text-3xl px-2 font-dongle"
          title="Raise an issue for this post on Github"
          target="_blank"
        >
          Raise on GitHub
        </Link>
      </Button>
    </div>
  );
};

GithubIssueButton.displayName = 'GithubIssueButton';
