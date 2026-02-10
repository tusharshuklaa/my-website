import type { Metadata } from 'next';
import { HomeClient } from '@/components/pages/home-client';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Tushar Shukla | Senior Frontend Developer',
  description:
    'Portfolio of Tushar Shukla featuring frontend engineering projects, CSS art, technical blogs, and web performance focused work.',
  openGraph: {
    type: 'website',
    title: 'Tushar Shukla | Senior Frontend Developer',
    description: 'Frontend portfolio with projects, blogs, CSS art, and developer resources from Tushar Shukla.',
    url: absoluteUrl('/'),
    siteName: 'Tushar Shukla | Senior Frontend Developer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Shukla | Senior Frontend Developer',
    description: 'Frontend portfolio with projects, blogs, CSS art, and developer resources from Tushar Shukla.',
    creator: '@theTSguy',
  },
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

export default function HomePage() {
  return <HomeClient />;
}
