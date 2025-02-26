import { FC } from "react";
import { FileCode2, MonitorCog, PocketKnife } from 'lucide-react';
import { MechaCard } from "@components/mecha-card";
import { SnapSection } from "@components/snap-container";

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
