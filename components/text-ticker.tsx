import { type FC, useState } from 'react';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';
import { VelocityScroll } from './ui';

const DEFAULT_SPEED = 4;
const DEFAULT_TEXT = 'Interested in collaborating with me? 😏';

export const TextTicker: FC<UiComponent> = ({ className }) => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const textTickerClasses = cn('text-ticker', className);

  return (
    <div
      data-testid={`cmp-text-ticker`}
      role="feed"
      className={textTickerClasses}
      onMouseEnter={() => {
        setSpeed(DEFAULT_SPEED * 5);
        setText('Great! Catch me if you can 😆');
      }}
      onMouseLeave={() => {
        setSpeed(DEFAULT_SPEED);
        setText(DEFAULT_TEXT);
      }}
    >
      <VelocityScroll text={text} className="mb-16 text-screen-lg" default_velocity={speed} />
    </div>
  );
};

TextTicker.displayName = 'TextTicker';
