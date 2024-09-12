import { CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";

type TextFlipperProps = {
  className?: string;
  children: string;
};
export const TextFlipper: FC<TextFlipperProps> = ({ className, children }) => {
  const letters = children.split("");

  return (
    <span className={cn("text-flipper group grid", className)}>
      {[letters, letters].map((word, i) => (
        <span
          key={i}
          className="text-flipper--text group/word ease-in-text col-start-1 row-start-1 transition-[opacity,transform] duration-500 last:opacity-0 group-hover:first:opacity-0 group-hover:last:opacity-100"
        >
          {word.map((letter, j) => (
            <span
              key={j}
              className="char ease-in-letter origin-almost-center duration-600 backface-hidden delay-char-index inline-block transition-transform"
              style={{ "--char-index": j } as CSSProperties}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
