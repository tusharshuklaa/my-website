'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BasicUiComponent } from "@/types";
import { AspectRatio, ThreeDCardContainer, ThreeDCardBody, ThreeDCardItem } from '@ui';
import { GradientText } from '@components/text';

type BentoThreeDCardProps = BasicUiComponent<{
  date: string;
  description: string;
  img: string;
  title: string;
  url: string;
}>;

export const BentoThreeDCard:FC<BentoThreeDCardProps> = ({ date, description, img, title, url }) => {
  return (
    <ThreeDCardContainer
      data-testid="cmp-bento-three-d-card"
      className="w-full h-full"
      containerClassName="md:col-span-2 md:row-span-2 w-full h-full py-0"
    >
    <ThreeDCardBody style={{ backgroundColor: 'black'}} className="flex flex-col justify-between relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-dot-white/[0.2] bg-dot-black/[0.8] dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
      <div>
        <ThreeDCardItem
          translateZ="50"
          className="text-xl w-full font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </ThreeDCardItem>

        <ThreeDCardItem translateZ="100" className="w-full mt-4 overflow-hidden shrink-0">
          <AspectRatio ratio={16/9}>
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={`Image of post titled - ${title}`}
            />
          </AspectRatio>
        </ThreeDCardItem>

        <ThreeDCardItem
          as="time"
          translateZ="60"
          className="text-neutral-500 text-sm mt-4 dark:text-neutral-300 inline-block"
          dateTime={date}
        >
          {date}
        </ThreeDCardItem>

        <ThreeDCardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 dark:text-neutral-300 mt-4 line-clamp-5"
        >
          {description}
        </ThreeDCardItem>
      </div>

      <ThreeDCardItem
        translateZ={20}
        as={Link}
        href="https://twitter.com/mannupaaji"
        target="__blank"
        className="py-2 rounded-xl font-normal dark:text-white"
      >
        <GradientText text="Read More →" />
      </ThreeDCardItem>
    </ThreeDCardBody>
  </ThreeDCardContainer>
  );
};

BentoThreeDCard.displayName = 'BentoThreeDCard';
