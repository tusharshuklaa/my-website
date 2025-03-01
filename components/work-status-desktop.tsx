import { FC } from "react";
import { cn } from "@/lib/utils";
import { Safari } from "@ui";
import { UiComponent } from "@/types";
import { GradientText } from "@components/text";
import { Blip } from "@components/blip";
import { GlowingGradientBox } from "@components/glowing-gradient-box";
import { WorkStatusDeviceProps } from "@components/work-status";

export const WorkStatusDesktop: FC<UiComponent<WorkStatusDeviceProps>> = ({
  blipColor,
  blipShadowColor,
  className,
  textColor,
  workStatusText,
  id,
}) => {
  const workStatusDesktopClasses = cn("flex flex-col items-center justify-center py-16 min-h-screen", className);

  return (
    <section data-testid={`cmp-work-status-desktop`} className={workStatusDesktopClasses} id={id}>
      <GlowingGradientBox className="z-10 after:rounded-[11px]">
        <Safari
          className="size-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl"
          url="tusharshuklaa.dev/work-status"
          videoSrc="./video/earth.mp4"
          darkenVideo={true}
        >
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 left-12 top-0 m-auto flex h-max w-2/5 flex-col">
              <Blip color={blipColor} className={cn("absolute left-60 top-6", blipShadowColor)} />
              <div>
                <GradientText text="Currently" className="text-screen-sm" color="indigo" />
                <br />
                <GradientText
                  text={workStatusText}
                  className="text-screen-md font-extrabold leading-tight"
                  color={textColor}
                />
                <br />
                <GradientText text="for a job change!" className="text-screen-sm" color="indigo" />
              </div>
              <div className="mt-12 text-screen-xs">
                Psst.. I&apos;m always up for a good conversation or a freelance gig! 😉
              </div>
            </div>

            <div className="absolute bottom-2 right-3 flex flex-col text-screen-xs">
              <span className="text-gray-500">28° 34&apos; 32.88&quot; N / 77° 22&apos; 22.73&quot; E</span>
              <span className="text-white">Remote from Noida, India</span>
            </div>
          </div>
        </Safari>
      </GlowingGradientBox>
    </section>
  );
};

WorkStatusDesktop.displayName = "ContactSection";
