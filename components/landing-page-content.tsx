"use client";

import { FC, useRef } from "react";
import { Career } from "@/components/career";
import { LandingPageBanner } from "@/components/landing-page-banner";

export const LandingPageContent: FC = () => {
  const landingPageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-auto px-8" ref={landingPageRef}>
      <LandingPageBanner />
      <Career containerRef={landingPageRef} />
    </div>
  );
};
