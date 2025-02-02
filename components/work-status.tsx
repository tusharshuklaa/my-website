"use client";

import { FC } from 'react';
import { UiComponent } from "@/types";
import { GradientColors } from '@/components/text';
import { useScreenType } from '@/hooks/use-screen-type';
import { WorkStatusMobile } from './work-status-mobile';
import { WorkStatusDesktop } from './work-status-desktop';

const WORK_STATUS = {
  0: "NOT LOOKING",
  1: "ACTIVELY LOOKING",
  2: "CASUALLY LOOKING",
};

const BLIP_COLOR = {
  0: "bg-red-500",
  1: "bg-green-500",
  2: "bg-orange-500",
};

const TEXT_COLOR = {
  0: "red",
  1: "green",
  2: "orange",
};

const BLIP_SHADOW_COLOR = {
  0: "red",
  1: "green",
  2: "orange",
};

type WorkStatusNumber = keyof typeof WORK_STATUS;

export type WorkStatusDeviceProps = {
  id: string;
  workStatusText: typeof WORK_STATUS[WorkStatusNumber];
  blipColor: typeof BLIP_COLOR[WorkStatusNumber];
  textColor: GradientColors;
  blipShadowColor: GradientColors;
};

export const WorkStatus: FC<UiComponent> = ({ className }) => {
  const { isMobile } = useScreenType();
  const currentWorkStatus = 0;
  const workStatusText = WORK_STATUS[currentWorkStatus];
  const blipColor = BLIP_COLOR[currentWorkStatus];
  const textColor = TEXT_COLOR[currentWorkStatus] as GradientColors;
  const blipShadowColor = BLIP_SHADOW_COLOR[currentWorkStatus] as GradientColors;
  const id = "work-status";

  return isMobile ? (
    <WorkStatusMobile
      id={id}
      blipColor={blipColor}
      blipShadowColor={blipShadowColor}
      className={className}
      textColor={textColor}
      workStatusText={workStatusText}
    />
  ) : (
    <WorkStatusDesktop
      id={id}
      blipColor={blipColor}
      blipShadowColor={blipShadowColor}
      className={className}
      textColor={textColor}
      workStatusText={workStatusText}
    />
  );
};

WorkStatus.displayName = 'ContactSection';
