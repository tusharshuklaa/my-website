"use client";

import { Welcome } from "@components/welcome";
import { Career } from "@components/career";
import { Introduction } from "@components/introduction";
import { WorkStatus } from "@components/work-status";
import { ShowcaseSlider } from "@/components/showcase-slider";
import { useIsMounted } from "@hooks/use-is-mounted";

export default function Home() {
  const isPageMounted = useIsMounted();

  return (
    <>
      <Welcome />
      <Introduction />
      <ShowcaseSlider />
      {isPageMounted && <Career />}
      <WorkStatus />
    </>
  );
}
