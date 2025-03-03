import { FC } from "react";
import Link from "next/link";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from '@ui';

type GithubIssueButtonProps = UiComponent<{
  url?: string;
  issueTitle?: string;
}>;

export const GithubIssueButton: FC<GithubIssueButtonProps> = ({ issueTitle, className }) => {
  const githubIssueButtonClasses = cn(
    "overflow-hidden z-20 relative rounded-full p-1 h-12 text-xl mt-8",
    className
  );

  const title = `Found an issue for page - '${issueTitle}'`;
  const issueDescription = `
    Issue raised for page - '${issueTitle}'
    ---------------------------------------
    \n\n
    Issue Description:
    \n\n
    - [ ] Issue with content
    \n\n
    Note: Please provide detailed information about the issue you are facing.
    \n\n
    Help: Raise a PR if you want the problem fixed faster, thanks 🙏🏻.
  `;
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
