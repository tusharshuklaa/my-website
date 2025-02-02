import { FC } from 'react';
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from '@ui';

type DownloadResumeButtonProps = UiComponent & {
  containerClassName?: string;
};

export const DownloadResumeButton: FC<DownloadResumeButtonProps> = ({ className, containerClassName }) => {
  const downloadResumeButtonClasses = cn('dark:bg-slate-950 bg-white text-black dark:text-white flex items-center space-x-2', className);

  return (
    <HoverBorderGradient
      data-testid="cmp-download-resume-button"
      className={downloadResumeButtonClasses}
      as="a"
      href="/docs/resume.pdf"
      containerClassName={cn("rounded-full h-12", containerClassName)}
      download
    >
      Download Resume
    </HoverBorderGradient>
  );
};

DownloadResumeButton.displayName = 'DownloadResumeButton';
