import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Software I Use | Tushar Shukla',
  description: 'Software, apps, and productivity tools used by Tushar Shukla for development and daily work.',
  openGraph: {
    type: 'website',
    title: 'Software I Use | Tushar Shukla',
    description: 'Software, apps, and productivity tools used by Tushar Shukla for development and daily work.',
    url: absoluteUrl('/uses/software'),
    siteName: 'Tushar Shukla | Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software I Use | Tushar Shukla',
    description: 'Software, apps, and productivity tools used by Tushar Shukla for development and daily work.',
    creator: '@theTSguy',
  },
  alternates: {
    canonical: absoluteUrl('/uses/software'),
  },
};

export default function UsesSoftwareLayout({ children }: { children: ReactNode }) {
  return children;
}
