"use client";

import { FC, useState } from 'react';
import { X } from 'lucide-react';
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { HighlightText } from '@/components/text';
import { Marquee } from '@/components/marquee';
import { Button } from './ui';

type InfoBarProps = BasicUiComponent<{
  hidden?: boolean;
}>;

export const InfoBar: FC<InfoBarProps> = ({ children, className, hidden = false, ...props }) => {
  const [isHidden, setIsHidden] = useState(hidden);
  const infoBarClasses = cn('z-10 fixed top-0 w-full overflow-hidden left-0 right-0 py-1 pl-2 pr-10 text-sm font-normal', className);

  return (
    !isHidden && (
      <HighlightText data-testid="cmp-info-bar" className={infoBarClasses} {...props}>
        <Marquee>{children}</Marquee>
        <Button variant="clear" size="auto" onClick={() => setIsHidden(true)} className="absolute right-4 top-0 bottom-0 m-auto">
          <X className="w-4 h-4" />
        </Button>
      </HighlightText>
    )
  );
};

InfoBar.displayName = 'InfoBar';
