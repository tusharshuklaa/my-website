'use client';

import { type CareerCompany, Company } from '@components/career';
import { GradientText } from '@components/text';
import { AnimatedHeading } from '@components/text/heading';
import { useIsMounted } from '@hooks/use-is-mounted';
import { Timeline } from '@ui';
import { type FC, useRef } from 'react';
import CareerData from '@/data/career.json';

export const Career: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPageMounted = useIsMounted();
  const professionalData = CareerData.experience as Array<CareerCompany>;

  const data = professionalData.map(item => {
    return {
      title: item.heading,
      content: <Company key={item.company} {...item} />,
    };
  });

  return (
    <section className="relative w-full md:px-10" ref={containerRef} id="work-experience">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <AnimatedHeading className="text-left">
          <GradientText
            text={'A Universe of Experience & Skills'}
            className="mb-4 max-w-4xl text-screen-md"
            color="indigo"
          />
        </AnimatedHeading>

        <p className="text-base text-neutral-700 dark:text-neutral-300 md:text-lg">
          A journey from the cosmic dust of startups to the supernova of MNCs, my career has been a stellar exploration
          of cosmic web (the internet 😅).
        </p>
      </div>

      {isPageMounted && <Timeline data={data} containerRef={containerRef} />}
    </section>
  );
};
