import { FC } from "react";
import { FileCode2, MonitorCog, PocketKnife } from "lucide-react";
import { MechaCard } from "@components/mecha-card";
import { SnapSection } from "@components/snap-container";

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
