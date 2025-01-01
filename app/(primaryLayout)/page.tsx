"use client";

import { Welcome } from "@components/welcome";
import { Career } from "@components/career";
import { Introduction } from "@components/introduction";
import { WorkStatus } from "@components/work-status";
import { useIsMounted } from "@hooks/use-is-mounted";

export default function Home() {
  const isPageMounted = useIsMounted();

  return (
    <>
      <Welcome />
      <Introduction />
      {isPageMounted && <Career />}
      <WorkStatus />
    </>
  );
}
