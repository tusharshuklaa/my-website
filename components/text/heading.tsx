"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";
import { motion } from "framer-motion";

export const Heading2: FC<BasicUiComponent> = ({ children, className }) => {
  return <h2 className={cn("text-2xl md:text-4xl font-poppins text-black dark:text-white", className)}>{children}</h2>;
};

export const AnimatedHeading: FC<BasicUiComponent> = ({ children, className }) => {
  return (
    <motion.h1
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className={cn(
        "mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl sm:text-4xl font-medium tracking-tight text-transparent md:text-7xl m-auto max-w-[90%] sm:max-w-none",
        className
      )}
    >
      {children}
    </motion.h1>
  );
};
