'use client';

import { FC } from 'react';
import { useScreenType } from '@hooks/use-screen-type';
import { NavbarMobile } from '@components/navbar-mobile';
import { NavbarDesktop } from '@components/navbar-desktop';

export const Navbar:FC = () => {
  const { isMobile } = useScreenType();

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
};

Navbar.displayName = 'Navbar';
