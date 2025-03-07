"use client";

import React, { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { BasicComponent } from "@/types";
import { TextFlipper } from "@components/text";
import { AdvImage } from "@components/adv-image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

type MenuItemProps = PropsWithChildren &
  LinkProps & {
    className?: string;
    setActive?: (item: string) => void;
    active?: string | null;
    item: string;
  };

export const MenuItem: FC<MenuItemProps> = ({ setActive, active, item, href, children, className }) => (
  <div onMouseEnter={() => setActive?.(item)} className={cn("relative", className)}>
    <Link href={href}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        <TextFlipper>{item}</TextFlipper>
      </motion.p>
    </Link>
    {active !== null && (
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={transition}
      >
        {active === item && (
          <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4">
            <motion.div
              transition={transition}
              layoutId="active" // layoutId ensures smooth animation
              className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
            >
              <motion.div
                layout // layout ensures smooth animation
                className="h-full w-max p-4"
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    )}
  </div>
);

type MenuProps = PropsWithChildren & {
  setActive: (item: string | null) => void;
};

export const Menu: FC<MenuProps> = ({ setActive, children }) => (
  <nav
    onMouseLeave={() => setActive(null)}
    className="relative flex justify-between space-x-4 rounded-full border border-transparent p-4 align-middle shadow-input dark:border-white/[0.2]"
  >
    {children}
  </nav>
);

type ProductItemProps = {
  title: string;
  description: string;
  href: string;
  src: string;
};

export const ProductItem: FC<ProductItemProps> = ({ title, description, href, src }) => (
  <Link href={href} className="flex space-x-2">
    <AdvImage
      src={src}
      width={140}
      height={70}
      alt={title}
      className="h-auto max-h-36 w-auto max-w-36 flex-shrink-0 rounded-md object-cover shadow-2xl"
    />
    <div className="max-w-48">
      <h4 className="mb-1 line-clamp-2 text-xl font-bold text-black dark:text-white">{title}</h4>
      <p className="line-clamp-4 max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">{description}</p>
    </div>
  </Link>
);

type HoveredLinkProps = BasicComponent<{
  href: string;
}>;

export const HoveredLink: FC<HoveredLinkProps> = ({ children, ...rest }) => (
  <Link {...rest} className="text-neutral-700 hover:text-black dark:text-neutral-200">
    {children}
  </Link>
);
