"use client";

import { FC, useState, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  AtSign,
  BookOpenText,
  Codepen,
  Command,
  Drama,
  File,
  FolderCode,
  GithubIcon,
  Layers,
  LinkedinIcon,
  Moon,
  PocketKnife,
  Search,
  Sparkles,
  SquareChevronRight,
  Sun,
} from "lucide-react";
import { compareDesc, parseISO } from "date-fns";
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
import { TwitterIcon } from "@components/icons/twitter";
import { useKeyboardShortcut } from "@hooks/use-command-plus-key";
import { allBlogs, Blog } from "@content";
import { openWebsite, ConfettiTypes, shootConfetti } from "@/lib/commandCenterUtils";
import ShowcaseData from "@/data/showcase.json";

const Greetings: FC = () => {
  const today = useMemo(() => new Date(), []);
  const fullDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const greeting = useMemo(() => {
    const hour = today.getHours();
    if (hour < 12) return "Good Morning 🌅";
    if (hour < 18) return "Good Afternoon ☀️";
    return "Good Evening 🌃";
  }, [today]);

  return (
    <div className="flex flex-col gap-2 px-3 py-4 text-xl">
      <span>{greeting}</span>
      <span className="text-sm text-muted-foreground">
        Right now, it&apos;s <span className="font-semibold">{fullDate}</span>
      </span>
    </div>
  );
};

const AllSuggestions: FC<{ latestBlog: Blog }> = ({ latestBlog }) => {
  const showcaseItems = ShowcaseData.showcase.filter(item => item.showInCommandCenter);

  return (
    <CommandGroup heading="Suggestions">
      {latestBlog && (
        <CommandItem onSelect={() => openWebsite(latestBlog.url)}>
          <BookOpenText className="mr-2 h-4 w-4" />
          <span>{latestBlog.title}</span>
          <CommandShortcut className="shrink-0">Latest Blog</CommandShortcut>
        </CommandItem>
      )}

      {showcaseItems.length > 0 &&
        showcaseItems.map(item => (
          <CommandItem key={item.title} onSelect={() => openWebsite(item.url)}>
            <Drama className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
            <CommandShortcut className="shrink-0">Tool</CommandShortcut>
          </CommandItem>
        ))}
    </CommandGroup>
  );
};

const AllFunStuff: FC<{ closeCommandCenter: () => void }> = ({ closeCommandCenter }) => {
  const confettiFn = useCallback(
    (type: ConfettiTypes) => () => {
      closeCommandCenter();
      shootConfetti(type);
    },
    [closeCommandCenter],
  );

  return (
    <CommandGroup heading="Fun Stuff">
      <CommandItem onSelect={confettiFn("basic")}>
        <Sparkles className="mr-2 h-4 w-4" />
        <span>Confetti</span>
        <CommandShortcut className="shrink-0">⌘J</CommandShortcut>
      </CommandItem>

      <CommandItem onSelect={confettiFn("fireworks")}>
        <Sparkles className="mr-2 h-4 w-4" />
        <span>Fireworks</span>
      </CommandItem>

      <CommandItem onSelect={confettiFn("emoji")}>
        <Sparkles className="mr-2 h-4 w-4" />
        <span>Emoji Party</span>
      </CommandItem>
    </CommandGroup>
  );
};

