'use client';

import { ContactSection } from '@components/contact-section';
import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { RaiseIssueBanner } from '@components/raise-issue-banner';
import { RootRefProvider } from '@contexts/use-root-ref';
import dynamic from 'next/dynamic';
import type { ComponentPropsWithoutRef } from 'react';

const BackgroundEffects = dynamic(
  () => import('@components/background-effects').then(module => module.BackgroundEffects),
  { ssr: false },
);

export default function Template({ children }: ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden bg-background">
        <BackgroundEffects />
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
