import clsx from 'clsx';
import type React from 'react';
import type { FC } from 'react';
import type { UiComponent } from '@/types';

export type GradientColors =
  | 'yellow'
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'pink'
  | 'indigo'
  | 'orange'
  | 'peach'
  | 'darkBlue';
type GradientTextProps = UiComponent<{
  text: React.ReactNode;
  color?: GradientColors;
}>;

export const variations: Record<GradientColors, string> = {
  yellow: 'bg-[linear-gradient(121deg,#f4d372,#d8572b)]',
  blue: 'bg-[linear-gradient(126deg,#aefaff,#258cd3)]',
  green: 'bg-[linear-gradient(126deg,#baffb3,#6f99bd)]',
  red: 'bg-[linear-gradient(144deg,#ff6da5,#ff8a58)]',
  purple: 'bg-[linear-gradient(138deg,#f19aca,#4359ff)]',
  pink: 'bg-[linear-gradient(126deg,#fbf6af,#ffb4d7)]',
  indigo: 'bg-[linear-gradient(126deg,#68d0ee,#ffbdb2)]',
  orange: 'bg-[linear-gradient(108deg,#f5b03e,#f53ec2)]',
  peach: 'bg-[linear-gradient(138deg,#ffcab1,#ffb4d7_33%,#e2c5e7_66%,#b2e3ff)]',
  darkBlue: 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
};

export const GradientText: FC<GradientTextProps> = ({ className, color = 'yellow', text }) => {
  const gradientTextClasses = clsx('text-transparent bg-clip-text relative', variations[color], className);

  return (
    <span data-testid={`cmp-gradient-text`} className={gradientTextClasses}>
      {text}
    </span>
  );
};

GradientText.displayName = 'GradientText';
