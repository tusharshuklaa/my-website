'use client';

import { useScreenType } from '@hooks/use-screen-type';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';

const ROUTES_TO_PREFETCH = ['/', '/about-me', '/uses', '/blog', '/showcase', '/support-me'];
const NavbarDesktop = dynamic(() => import('@components/navbar-desktop').then(module => module.NavbarDesktop), {
  ssr: false,
});
const NavbarMobile = dynamic(() => import('@components/navbar-mobile').then(module => module.NavbarMobile), {
  ssr: false,
});

export const Navbar: FC = () => {
  const { isMobile } = useScreenType();
  const router = useRouter();

  useEffect(() => {
    ROUTES_TO_PREFETCH.forEach(route => {
      router.prefetch(route);
    });
  }, [router]);

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

Navbar.displayName = 'Navbar';
