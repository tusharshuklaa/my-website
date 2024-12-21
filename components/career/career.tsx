"use client";

import { FC, RefObject, useRef } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@ui";
import { CareerCompany, Company } from "@/components/career";
import { GradientText } from "@/components/text";
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
        <motion.h3
          initial={{
            opacity: 0,
            x: 100
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 2
            }
          }}
          viewport={{
            once: true,
            margin: "100px"
          }}
        >
          <GradientText
            text={"A Universe of Experience & Skills"}
            className="mb-4 max-w-4xl text-screen-md"
            color="indigo"
          />
        </motion.h3>

        <p className="text-base text-neutral-700 dark:text-neutral-300 md:text-lg">
          A journey from the cosmic dust of startups to the supernova of MNCs, my career has been a stellar exploration
          of cosmic web (the internet 😅).
        </p>
      </div>

      <Timeline data={data} containerRef={containerRef} targetRef={pageRef} />
    </div>
  );
};
