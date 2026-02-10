import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Gadgets I Use | Tushar Shukla',
  description: 'Hardware and gadgets used by Tushar Shukla for development, productivity, and daily workflows.',
  openGraph: {
    type: 'website',
    title: 'Gadgets I Use | Tushar Shukla',
    description: 'Hardware and gadgets used by Tushar Shukla for development, productivity, and daily workflows.',
    url: absoluteUrl('/uses/gadgets'),
    siteName: 'Tushar Shukla | Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gadgets I Use | Tushar Shukla',
    description: 'Hardware and gadgets used by Tushar Shukla for development, productivity, and daily workflows.',
    creator: '@theTSguy',
  },
  alternates: {
    canonical: absoluteUrl('/uses/gadgets'),
  },
};

export default function UsesGadgetsLayout({ children }: { children: ReactNode }) {
  return children;
}
