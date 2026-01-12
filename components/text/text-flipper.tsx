import type { CSSProperties, FC } from 'react';
import { cn } from '@/lib/utils';
import type { BasicUiComponent } from '@/types';

export const TextFlipper: FC<BasicUiComponent> = ({ className, children }) => {
  const letters = (children as string)?.split('');

  return (
    <span className={cn('text-flipper group grid', className)}>
      {[letters, letters].map(word => (
        <span
          key={word.join('_')}
          className="text-flipper--text group/word col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-in-text last:opacity-0 group-hover:first:opacity-0 group-hover:last:opacity-100"
        >
          {word.map((letter, j) => (
            <span
              key={letter}
              className="char duration-600 inline-block origin-almost-center transition-transform delay-char-index ease-in-letter backface-hidden"
              style={{ '--char-index': j } as CSSProperties}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
