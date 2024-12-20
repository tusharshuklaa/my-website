"use client";

import { FC, RefObject, useRef } from "react";
import { Timeline } from "@ui";
import { CareerCompany, Company } from "@/components/career";
import { Heading } from "@/components/text";
import CareerData from "@/data/career.json";

type CareerProps = {
  pageRef?: RefObject<HTMLDivElement>;
};

export const Career: FC<CareerProps> = ({ pageRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const professionalData = CareerData.experience as Array<CareerCompany>;

  const data = professionalData.map(item => {
    return {
      title: item.heading,
      content: <Company key={item.company} {...item} />,
    };
  });

  return (
    <div className="relative w-full md:px-10" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <Heading>A Universe of Experience &amp; Skills</Heading>

        <p className="text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
          A journey from the cosmic dust of startups to the supernova of MNCs, my career has been a stellar exploration
          of cosmic web (the internet 😅).
        </p>
      </div>

      <Timeline data={data} containerRef={containerRef} targetRef={pageRef} />
    </div>
  );
};
