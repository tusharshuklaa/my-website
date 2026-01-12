import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend and Productivity Blogs | tusharshukla',
  description:
    'tusharshukla.dev - Programming blog for everyone to learn React, Next.js, JavaScript, CSS, Tailwind, Web Development, Tips and Tricks, Productivity hacks, and more.',
  keywords: [
    'javascript',
    'react',
    'next.js',
    'css',
    'productivity',
    'tips and tricks',
    'programming',
    'web development',
    'frontend',
    'frontend blogs',
    'tushar shukla',
    'css art',
  ],
  openGraph: {
    url: 'https://tusharshukla.dev',
    type: 'website',
    title: 'Frontend and Productivity Blogs | tusharshukla',
    description:
      'tusharshukla.dev - Programming blog for everyone to learn React, Next.js, JavaScript, CSS, Tailwind, Web Development, Tips and Tricks, Productivity hacks, and more.',
    images: [
      {
        url: 'https://tusharshukla.dev/images/tusharshukla_website.png',
        width: 1200,
        height: 630,
        alt: 'tusharshukla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend and Productivity Blogs | tusharshukla',
    description:
      'tusharshukla.dev - Programming blog for everyone to learn React, Next.js, JavaScript, CSS, Tailwind, Web Development, Tips and Tricks, Productivity hacks, and more.',
    creator: '@theTSguy',
    site: '@theTSguy',
    images: [
      {
        url: 'https://tusharshukla.dev/images/tusharshukla_website.png',
        width: 1200,
        height: 630,
        alt: 'tusharshukla',
      },
    ],
  },
  alternates: {
    canonical: 'https://tusharshukla.dev',
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
