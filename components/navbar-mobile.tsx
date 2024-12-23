import { FC } from 'react';
import { Menu } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage, Button } from '@ui';
import Link from 'next/link';
import { GradientText, TextFlipper } from '@/components/text';
import { GlowingGradientBox } from './glowing-gradient-box';

export const NavbarMobile: FC = () => {
  return (
    <Drawer data-testid="cmp-mobile-navbar">
      <DrawerTrigger asChild className="sm:hidden z-10">
        <Button variant="clear" size="auto" aria-label="Open mobile navigation" className="absolute right-4 top-4">
          <Menu className="w-10 h-10" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <Link href="/" className="flex justify-center space-y-4 items-center flex-col">
            <GlowingGradientBox className="rounded-full after:rounded-full before:rounded-full">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://avatars.githubusercontent.com/u/7785066?v=4" alt="@tusharshuklaa" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar> 
            </GlowingGradientBox>

            <div className="flex flex-col justify-center align-middle font-bold uppercase">
              <TextFlipper>tushar shukla</TextFlipper>
            </div>
          </Link>
        </DrawerHeader>

        <div>
          <Link href="/web-dev" className="block p-4 text-center">
            <GradientText text="About Me" color="orange" />
          </Link>
          <Link href="/web-dev" className="block p-4 text-center">
            <GradientText text="Blogs" color="purple" />
          </Link>
          <Link href="/web-dev" className="block p-4 text-center">
            <GradientText text="Showcase" color="red" />
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

NavbarMobile.displayName = 'MobileNavbar';
