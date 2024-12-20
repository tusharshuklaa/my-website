"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BookOpenText, Command, Moon, Search, Sun, User } from "lucide-react";
import {
  Button,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@ui";
import { TwitterIcon } from "@/components/icons/twitter";

export const CommandCenter: FC = () => {
  const [open, setOpen] = useState(false);

  // theme toggle
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openCommandCenter = () => setOpen(true);

  const toggleTheme = () => setTheme(() => (theme === "light" ? "dark" : "light"));

  const goToX = () => window.open("https://x.com/theTSguy");

  const today = new Date();
  const fullDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const greeting =
    today.getHours() < 12 ? "Good Morning 🌅" : today.getHours() < 18 ? "Good Afternoon 🔅" : "Good Evening 🌃";

  return (
    <>
      <Button
        size="sm"
        onClick={openCommandCenter}
        variant="ghost"
        aria-label="open command center"
        className="relative w-40 justify-between rounded-full bg-gray-300 dark:bg-gray-800"
      >
        <Search className="h-[1rem] w-[1rem]" />
        <span className="flex items-center font-poppins">
          <Command className="h-3 w-3" />
          &nbsp;K
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search blogs, pages, links..." />

        <div className="flex flex-col gap-2 px-3 py-4 text-xl">
          <span>{greeting}</span>
          <span className="text-sm">
            Right now, it&apos;s, <span className="font-bold">{fullDate}</span>{" "}
          </span>
        </div>

        <CommandSeparator />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={toggleTheme}>
              <Sun className="mr-2 h-4 w-4 dark:hidden dark:-rotate-90 dark:scale-0" />
              <Moon className="mr-2 hidden h-4 w-4 rotate-90 scale-0 transition-all dark:block dark:rotate-0 dark:scale-100" />
              <span>Toggle Theme</span>
            </CommandItem>

            <CommandItem onSelect={goToX}>
              <TwitterIcon />
              <span>Find me on X (Twitter)</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Fun Stuff">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Confetti</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Blogs">
            <CommandItem>
              <BookOpenText className="mr-2 h-4 w-4" />
              <span>Getting started with Hello World</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Showcase">
            <CommandItem>
              <BookOpenText className="mr-2 h-4 w-4" />
              <span>The dark knight rises - with CSS</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
