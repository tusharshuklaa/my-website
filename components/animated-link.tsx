import Link from 'next/link';
import type { FC } from 'react';
import { type GradientColors, GradientText } from '@/components/text';
import { cn } from '@/lib/utils';
import type { BasicUiComponent } from '@/types';

export type AnimatedLinkProps = {
  url: string;
  name: string;
  color?: GradientColors;
};

const underlineVariations: Record<GradientColors, string> = {
  yellow: 'via-[#f4d372]',
  blue: 'via-[#aefaff]',
  green: 'via-[#baffb3]',
  red: 'via-[#ff6da5]',
  purple: 'via-[#f19aca]',
  pink: 'via-[#fbf6af]',
  indigo: 'via-[#68d0ee]',
  orange: 'via-[#f5b03e]',
  peach: 'via-[#ffcab1]',
  darkBlue: 'via-[#314ee0]',
};

const textShadowVariations: Record<GradientColors, string> = {
  yellow: 'group-hover:[text-shadow:_0_0_0.25rem_#f4d372]',
  blue: 'group-hover:[text-shadow:_0_0_0.25rem_#aefaff]',
  green: 'group-hover:[text-shadow:_0_0_0.25rem_#baffb3]',
  red: 'group-hover:[text-shadow:_0_0_0.25rem_#ff6da5]',
  purple: 'group-hover:[text-shadow:_0_0_0.25rem_#f19aca]',
  pink: 'group-hover:[text-shadow:_0_0_0.25rem_#fbf6af]',
  indigo: 'group-hover:[text-shadow:_0_0_0.25rem_#68d0ee]',
  orange: 'group-hover:[text-shadow:_0_0_0.25rem_#f5b03e]',
  peach: 'group-hover:[text-shadow:_0_0_0.25rem_#ffcab1]',
  darkBlue: 'group-hover:[text-shadow:_0_0_0.25rem_#314ee0]',
};

export const AnimatedLink: FC<BasicUiComponent<AnimatedLinkProps>> = ({ className, color = 'yellow', url, name }) => {
  const animatedLinkClasses = cn(
    'w-full sm:w-28 whitespace-break-spaces group-hover:translate-y-[-0.5rem] transition-transform duration-200 ease-in-out leading-none z-10',
    className,
  );
  // radial-gradient(circle closest-corner at 50% 180%, rgba(49, 78, 224, .6), rgba(255, 255, 255, 0))
  const underlineGradient = underlineVariations[color];
  const gradientGlowClass = textShadowVariations[color];
  const glowClass = `link-glow-${color}`;

  return (
    <div className="group relative flex items-center justify-center text-center">
      <Link
        data-testid={`cmp-animated-link`}
        className={animatedLinkClasses}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GradientText text={name} color={color} className={gradientGlowClass} />
      </Link>
      {/* glow effect */}
      <div
        className={cn(
          'transition-margin-top absolute inset-0 mt-[100%] duration-200 ease-in-out group-hover:mt-0',
          glowClass,
        )}
      />
      {/* underline effect */}
      <div
        className={cn(
          'transition-width absolute bottom-0 h-[1px] w-0 origin-left transform duration-200 ease-in-out group-hover:w-full',
          'bg-gradient-to-r from-transparent to-transparent',
          underlineGradient,
        )}
      />
    </div>
  );
};

AnimatedLink.displayName = 'AnimatedLink';
