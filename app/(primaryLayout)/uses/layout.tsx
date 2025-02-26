import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses | tusharshukla",
  description:
    "A growing list of tools, programs and tech that I use to make my life easier and more productive.",
  keywords: [
    "tushar shukla uses",
    "uses",
    "developer tools",
    "coding tools",
    "gadgets",
    "software",
    "macos apps",
    "web development tools",
    "frontend tools",
    "productivity",
    "tips and tricks",
    "programming",
    "web development",
    "frontend",
  ],
  openGraph: {
    url: "https://tusharshukla.dev",
    type: "website",
    title: "Uses | tusharshukla",
    description:
      "A growing list of tools, programs and tech that I use to make my life easier and more productive.",
    images: [
      {
        url: "https://tusharshukla.dev/images/tusharshukla_website.png",
        width: 1200,
        height: 630,
        alt: "tusharshukla"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Uses | tusharshukla",
    description:
      "A growing list of tools, programs and tech that I use to make my life easier and more productive.",
    creator: "@theTSguy",
    site: "@theTSguy",
    images: [
      {
        url: "https://tusharshukla.dev/images/tusharshukla_website.png",
        width: 1200,
        height: 630,
        alt: "tusharshukla"
      }
    ]
  },
  alternates: {
    canonical: "https://tusharshukla.dev"
  }
};

export default function UsesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}