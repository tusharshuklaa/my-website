"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { format, parseISO } from "date-fns";
import { take, filter, map, sortBy } from "lodash";
import { cn } from "@/lib/utils";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@components/ui";
import { CommandCenter } from "@components/command-center";
import { TextFlipper } from "@components/text";
import { UiComponent } from "@/types";
import { allBlogs, Blog } from "@content";
import { MyAvatar } from "@components/my-avatar";
import { DownloadResumeButton } from "@components/download-resume-button";
import { CoolBorder } from "@components/cool-border";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";

const getLimitedBlogs = (blogs: Array<Blog>, limit: number) => {
  const publishedBlogs = filter(blogs, "published");
  const blogsWithFormattedDate = map(publishedBlogs, blog => ({
    ...blog,
    date: format(parseISO(blog.date), "LLLL d, yyyy"),
  }));
  const sortedBlogs = sortBy(blogsWithFormattedDate, blog => new Date(blog.date)).reverse();

  return take(sortedBlogs, limit);
};

export const NavbarDesktop: FC<UiComponent> = ({ className }) => {
  const blogs = getLimitedBlogs(allBlogs, 4);
  const [active, setActive] = useState<string | null>(null);

  const { isHiddenOnScroll, isReady } = useHideOnScroll({
    threshold: 150,
    debounceMs: 50,
  });

  return (
    <motion.nav
      className={cn(
        "group fixed inset-x-0 top-10 z-50 mx-auto hidden backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] sm:block sm:max-w-xl lg:max-w-3xl",
        className,
      )}
      animate={{
        y: isHiddenOnScroll ? "-200%" : "0%",
        opacity: isHiddenOnScroll ? 0 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        ...(isReady ? {} : { duration: 0 }),
      }}
      initial={{
        y: 0,
        opacity: 1,
      }}
    >
      <CoolBorder />
      <Menu setActive={setActive}>
        <Link href="/" className="flex justify-between space-x-2 align-middle">
          <MyAvatar />
          <div className="flex flex-col justify-center align-middle text-xs font-bold uppercase">
            <TextFlipper className="max-w-14">tushar shukla</TextFlipper>
          </div>
        </Link>

        <div className="flex items-center justify-center space-x-4">
          <MenuItem setActive={setActive} active={active} item="About Me" href="/about-me">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/uses">Uses</HoveredLink>
              <HoveredLink href="/#my-crafts">My Crafts</HoveredLink>
              <HoveredLink href="/#work-experience">Work Experience</HoveredLink>
              <HoveredLink href="/#work-status">Work Status</HoveredLink>
              <DownloadResumeButton containerClassName="my-4" />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Blogs" href="/blog">
            <h3 className="mb-4 text-center text-2xl font-bold">Recent Blogs</h3>
            <div className="grid grid-cols-2 gap-10 p-4 text-sm">
              {blogs.map(blog => (
                <ProductItem
                  key={blog.title}
                  title={blog.title}
                  href={blog.url}
                  src={blog.img}
                  description={blog.summary}
                />
              ))}
            </div>
          </MenuItem>

          <MenuItem item="Showcase" href="/showcase" />
        </div>

        <div className="flex justify-between space-x-2 align-middle">
          <CommandCenter />
        </div>
      </Menu>
    </motion.nav>
  );
};
