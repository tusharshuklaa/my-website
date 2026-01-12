'use client';

import { ContactSection } from '@components/contact-section';
import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { Toaster } from '@ui';
import type { ComponentPropsWithoutRef } from 'react';
import { RootRefProvider } from '@/contexts/use-root-ref';

export default function Template({ children }: ComponentPropsWithoutRef<'div'>) {
  return (
    <RootRefProvider>
      <Navbar />
      <main
        className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-slate-950 selection:bg-fuchsia-300 selection:text-fuchsia-900"
        id="main"
      >
        {children}
        <ContactSection />
        <Footer />
        <Toaster position="top-right" richColors closeButton />
      </main>
    </RootRefProvider>
  );
}
