"use client";

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

export default function Template({ children }: ComponentPropsWithoutRef<"div">) {
  return (
    <motion.div
      className="fixed left-0 top-0 h-screen w-full overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
