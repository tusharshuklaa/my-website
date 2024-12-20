"use client";

import { FC, useRef } from "react";
import { Footer } from "@/components/footer";
import { Welcome } from "@/components/welcome";
import { Career } from "@/components/career";
import { Introduction } from "@/components/introduction";

export const PageContent: FC = () => {
  const landingPageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="relative w-full snap-y snap-proximity scroll-pt-10 overflow-y-auto overflow-x-hidden"
        ref={landingPageRef}
      >
        <div className="px-8">
          <Welcome />
          <Introduction />
          <Career pageRef={landingPageRef} />
        </div>
        <Footer />
      </div>
    </>
  );
};
