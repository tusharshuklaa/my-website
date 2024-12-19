"use client";

import { FC, RefObject, useRef } from "react";
import { Timeline } from "@/components/ui/timeline";
import CareerData from "@/data/career.json";
import { Company, CareerCompany } from "./company";

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
        <h2 className="mb-4 max-w-4xl text-lg text-black dark:text-white md:text-4xl">
          A Universe of Experience &amp; Skills
        </h2>

        <p className="text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
          A journey from the cosmic dust of startups to the supernova of MNCs, my career has been a stellar exploration
          of cosmic web (the internet 😅).
        </p>
      </div>

      <Timeline data={data} containerRef={containerRef} targetRef={pageRef} />
    </div>
  );
};
