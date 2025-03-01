import { FC } from "react";
import { FunText } from "@/components/text";
import { SnapSection } from "@/components/snap-container";

export const Welcome: FC = () => {
  return (
    <SnapSection className="flex h-screen w-full flex-col items-center justify-center px-4 text-center">
      <div className="absolute flex animate-welcome-text gap-4 leading-extra-tight">
        <span className="font-dongle text-screen-2xl font-extrabold tracking-wider [text-shadow:-2px_2px_0_navajowhite]">
          Namaste
        </span>
        <span className="text-screen-xl">🙏🏻</span>
      </div>

      <div className="absolute">
        <div className="mb-8 animate-fade-in font-dongle text-screen-lg opacity-0">I&apos;m</div>
        <FunText className="text-screen-lg" />
      </div>
    </SnapSection>
  );
};
