import { FC } from "react";
import { FlipWords } from "@ui/flip-words";
import { FunText } from "@ui/fun-text";

export const LandingPageBanner: FC = () => {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center px-4">
      <div className="text-screen-sm">
        <span className="font-extrabold [text-shadow:-2px_2px_0_navajowhite]">Namaste</span> 🙏🏻 I&apos;m{" "}
      </div>
      <FunText className="text-screen-lg">Tushar Shukla</FunText>
      <div className="text-screen-sm">
        and I <span className="[text-shadow:0_0_1rem_red]">❤️</span>
      </div>
      <FlipWords className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-screen-sm text-transparent [--bg-size:300%]" />
    </section>
  );
};
