'use client';

import { Career } from '@components/career';
import { Introduction } from '@components/introduction';
import { Welcome } from '@components/welcome';
import { WorkStatus } from '@components/work-status';
import { useIsMounted } from '@hooks/use-is-mounted';
import { ShowcaseSlider } from '@/components/showcase-slider';

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
