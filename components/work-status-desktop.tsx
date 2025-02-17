import { FC } from 'react';
import { cn } from "@/lib/utils";
import { Safari } from "@ui";
import { UiComponent } from "@/types";
import { GradientText } from '@components/text';
import { Blip } from '@components/blip';
import { GlowingGradientBox } from '@components/glowing-gradient-box';
import { WorkStatusDeviceProps } from '@components/work-status';

export const WorkStatusDesktop: FC<UiComponent<WorkStatusDeviceProps>> = ({ blipColor, blipShadowColor, className, textColor, workStatusText, id }) => {
  const workStatusDesktopClasses = cn('flex flex-col items-center justify-center py-16 min-h-screen', className);

  return (
    <section data-testid={`cmp-work-status-desktop`} className={workStatusDesktopClasses} id={id}>
      <GlowingGradientBox className="z-10 after:rounded-[11px]">
        <Safari
          className="sm:max-w-2xl md:max-w-3xl lg:max-w-5xl size-full"
          url="tusharshuklaa.dev/work-status"
          videoSrc="./video/earth.mp4"
          darkenVideo={true}
        >
          <div className="relative h-full w-full">
            <div className="w-2/5 flex flex-col absolute left-12 top-0 bottom-0 m-auto h-max">
              <Blip color={blipColor} className={cn("absolute left-60 top-6", blipShadowColor)} />
              <div>
                <GradientText
                  text="Currently"
                  className="text-screen-sm"
                  color="indigo"
                /><br />
                <GradientText
                  text={workStatusText}
                  className="text-screen-md leading-tight font-extrabold"
                  color={textColor}
                /><br />
                <GradientText
                  text="for a job change!"
                  className="text-screen-sm"
                  color="indigo"
                />
              </div>
              <div className="text-screen-xs mt-12">
                Psst.. I&apos;m always up for a good conversation or a freelance gig! 😉
              </div>
            </div>

            <div className="flex flex-col absolute bottom-2 right-3 text-screen-xs">
              <span className="text-gray-500">28° 34' 32.88" N / 77° 22' 22.73" E</span>
              <span className="text-white">Remote from Noida, India</span>
            </div>
          </div>
        </Safari>
      </GlowingGradientBox>
    </section>
  );
};

WorkStatusDesktop.displayName = 'ContactSection';
