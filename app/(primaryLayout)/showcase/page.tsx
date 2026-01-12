import type { Metadata } from 'next';
import type { FC } from 'react';
import { ShowcaseClientPage } from '@/components/pages/showcase-client';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Showcase | Tushar Shukla',
  description:
    'Explore my creative projects and showcase of work including CSS art, interactive games, and code experiments on GitHub Gists and CodePen.',
  keywords: ['showcase', 'projects', 'CSS art', 'interactive design', 'CodePen', 'GitHub'],
  openGraph: {
    type: 'website',
    title: 'Showcase | Tushar Shukla',
    description: 'Creative projects and portfolio showcase including CSS art, games, and interactive experiments.',
    url: absoluteUrl('/showcase'),
    siteName: 'Tushar Shukla | Portfolio',
  },
  alternates: {
    canonical: absoluteUrl('/showcase'),
  },
};

const ShowcasePage: FC = () => {
  return <ShowcaseClientPage />;
};

export default ShowcasePage;
