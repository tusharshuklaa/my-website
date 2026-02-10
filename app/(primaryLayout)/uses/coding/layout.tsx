import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Coding Tools I Use | Tushar Shukla',
  description: 'Coding tools, editor setup, and developer workflow utilities used by Tushar Shukla.',
  openGraph: {
    type: 'website',
    title: 'Coding Tools I Use | Tushar Shukla',
    description: 'Coding tools, editor setup, and developer workflow utilities used by Tushar Shukla.',
    url: absoluteUrl('/uses/coding'),
    siteName: 'Tushar Shukla | Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Tools I Use | Tushar Shukla',
    description: 'Coding tools, editor setup, and developer workflow utilities used by Tushar Shukla.',
    creator: '@theTSguy',
  },
  alternates: {
    canonical: absoluteUrl('/uses/coding'),
  },
};

export default function UsesCodingLayout({ children }: { children: ReactNode }) {
  return children;
}
