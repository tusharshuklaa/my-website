import { FC } from "react";
import { Cover, FlipWords } from "@ui";
import { SnapSection } from "@/components/snap-container";
import { GradientText } from "./text";

export const Introduction: FC = () => {
  return (
    <SnapSection className="flex h-screen min-h-svh w-full flex-col items-center justify-center gap-5 px-4 text-center">
      <div className="text-screen-sm">
        I&apos;m a<Cover><GradientText text="Front End Engineer" color="green" /></Cover>with
      </div>

      <div className="text-screen-sm">
        over <GradientText text="10 years" color="blue" /> of experience & I <span className="[text-shadow:0_0_1rem_red]">❤️</span>
      </div>

      <FlipWords className="min-h-[67px] animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-screen-sm text-transparent [--bg-size:300%]" />
    </SnapSection>
  );
};
