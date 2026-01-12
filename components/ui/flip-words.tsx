'use client';

import clsx from 'clsx';
import { shuffle } from 'lodash';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useCallback, useEffect, useState } from 'react';
import { isEmoji } from '@/lib/utils';
import type { UiComponent } from '@/types';

type FlipWordsProps = UiComponent<{
  duration?: number;
}>;

const ALL_WORDS = [
  'building stuff for the web 👨🏻‍💻',
  'riding my Classic 🏍️',
  'my 2 cute monsters 👻',
  'creating CSS art 🧑🏻‍🎨',
  'conversations about space 💫',
  'tweaking my gadgets 📱',
  'exploring latest tech 💿',
  'talking to people 🗣️',
  'loosing money in stocks 😤',
  'using emojis 😼',
  'anime and manga 🎌',
  "money... bcz who doesn't? 🤑",
  'learning new things 🧠',
  'solving problems 🧩',
  'playing mobile games 👾',
  'stargazing 🌌',
  'coding for fun 🤓',
  'writing blogs 📝',
  'helping others 🤝',
  'making memories 📸',
];

export const FlipWords: FC<FlipWordsProps> = ({ duration = 3000, className }) => {
  const words = shuffle(ALL_WORDS);
  const [isClient, setIsClient] = useState(false);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating && isClient)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation, isClient]);

  if (!isClient) {
    return (
      <div className={clsx('relative z-10 inline-block min-h-[67px] text-left', className)}>
        <span className="opacity-0">{ALL_WORDS[0]}</span>
      </div>
    );
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute',
        }}
        className={clsx('relative z-10 inline-block text-left', className)}
        key={currentWord}
      >
        {currentWord.split(' ').map((word, wordIndex) => (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: needed as per logic
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {(isEmoji(word) ? [word] : word.split('')).map((letter, letterIndex) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: needed as per logic
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className={clsx('inline-block', {
                  'text-white': isEmoji(word),
                })}
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
