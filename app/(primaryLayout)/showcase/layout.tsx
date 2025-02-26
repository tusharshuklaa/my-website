import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection of useful, fun and informative code snippets, github repositories, tools, codepens and more | tusharshukla",
  description:
    "tusharshukla.dev - A collection of useful, fun and informative code snippets, github repositories, tools, codepens and more.",
  keywords: [
    "tushar shukla",
    "code collection",
    "tools collection",
    "code snippets",
    "github repositories",
    "codepens",
    "useful code",
    "fun code",
    "informative code",
    "css art",
    "side projects",
    "web development",
    "frontend",
  ],
  openGraph: {
    url: "https://tusharshukla.dev",
    type: "website",
    title: "Collection of useful, fun and informative code snippets, github repositories, tools, codepens and more | tusharshukla",
    description:
      "tusharshukla.dev - A collection of useful, fun and informative code snippets, github repositories, tools, codepens and more.",
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
    title: "Collection of useful, fun and informative code snippets, github repositories, tools, codepens and more | tusharshukla",
    description:
      "tusharshukla.dev - A collection of useful, fun and informative code snippets, github repositories, tools, codepens and more.",
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

export default function ShowcaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}