const AllBlogs: FC<{ blogs: Array<Blog> }> = ({ blogs }) => {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading={`Blogs (${blogs.length})`}>
      {blogs.map(blog => (
        <CommandItem
          key={blog.slug}
          onSelect={() => openWebsite(blog.url)}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <BookOpenText className="mr-2 h-4 w-4" />
            <span>{blog.title}</span>
          </div>
          <CommandShortcut className="shrink-0 text-xs">{`${blog.readingTime} min read`}</CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

const AllShowcase = () => {
  const showcaseItems = ShowcaseData.showcase;

  if (showcaseItems.length === 0) {
    return null;
  }
  return (
    <CommandGroup heading={`Showcase (${showcaseItems.length})`}>
      {showcaseItems.map(item => (
        <CommandItem key={item.title} onSelect={() => openWebsite(item.url)}>
          <Drama className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

const AllContacts: FC = () => {
  return (
    <>
      <CommandItem onSelect={() => openWebsite("https://x.com/theTSguy")}>
        <TwitterIcon className="mr-2 h-4 w-4" />
        <span>Find me on X (Twitter)</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://www.linkedin.com/in/tusharshuklaa/")}>
        <LinkedinIcon className="mr-2 h-4 w-4" />
        <span>Find me on LinkedIn</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://github.com/tusharshuklaa")}>
        <GithubIcon className="mr-2 h-4 w-4" />
        <span>Find me on GitHub</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://stackoverflow.com/users/2996624/tushar-shukla")}>
        <Layers className="mr-2 h-4 w-4" />
        <span>Find me on Stack Overflow</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://codepen.io/tusharshukla")}>
        <Codepen className="mr-2 h-4 w-4" />
        <span>Find me on CodePen</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("mailto:tusharshukla.dev@gmail.com")}>
        <AtSign className="mr-2 h-4 w-4" />
        <span>Send me an Email</span>
      </CommandItem>
    </>
  );
};

const AllExtras: FC = () => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <>
      <CommandItem onSelect={toggleTheme}>
        <Sun className="mr-2 h-4 w-4 dark:hidden dark:-rotate-90 dark:scale-0" />
        <Moon className="mr-2 hidden h-4 w-4 rotate-90 scale-0 transition-all dark:block dark:rotate-0 dark:scale-100" />
        <span>Toggle Theme</span>
        <CommandShortcut className="shrink-0">Not Working</CommandShortcut>
      </CommandItem>

      <CommandItem
        onSelect={() =>
          openWebsite("https://drive.google.com/file/d/1FbUKhgGbrNY-dK8ZMX0CcDRnMCxQx3s5/view?usp=sharing")
        }
      >
        <File className="mr-2 h-4 w-4" />
        <span>Download Resume</span>
        <CommandShortcut className="shrink-0">Google Drive</CommandShortcut>
      </CommandItem>
    </>
  );
};

const AllUses: FC = () => {
  return (
    <CommandGroup heading="Uses">
      <CommandItem onSelect={() => openWebsite("/uses/coding")}>
        <SquareChevronRight className="mr-2 h-4 w-4" />
        <span>Coding</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("/uses/gadgets")}>
        <PocketKnife className="mr-2 h-4 w-4" />
        <span>Gadgets</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("/uses/software")}>
        <FolderCode className="mr-2 h-4 w-4" />
        <span>Software</span>
      </CommandItem>
    </CommandGroup>
  );
};

export const CommandCenter: FC = () => {
  const [open, setOpen] = useState(false);

  const openCommandCenter = useCallback(() => setOpen(true), []);
  const closeCommandCenter = useCallback(() => setOpen(false), []);

  useKeyboardShortcut({
    key: "k",
    callback: openCommandCenter,
    modifiers: { ctrl: true, meta: true },
  });

  useKeyboardShortcut({
    key: "j",
    callback: () => shootConfetti("basic"),
    modifiers: { ctrl: true, meta: true },
  });

  const blogs = useMemo(() => {
    return allBlogs.filter(blog => blog.published).sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
  }, []);

  return (
    <>
      <Button
        size="sm"
        onClick={openCommandCenter}
        variant="ghost"
        aria-label="Open command center"
        className="relative w-40 justify-between rounded-full bg-gray-900 transition-colors hover:bg-muted"
      >
        <Search className="h-[1rem] w-[1rem]" />
        <span className="flex items-center font-poppins">
          <Command className="h-3 w-3" />
          &nbsp;K
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search blogs, pages, links..." />

        <Greetings />

        <CommandSeparator />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <AllSuggestions latestBlog={blogs[0]} />

          <CommandSeparator />

          <AllFunStuff closeCommandCenter={closeCommandCenter} />

          <CommandSeparator />

          <CommandGroup>
            <AllExtras />

            <AllContacts />
          </CommandGroup>

          <CommandSeparator />

          {blogs.length > 0 && <AllBlogs blogs={blogs} />}

          <CommandSeparator />

          <AllShowcase />

          <CommandSeparator />

          <AllUses />
        </CommandList>
      </CommandDialog>
    </>
  );
};
