"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { shuffle } from "lodash";
import { isEmoji } from "@/lib/utils";

type FlipWordsProps = {
  duration?: number;
  className?: string;
};

export const FlipWords: FC<FlipWordsProps> = ({ duration = 3000, className }) => {
  const words = shuffle([
    "building stuff for the web 👨🏻‍💻",
    "riding my RE Classic 🏍️",
    "my 2 cute monsters 👻",
    "creating CSS art 🧑🏻‍🎨",
    "conversations about space 💫",
    "tweaking my gadgets 📱",
    "staying informed of latest tech 💿",
    "talking to people 🗣️",
    "loosing money in stocks 😤",
    "using emojis 😼",
    "anime and manga 🎌",
    "money... bcz who doesn't? 🤑",
    "learning new things 🧠",
    "solving problems 🧩",
    "playing mobile games 👾",
    "stargazing 🌌",
    "coding for fun 🤓",
    "writing blogs 📝",
    "helping others 🤝",
    "making memories 📸",
  ]);

  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

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
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: 200,
          x: -40,
          filter: "blur(8px)",
          scale: 1.5,
          position: "absolute",
        }}
        className={clsx("relative z-10 inline-block text-left", className)}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {(isEmoji(word) ? [word] : word.split("")).map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className={`${isEmoji(word) ? "text-white" : ""} inline-block`}
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
