"use client";

import { FC } from "react";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { WorkStatusDeviceProps } from "@components/work-status";
import { Iphone15Pro } from "@ui";
import { GlowingGradientBox } from "@components/glowing-gradient-box";
import { Blip } from "@components/blip";
import { GradientText } from "@components/text";

export const WorkStatusMobile: FC<UiComponent<WorkStatusDeviceProps>> = ({
  blipColor,
  blipShadowColor,
  className,
  id,
  textColor,
  workStatusText,
}) => {
  const workStatusMobileClasses = cn("pt-12", className);

  return (
    <section data-testid="cmp-work-status-mobile" className={workStatusMobileClasses} id={id}>
      <GlowingGradientBox className="z-10 m-auto w-max rounded-[52px] before:rounded-[52px] after:rounded-[52px]">
        <Iphone15Pro className="size-full max-w-xs" darkenVideo={true} videoSrc="./video/earth_mobile.mp4">
          <div className="relative flex h-full w-full flex-col">
            <div className="absolute bottom-20 top-20 m-auto px-4">
              <Blip
                color={blipColor}
                size={35}
                className={cn(
                  "absolute bottom-0 right-8 top-0 m-auto h-4 -translate-y-2 translate-x-0.5",
                  blipShadowColor,
                )}
              />
              <div>
                <GradientText text="Currently" className="text-4xl" color="indigo" />
                <br />
                <GradientText
                  text={workStatusText}
                  className="text-6xl font-extrabold leading-tight"
                  color={textColor}
                />
                <br />
                <GradientText text="for a job change!" className="text-4xl" color="indigo" />
              </div>
              <div className="absolute bottom-16 mt-12 text-3xl">
                Psst.. I&apos;m always up for a good conversation or a freelance gig! 😉
              </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 m-auto flex w-max flex-col text-center text-sm">
              <span className="text-gray-300">28° 34' 32.88" N / 77° 22' 22.73" E</span>
              <span className="text-white">Remote from Noida, India</span>
            </div>
          </div>
        </Iphone15Pro>
      </GlowingGradientBox>
    </section>
  );
};

WorkStatusMobile.displayName = "WorkStatusMobile";
