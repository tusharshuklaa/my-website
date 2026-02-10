import { InfoBar } from '@components/info-bar';
import { ThemeProvider } from '@components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Dongle, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '600'],
  variable: '--font-poppins',
});
const dongle = Dongle({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dongle',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tusharshukla.dev'),
  title: 'Tushar Shukla | Senior Frontend Developer',
  description:
    'Portfolio of Tushar Shukla, a Senior Frontend Developer sharing projects, CSS art, frontend blogs, and web performance insights.',
  openGraph: {
    url: 'https://tusharshukla.dev',
    siteName: 'Tushar Shukla | Senior Frontend Developer',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://res.cloudinary.com/dx91z87ok/image/upload/v1/og-default',
        width: 1200,
        height: 630,
        alt: 'Tushar Shukla | Senior Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tushar Shukla | Senior Frontend Developer',
    description:
      'Portfolio of Tushar Shukla, a Senior Frontend Developer sharing projects, CSS art, frontend blogs, and web performance insights.',
    creator: '@theTSguy',
    images: ['https://res.cloudinary.com/dx91z87ok/image/upload/v1/og-default'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  applicationName: 'Tushar Shukla | Portfolio website',
  appleWebApp: {
    title: 'Tushar Shukla | Portfolio website',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    shortcut: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tushar Shukla',
    url: 'https://tusharshukla.dev',
    inLanguage: 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tushar Shukla',
    url: 'https://tusharshukla.dev',
    image: 'https://tusharshukla.dev/images/tusharshukla_website.png',
    jobTitle: 'Senior Frontend Developer',
    sameAs: [
      'https://github.com/tusharshuklaa',
      'https://www.linkedin.com/in/tusharshuklaa/',
      'https://x.com/theTSguy',
      'https://codepen.io/tusharshukla',
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${dongle.variable} font-poppins antialiased`}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needed for seo
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <InfoBar hidden={true}>🚧 This website is under construction. Please expect bugs 🐛</InfoBar>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
