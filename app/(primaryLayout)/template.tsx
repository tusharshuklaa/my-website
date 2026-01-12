'use client';

import { ContactSection } from '@components/contact-section';
import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { RaiseIssueBanner } from '@components/raise-issue-banner';
import { RootRefProvider } from '@contexts/use-root-ref';
import { ShootingStars, StarsBackground } from '@ui';
import type { ComponentPropsWithoutRef } from 'react';

export default function Template({ children }: ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden bg-background">
        <ShootingStars />
        <StarsBackground />
      </div>

      <RootRefProvider>
        <Navbar />

        {children}

        <RaiseIssueBanner />
        <ContactSection />
        <Footer />
      </RootRefProvider>
    </>
  );
}
