import type { Viewport, Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Dongle, Poppins } from "next/font/google";
import { ThemeProvider } from "@components/theme-provider";
import { InfoBar } from "@components/info-bar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-poppins",
});
const dongle = Dongle({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dongle",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tusharshukla.dev"),
  title: "Tushar Shukla | Portfolio website",
  description: "Frontend Developer Portfolio Website",
  openGraph: {
    siteName: "Tushar Shukla | Portfolio website",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://tusharshukla.dev/rss.xml",
    },
  },
  applicationName: "Tushar Shukla | Portfolio website",
  appleWebApp: {
    title: "Tushar Shukla | Portfolio website",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${dongle.variable} font-poppins antialiased`}>
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
      </body>
    </html>
  );
}
