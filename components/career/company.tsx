import { FC } from "react";
import { GradientText } from "../text";
import { ThemeImage } from "../theme-image";
import { PrettyLink } from "../pretty-link";

type WorkType = "Full Time" | "Internship" | "Freelance";
type Position = {
  title: string;
  duration: string;
  description?: string;
};
export type CareerCompany = {
  company: string;
  heading: string;
  img: string;
  imgDark?: string;
  location: string;
  positions: Array<Position>;
  type: WorkType;
  url: string;
};

type CompanyProps = Omit<CareerCompany, "heading">;

export const Company: FC<CompanyProps> = ({ company, img, imgDark, positions, type, url }) => {
  return (
    <section className="flex gap-2 md:gap-8 flex-col md:flex-row">
      <div className="mt-2 flex h-28 w-28 shrink-0 items-end md:items-start justify-center">
        <ThemeImage darkSrc={imgDark || ""} src={img} alt={`${company} logo`} width={112} height={112} />
      </div>

      <div className="flex flex-col">
        <h2 className="mb-4 flex items-center justify-start gap-2 text-xl font-normal text-neutral-800 dark:text-neutral-200 md:text-2xl">
          <PrettyLink href={url} target="_blank">{company}</PrettyLink>
        </h2>

        <ul className="list-disc">
          {positions.map(position => (
            <li key={position.title} className="mb-6 flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <GradientText text={position.title} className="text-lg font-bold" />
                  <sub className="text-xs font-thin">( {type} )</sub>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{position.duration}</p>
              </div>

              <div className="text-sm">{position.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
