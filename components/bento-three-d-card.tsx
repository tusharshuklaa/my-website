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
  readingTimeString?: string;
}>;

export const BentoThreeDCard:FC<BentoThreeDCardProps> = ({ date, description, img, readingTimeString, title, url }) => {
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
              src={img}
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

        {readingTimeString && (
          <>
            <ThreeDCardItem
              as="span"
              translateZ="60"
              className="text-neutral-500 text-sm mt-4 dark:text-neutral-300 inline-block mx-1"
            >
              •
            </ThreeDCardItem>
            <ThreeDCardItem
              as="span"
              translateZ="60"
              className="text-neutral-500 text-sm mt-4 dark:text-neutral-300 inline-block"
            >
              {readingTimeString}
            </ThreeDCardItem>
          </>
        )}

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
        href={url}
        className="py-2 rounded-xl font-normal dark:text-white"
      >
        <GradientText text="Read More →" />
      </ThreeDCardItem>
    </ThreeDCardBody>
  </ThreeDCardContainer>
  );
};

BentoThreeDCard.displayName = 'BentoThreeDCard';
