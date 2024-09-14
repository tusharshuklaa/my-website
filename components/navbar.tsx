"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { CommandCenter } from "@/components/command-center";
import { TextFlipper } from "@/components/text";

type NavbarProps = {
  className?: string;
};

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-3xl", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/" className="flex justify-between space-x-2 align-middle">
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/7785066?v=4"
              alt="@tusharshuklaa"
            />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center align-middle text-xs font-bold uppercase">
            <TextFlipper className="max-w-14">tushar shukla</TextFlipper>
          </div>
        </Link>

        <div className="flex items-center justify-center space-x-4">
          <MenuItem setActive={setActive} active={active} item="About Me">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">
                Interface Design
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Blogs">
            <div className="grid grid-cols-2 gap-10 p-4 text-sm">
              <ProductItem
                title="Algochurn"
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Showcase">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
        </div>

        <div className="flex justify-between space-x-2 align-middle">
          <ModeToggle />
          <CommandCenter />
        </div>
      </Menu>
    </div>
  );
};
