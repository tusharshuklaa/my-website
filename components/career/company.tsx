import { PrettyLink } from '@components/pretty-link';
import { ThemeImage } from '@components/theme-image';
import type { FC } from 'react';
import { GradientText } from '../text';

type WorkType = 'Full Time' | 'Internship' | 'Freelance';
type Position = {
  title: string;
  duration: string;
  description?: string | Array<string>;
  location: string;
};
export type CareerCompany = {
  company: string;
  description: string;
  heading: string;
  img: string;
  imgLight?: string;
  positions: Array<Position>;
  type: WorkType;
  url: string;
};

type CompanyProps = Omit<CareerCompany, 'heading'>;

export const Company: FC<CompanyProps> = ({ company, description, img, imgLight, positions, type, url }) => {
  return (
    <section className="flex flex-col gap-2 md:flex-row md:gap-8">
      <div className="mb-4 mt-2 flex h-28 w-full shrink-0 items-end justify-center sm:mb-0 sm:w-28 md:items-start">
        <ThemeImage
          lightSrc={imgLight || ''}
          src={img}
          alt={`${company} logo`}
          title={`${description}`}
          className="w-[122px]"
          quality={50}
        />
      </div>

      <div className="flex flex-col">
        <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-normal text-neutral-800 dark:text-neutral-200 sm:justify-start md:text-2xl">
          <PrettyLink href={url} title={`${description}`} target="_blank">
            {company}
          </PrettyLink>
        </h2>

        <ul className="list-disc">
          {positions.map(position => (
            <li key={position.title} className="mb-6 flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <GradientText text={position.title} className="text-lg font-bold" />
                  <sub className="min-w-fit text-xs font-thin">( {type} )</sub>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{`${position.duration} | ${position.location}`}</p>
              </div>

              {Array.isArray(position.description) ? (
                <ul className="list-disc pl-4">
                  {position.description.map(desc => (
                    <li key={desc} className="text-sm">
                      {desc}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm">{position.description}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
