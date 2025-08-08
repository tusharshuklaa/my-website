"use client";

import React, { useState, useEffect, FC } from "react";
import { useMotionTemplate, useMotionValue, motion, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { GradientText } from "@components/text";

type EvervaultCardProps = {
  text?: string;
  className?: string;
  randomStringCount?: number;
};

export const EvervaultCard: FC<EvervaultCardProps> = ({ text, className, randomStringCount = 1500 }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    const str = generateRandomString(randomStringCount);
    setRandomString(str);
  }, [randomStringCount]);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(randomStringCount);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "relative flex aspect-square h-full w-full items-center justify-center bg-transparent p-0.5",
        className,
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />

        {text && (
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full text-4xl font-bold text-white">
              <GradientText text={text} color="darkBlue" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type CardPatternProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
};

export const CardPattern: FC<CardPatternProps> = ({ mouseX, mouseY, randomString }) => {
  const maskImage = useMotionTemplate`radial-gradient(25vw at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-blue-700 opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@&";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < Math.ceil(length / 2); i++) {
    result += `${characters.charAt(Math.floor(Math.random() * characters.length))} `;
  }
  return result;
};
