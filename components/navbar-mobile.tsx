import { FC } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@ui';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { GradientText, TextFlipper } from '@components/text';
import { GlowingGradientBox } from '@components/glowing-gradient-box';
import { MyAvatar } from '@components/my-avatar';
import { DownloadResumeButton } from '@components/download-resume-button';

export const NavbarMobile: FC = () => {
  return (
    <Drawer data-testid="cmp-mobile-navbar">
      <DrawerTrigger asChild className="sm:hidden z-10">
        <Button variant="clear" size="auto" aria-label="Open mobile navigation" className="fixed right-4 top-4">
          <Menu className="w-10 h-10" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <Link href="/" className="flex justify-center space-y-4 items-center flex-col">
            <GlowingGradientBox className="rounded-full after:rounded-full before:rounded-full">
              <MyAvatar />
            </GlowingGradientBox>

            <div className="flex flex-col justify-center align-middle font-bold uppercase">
              <TextFlipper>tushar shukla</TextFlipper>
            </div>
          </Link>
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

          <div className="flex items-center justify-center my-4">
            <DownloadResumeButton />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

NavbarMobile.displayName = 'MobileNavbar';
