"use client";

import { FC } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export const ModeToggle: FC = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(() => (theme === "light" ? "dark" : "light"));
  };

  return (
    <Toggle size="sm" aria-label="Toggle mode" onClick={toggleTheme} variant="icon">
      <Sun className="block h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute hidden h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:block dark:rotate-0 dark:scale-100" />
    </Toggle>
  );
};
