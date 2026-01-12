'use client';

import { NavbarDesktop } from '@components/navbar-desktop';
import { NavbarMobile } from '@components/navbar-mobile';
import { useScreenType } from '@hooks/use-screen-type';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const { isMobile } = useScreenType();

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

Navbar.displayName = 'Navbar';
