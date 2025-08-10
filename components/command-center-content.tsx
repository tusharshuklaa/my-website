"use client";

import { FC, useCallback, useMemo } from "react";
import { UiComponent } from "@/types";
import { useTheme } from "next-themes";
import {
  AtSign,
  BookOpenText,
  Codepen,
  Drama,
  File,
  FolderCode,
  GithubIcon,
  Layers,
  LinkedinIcon,
  Moon,
  PocketKnife,
  Sparkles,
  SquareChevronRight,
  Sun,
} from "lucide-react";
import { compareDesc, parseISO } from "date-fns";
import {
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
import { allBlogs, Blog } from "@content";
import { openWebsite, ConfettiTypes, shootConfetti } from "@/lib/commandCenterUtils";
import ShowcaseData from "@/data/showcase.json";

type WithCloseCommandCenter = {
  closeCommandCenter: () => void;
};

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
    <div className="hidden items-center justify-between gap-4 px-3 py-6 text-center sm:flex">
      <span className="text-xl tracking-wider">{greeting}</span>
      <span className="font-mono text-xs tracking-wider text-muted">{fullDate}</span>
    </div>
  );
};

const AllSuggestions: FC<{ latestBlog: Blog } & WithCloseCommandCenter> = ({ latestBlog, closeCommandCenter }) => {
  const showcaseItems = ShowcaseData.showcase.filter(item => item.showInCommandCenter);

  return (
    <CommandGroup heading="Suggestions">
      {latestBlog && (
        <CommandItem onSelect={() => openWebsite(latestBlog.url, closeCommandCenter)}>
          <BookOpenText className="mr-2 h-4 w-4 shrink-0" />
          <span className="line-clamp-2 sm:line-clamp-1">{latestBlog.title}</span>
          <CommandShortcut className="shrink-0">Latest Blog</CommandShortcut>
        </CommandItem>
      )}

      {showcaseItems.length > 0 &&
        showcaseItems.map(item => (
          <CommandItem key={item.title} onSelect={() => openWebsite(item.url, closeCommandCenter)}>
            <Drama className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
            <CommandShortcut className="shrink-0">Tool</CommandShortcut>
          </CommandItem>
        ))}
    </CommandGroup>
  );
};

const AllFunStuff: FC<WithCloseCommandCenter> = ({ closeCommandCenter }) => {
  const confettiFn = useCallback(
    (type: ConfettiTypes) => () => {
      closeCommandCenter();
      shootConfetti(type);
    },
    [closeCommandCenter],
  );

  return (
    <CommandGroup heading="Fun Stuff" className="mt-2">
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
    <CommandGroup heading={`Blogs (${blogs.length})`} className="mt-2">
      {blogs.map(blog => (
        <CommandItem
          key={blog.slug}
          onSelect={() => openWebsite(blog.url)}
          className="flex items-center justify-between gap-1"
        >
          <div className="flex items-center">
            <BookOpenText className="mr-2 h-4 w-4 shrink-0" />
            <span className="line-clamp-2 sm:line-clamp-1">{blog.title}</span>
          </div>
          <CommandShortcut className="shrink-0 text-xs">{`${blog.readingTime} min read`}</CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

const AllShowcase: FC<WithCloseCommandCenter> = ({ closeCommandCenter }) => {
  const showcaseItems = ShowcaseData.showcase;

  if (showcaseItems.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading={`Showcase (${showcaseItems.length})`}>
      {showcaseItems.map(item => (
        <CommandItem key={item.title} onSelect={() => openWebsite(item.url, closeCommandCenter)}>
          <Drama className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

const AllContacts: FC<WithCloseCommandCenter> = ({ closeCommandCenter }) => {
  return (
    <>
      <CommandItem onSelect={() => openWebsite("https://x.com/theTSguy", closeCommandCenter)}>
        <TwitterIcon className="mr-2 h-4 w-4" />
        <span>Find me on X (Twitter)</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://www.linkedin.com/in/tusharshuklaa/", closeCommandCenter)}>
        <LinkedinIcon className="mr-2 h-4 w-4" />
        <span>Find me on LinkedIn</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://github.com/tusharshuklaa", closeCommandCenter)}>
        <GithubIcon className="mr-2 h-4 w-4" />
        <span>Find me on GitHub</span>
      </CommandItem>

      <CommandItem
        onSelect={() => openWebsite("https://stackoverflow.com/users/2996624/tushar-shukla", closeCommandCenter)}
      >
        <Layers className="mr-2 h-4 w-4" />
        <span>Find me on Stack Overflow</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("https://codepen.io/tusharshukla", closeCommandCenter)}>
        <Codepen className="mr-2 h-4 w-4" />
        <span>Find me on CodePen</span>
      </CommandItem>

      <CommandItem onSelect={() => openWebsite("mailto:tusharshukla.dev@gmail.com", closeCommandCenter)}>
        <AtSign className="mr-2 h-4 w-4" />
        <span>Send me an Email</span>
      </CommandItem>
    </>
  );
};

const AllExtras: FC<WithCloseCommandCenter> = ({ closeCommandCenter }) => {
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
          openWebsite(
            "https://drive.google.com/file/d/1FbUKhgGbrNY-dK8ZMX0CcDRnMCxQx3s5/view?usp=sharing",
            closeCommandCenter,
          )
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

type CommandCenterContentProps = UiComponent<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export const CommandCenterContent: FC<CommandCenterContentProps> = ({ isOpen, setIsOpen }) => {
  const blogs = useMemo(() => {
    return allBlogs.filter(blog => blog.published).sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
  }, []);

  const closeCommandCenter = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} aria-describedby="command-dialog">
      <CommandInput placeholder="Search blogs, pages, links..." />

      <Greetings />

      <CommandSeparator />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <AllSuggestions latestBlog={blogs[0]} closeCommandCenter={closeCommandCenter} />

        <CommandSeparator className="my-2" />

        <AllFunStuff closeCommandCenter={closeCommandCenter} />

        <CommandSeparator className="my-2" />

        <CommandGroup className="mt-2">
          <AllExtras closeCommandCenter={closeCommandCenter} />

          <AllContacts closeCommandCenter={closeCommandCenter} />
        </CommandGroup>

        <CommandSeparator />

        {blogs.length > 0 && <AllBlogs blogs={blogs} />}

        <CommandSeparator className="my-2" />

        <AllShowcase closeCommandCenter={closeCommandCenter} />

        <CommandSeparator className="my-2" />

        <AllUses />
      </CommandList>
    </CommandDialog>
  );
};

CommandCenterContent.displayName = "CommandCenterContent";
