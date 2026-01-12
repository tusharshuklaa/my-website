'use client';

import { AdvImage } from '@components/adv-image';
import { Mdx } from '@components/mdx';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, Fragment, useState } from 'react';
import type { Coding, Gadgets, Software } from '@/.contentlayer/generated';
import { cn } from '@/lib/utils';
import type { UiComponent } from '@/types';
import { GradientText } from '../text';
import { badgeVariants } from './badge';
import { Card, CardDescription, CardTitle } from './card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

type DialogHoverCardsType = UiComponent<{
  items: Array<Coding | Gadgets | Software>;
  cardClassName?: string;
  onTagClick?: (tag: string) => void;
}>;

export const DialogHoverCards: FC<DialogHoverCardsType> = ({ items, cardClassName, className, onTagClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((item, idx) => (
        <Fragment key={encodeURI(item.title)}>
          <Dialog>
            <DialogTrigger asChild>
              <div
                role="none"
                className="group relative block h-full w-full cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <Card className={cardClassName}>
                  <CardTitle className="line-clamp-2">
                    {hoveredIndex === idx ? <GradientText text={item.title} /> : item.title}
                  </CardTitle>

                  <CardDescription
                    className={cn('line-clamp-5', {
                      'text-white': hoveredIndex === idx,
                    })}
                  >
                    {item.summary}
                  </CardDescription>
                </Card>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-sm sm:max-w-lg lg:max-w-2xl">
              <DialogHeader className="space-y-4">
                <div className="mb-2">
                  <AdvImage
                    src={item.img}
                    alt={`Image for ${item.title}`}
                    width={450}
                    height={250}
                    className="h-auto max-h-60 w-full rounded-lg object-cover"
                  />
                </div>
                <DialogTitle className="text-center text-2xl">{item.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <div className="prose dark:prose-dark max-h-[40vh] overflow-y-auto leading-6 tracking-wide">
                  <Mdx code={item.body.code} />
                </div>
              </DialogDescription>
              <DialogFooter className="mt-4">
                {item.tags.map(tag => (
                  <DialogClose asChild key={tag}>
                    <button
                      type="button"
                      className={badgeVariants({ variant: 'destructive' })}
                      onClick={() => onTagClick?.(tag)}
                    >
                      {tag}
                    </button>
                  </DialogClose>
                ))}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Fragment>
      ))}
    </div>
  );
};
