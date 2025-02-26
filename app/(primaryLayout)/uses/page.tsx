import { FC } from "react";
import { Metadata } from "next";
import { FileCode2, MonitorCog, PocketKnife } from 'lucide-react';
import { MechaCard } from "@components/mecha-card";
import { SnapSection } from "@components/snap-container";

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

const UsesPage: FC = () => {
  return (
    <SnapSection className="min-h-screen w-full pt-32 relative px-4 md:px-8 flex justify-center items-center">
      <div className="flex justify-center items-center lg:gap-x-24 flex-wrap">
        <MechaCard className="my-32" text="Coding" icon={<FileCode2 />} href="/uses/coding" />
        <MechaCard className="my-32" text="Gadgets" icon={<PocketKnife />} href="/uses/gadgets" />
        <MechaCard className="my-32" text="Software" icon={<MonitorCog />} href="/uses/software" />
      </div>
    </SnapSection>
  );
};

export default UsesPage;
