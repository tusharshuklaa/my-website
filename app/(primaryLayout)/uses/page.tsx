import { MechaCard } from '@components/mecha-card';
import { SnapSection } from '@components/snap-container';
import { FileCode2, MonitorCog, PocketKnife } from 'lucide-react';
import type { Metadata } from 'next';
import type { FC } from 'react';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Uses | Tushar Shukla',
  description:
    'Discover the tools, software, gadgets, and technologies I use daily for web development and productivity.',
  keywords: ['uses', 'tools', 'coding', 'gadgets', 'software', 'development stack'],
  openGraph: {
    type: 'website',
    title: 'Uses | Tushar Shukla',
    description: 'The tools, software, and gadgets I use for web development and daily work.',
    url: absoluteUrl('/uses'),
    siteName: 'Tushar Shukla | Portfolio',
  },
  alternates: {
    canonical: absoluteUrl('/uses'),
  },
};

const UsesPage: FC = () => {
  return (
    <SnapSection className="relative flex min-h-screen w-full items-center justify-center px-4 pt-32 md:px-8">
      <div className="flex flex-wrap items-center justify-center lg:gap-x-24">
        <MechaCard className="my-32" text="Coding" icon={<FileCode2 />} href="/uses/coding" />
        <MechaCard className="my-32" text="Gadgets" icon={<PocketKnife />} href="/uses/gadgets" />
        <MechaCard className="my-32" text="Software" icon={<MonitorCog />} href="/uses/software" />
      </div>
    </SnapSection>
  );
};

export default UsesPage;
