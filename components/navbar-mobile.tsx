import { FC } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@ui";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { GradientText, TextFlipper } from "@components/text";
import { GlowingGradientBox } from "@components/glowing-gradient-box";
import { MyAvatar } from "@components/my-avatar";
import { DownloadResumeButton } from "@components/download-resume-button";
import { SupportButton } from "@components/support-button";
import { CommandCenter } from "@components/command-center";

export const NavbarMobile: FC = () => {
  return (
    <Drawer data-testid="cmp-mobile-navbar">
      <DrawerTrigger asChild className="z-10 sm:hidden">
        <Button variant="clear" size="auto" aria-label="Open mobile navigation" className="fixed right-4 top-4">
          <Menu className="h-10 w-10" />
        </Button>
      </DrawerTrigger>

      <DrawerContent aria-describedby="mobile-navbar-content" className="sm:hidden">
        <DrawerHeader>
          <Link href="/" className="flex flex-col items-center justify-center space-y-4">
            <GlowingGradientBox className="rounded-full before:rounded-full after:rounded-full">
              <MyAvatar />
            </GlowingGradientBox>

            <div className="flex flex-col justify-center align-middle font-bold uppercase">
              <TextFlipper>tushar shukla</TextFlipper>
            </div>
          </Link>

          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <CommandCenter />
          </div>
        </DrawerHeader>

        <div>
          <Link href="/about-me" className="block p-4 text-center">
            <GradientText text="About Me" color="orange" />
          </Link>
          <Link href="/uses" className="block p-4 text-center">
            <GradientText text="Uses" color="indigo" />
          </Link>
          <Link href="/#my-crafts" className="block p-4 text-center">
            <GradientText text="My Crafts" color="green" />
          </Link>
          <Link href="/#work-experience" className="block p-4 text-center">
            <GradientText text="Work Experience" color="pink" />
          </Link>
          <Link href="/#work-status" className="block p-4 text-center">
            <GradientText text="Work Status" color="yellow" />
          </Link>
          <Link href="/blog" className="block p-4 text-center">
            <GradientText text="Blogs" color="purple" />
          </Link>
          <Link href="/showcase" className="block p-4 text-center">
            <GradientText text="Showcase" color="red" />
          </Link>

          <div className="my-4 flex items-center justify-center gap-4">
            <DownloadResumeButton />
            <SupportButton />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

NavbarMobile.displayName = "MobileNavbar";
