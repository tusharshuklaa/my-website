import { Children, FC } from 'react';
import { BasicUiComponent } from "@/types";
import { cn } from "@/lib/utils";

type ThreeDSliderContainerProps = BasicUiComponent<{
  sliderClassName?: string;
  extraContent?: React.ReactNode;
}>;

export const ThreeDSliderContainer: FC<ThreeDSliderContainerProps> = ({ children, className, extraContent, sliderClassName }) => {
  const threeDSliderContainerClasses = cn(
    'w-full h-[80dvh] text-center overflow-hidden relative px-20',
    className
  );
  const sliderClasses = cn(
    "absolute w-[20vmin] h-[25vmin] top-[10%] left-[calc(50%-100px)] [transform-style:preserve-3d] [transform:perspective(1000px)] animate-slider-anim hover:[animation-play-state:paused]",
    sliderClassName,
  );

  const childrenCount = Children.count(children);

  return (
    <div data-testid="cmp-three-d-slider" className={threeDSliderContainerClasses}>
      <ul
        className={sliderClasses}
        style={{ '--quantity': `${childrenCount}` } as React.CSSProperties}
      >
        {children}
      </ul>

      {
        extraContent && (
          <div className="absolute w-full bottom-0 left-0 p-4 text-center">
            {extraContent}
          </div>
        )
      }
    </div>
  );
};

export type ThreeDSliderItemProps = BasicUiComponent<{
  position: number;
}>;

export const ThreeDSliderItem: FC<ThreeDSliderItemProps> = ({ children, className, position }) => {
  const threeDSliderItemClasses = cn(
    'absolute w-full h-full inset-0 slider-3d-transform',
    className
  );

  return (
    <li
      data-testid="cmp-three-d-slider-item"
      className={threeDSliderItemClasses}
      style={{ '--position': `${position}` } as React.CSSProperties}
    >
      {children}
    </li>
  );
};

ThreeDSliderContainer.displayName = 'ThreeDSliderContainer';
ThreeDSliderItem.displayName = 'ThreeDSliderItem';
