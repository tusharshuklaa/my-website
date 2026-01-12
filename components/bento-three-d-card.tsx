'use client';

import { AdvImage } from '@components/adv-image';
import { GradientText } from '@components/text';
import { AspectRatio, ThreeDCardBody, ThreeDCardContainer, ThreeDCardItem } from '@ui';
import Link from 'next/link';
import type { FC } from 'react';
import type { BasicUiComponent } from '@/types';

type BentoThreeDCardProps = BasicUiComponent<{
  date: string;
  description: string;
  img: string;
  title: string;
  url: string;
  readingTimeString?: string;
}>;

export const BentoThreeDCard: FC<BentoThreeDCardProps> = ({
  date,
  description,
  img,
  readingTimeString,
  title,
  url,
}) => {
  return (
    <ThreeDCardContainer
      data-testid="cmp-bento-three-d-card"
      className="h-full w-full"
      containerClassName="md:col-span-2 md:row-span-2 w-full h-full py-0"
    >
      <ThreeDCardBody
        style={{ backgroundColor: 'black' }}
        className="group/card relative flex h-full w-full flex-col justify-between rounded-xl border border-black/[0.1] p-6 bg-dot-black/[0.8] dark:border-white/[0.2] dark:bg-dot-white/[0.2] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
      >
        <div>
          <ThreeDCardItem translateZ="50" className="w-full text-xl font-bold text-neutral-600 dark:text-white">
            {title}
          </ThreeDCardItem>

          <ThreeDCardItem translateZ="100" className="mt-4 w-full shrink-0 overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <AdvImage
                src={img}
                height="1000"
                width="1000"
                className="h-full w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt={`Image of post titled - ${title}`}
              />
            </AspectRatio>
          </ThreeDCardItem>

          <ThreeDCardItem
            as="time"
            translateZ="60"
            className="mt-4 inline-block text-sm font-extrabold text-neutral-500 dark:text-neutral-300"
            dateTime={date}
          >
            {date}
          </ThreeDCardItem>

          {readingTimeString && (
            <>
              <ThreeDCardItem
                as="span"
                translateZ="60"
                className="mx-1 mt-4 inline-block text-sm font-extrabold text-neutral-500 dark:text-neutral-300"
              >
                •
              </ThreeDCardItem>
              <ThreeDCardItem
                as="span"
                translateZ="60"
                className="mt-4 inline-block text-sm font-extrabold text-neutral-500 dark:text-neutral-300"
              >
                {readingTimeString}
              </ThreeDCardItem>
            </>
          )}

          <ThreeDCardItem as="p" translateZ="60" className="mt-4 line-clamp-5 text-neutral-500 dark:text-neutral-300">
            {description}
          </ThreeDCardItem>
        </div>

        <ThreeDCardItem translateZ={20} as={Link} href={url} className="rounded-xl py-2 font-normal dark:text-white">
          <GradientText text="Read More →" />
        </ThreeDCardItem>
      </ThreeDCardBody>
    </ThreeDCardContainer>
  );
};

BentoThreeDCard.displayName = 'BentoThreeDCard';
