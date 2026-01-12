import type { Metadata } from 'next';
import { BlogClientPage } from '@/components/pages/blog-client';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Tushar Shukla',
  description:
    'Explore articles on frontend development, web performance, React, TypeScript, CSS art, and web development best practices. Insights from a Senior Frontend Developer.',
  keywords: ['blog', 'frontend development', 'React', 'TypeScript', 'web performance', 'CSS art', 'web development'],
  openGraph: {
    type: 'website',
    title: 'Blog | Tushar Shukla',
    description:
      'Explore articles on frontend development, web performance, React, TypeScript, CSS art, and web development best practices.',
    url: absoluteUrl('/blog'),
    siteName: 'Tushar Shukla | Portfolio',
  },
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
};

export default function BlogPage() {
  return <BlogClientPage />;
}
