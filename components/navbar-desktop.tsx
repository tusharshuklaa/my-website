"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { compareDesc, format, parseISO } from 'date-fns';
import { cn } from "@/lib/utils";
import { Menu, MenuItem, HoveredLink, ProductItem } from "@components/ui";
import { CommandCenter } from "@components/command-center";
import { TextFlipper } from "@components/text";
import { UiComponent } from "@/types";
import { allBlogs } from '@content';
import { MyAvatar } from "@components/my-avatar";

export const NavbarDesktop: FC<UiComponent> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const blogs = allBlogs
    .filter(blog => blog.published)
    .map(blog => ({
      ...blog,
      date: format(parseISO(blog.date), 'LLLL d, yyyy')
    }))
    .slice(0, 4)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <nav
      className={cn(
        "hidden sm:block group fixed inset-x-0 top-10 z-50 mx-auto sm:max-w-xl lg:max-w-3xl backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%]",
        className,
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient rounded-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />
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
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Blogs" href="/blog">
            <h3 className="text-center font-bold text-2xl mb-4">Recent Blogs</h3>
            <div className="grid grid-cols-2 gap-10 p-4 text-sm">
              {
                blogs.map((blog) => (
                  <ProductItem
                    title={blog.title}
                    href={blog.url}
                    src={blog.img}
                    description={blog.summary}
                  />
                ))
              }
            </div>
          </MenuItem>

          <MenuItem item="Showcase" href="/showcase" />
        </div>

        <div className="flex justify-between space-x-2 align-middle">
          <CommandCenter />
        </div>
      </Menu>
    </nav>
  );
};
