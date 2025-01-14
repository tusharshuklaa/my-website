import { FC } from 'react';
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import './mecha-card.css';
import Link from 'next/link';

type MechaCardProps = UiComponent<{
  text: string;
  icon: React.ReactNode;
  href: string;
  size?: keyof typeof MechaCardSizes;
}>;

const MechaCardSizes = {
  sm: {
    container: "h-[16rem] w-[12rem]",
    door: "border-t-[6rem] border-l-[6rem] border-r-[6rem]",
  },
  md: {
    container: "h-[20rem] w-[16rem]",
    door: "border-t-[8rem] border-l-[8rem] border-r-[8rem]",
  },
  lg: {
    container: "h-[24rem] w-[20rem]",
    door: "border-t-[10rem] border-l-[10rem] border-r-[10rem]",
  },
};

export const MechaCard: FC<MechaCardProps> = ({ className, href, icon, size = 'lg', text }) => {
  const sizeClasses = MechaCardSizes[size];
  const mechaCardClasses = cn(
    sizeClasses.container,
    'mecha-card group relative before:absolute before:h-full before:w-full before:border before:border-[#ae5dfd] before:scale-75',
    'before:ease-door-open before:duration-500 before:transition-all',
    className
  );
  const doorClasses = cn(
    sizeClasses.door,
    'doors w-0 h-0 border-t-slate-900 border-l-transparent border-r-transparent ease-door-open duration-300 transition-all group-hover:-mt-[30%]',
    'before:absolute before:w-full before:h-[101%] before:ease-door-open before:duration-200 before:transition-all before:delay-500 before:top-0 before:-translate-x-1/2 before:bg-slate-900',
    'before:left-0 group-hover:before:-ml-[30%]',
    'after:absolute after:w-full after:h-[101%] after:ease-door-open after:duration-200 after:transition-all after:delay-500 after:top-0 after:-translate-x-1/2 after:bg-slate-900',
    'after:right-0 after:translate-x-1/2 after:scale-x-[-1] after:scale-y-[1] group-hover:after:-mr-[30%]',
  );

  return (
    <div data-testid="cmp-mecha-card" className={mechaCardClasses}>
      <div className="mecha-container group-hover:scale-110 relative overflow-hidden w-full h-full ease-door-open duration-300 transition-all">
        <div className={doorClasses} />
        <h2 className="h-12 w-min m-auto border-4 bg-[rgb(0_0_0/_20%)] border-double border-current group-hover:opacity-100 opacity-0 ease-door-open duration-200 transition-all delay-700 text-center text-violet-400 font-bold mt-12 text-3xl flex items-center justify-center">
          <Link href={href} className="w-full h-full flex items-center justify-center p-4">{text}</Link>
        </h2>
        <div className="flex justify-center group-hover:h-12 group-hover:w-12 h-6 w-6 group-hover:top-[60%] group-hover:opacity-100 absolute left-0 right-0 m-auto top-[43%] transition-all ease-in-out duration-500 delay-500 text-black opacity-40">
          {icon}
        </div>
      </div>
    </div>
  );
};

MechaCard.displayName = 'MechaCard';
