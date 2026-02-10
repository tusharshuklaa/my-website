'use client';

import { ShootingStars, StarsBackground } from '@components/ui';
import { type FC, useEffect, useState } from 'react';

const START_DELAY_MS = 700;
const SHOOTING_STARS_DELAY_MS = 1800;

const canEnableBackgroundEffects = () => {
  if (typeof window === 'undefined') return false;

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return !isMobile && !prefersReducedMotion;
};

export const BackgroundEffects: FC = () => {
  const [showStarsBackground, setShowStarsBackground] = useState(false);
  const [showShootingStars, setShowShootingStars] = useState(false);

  useEffect(() => {
    if (!canEnableBackgroundEffects()) return;

    const starsTimer = window.setTimeout(() => {
      setShowStarsBackground(true);
    }, START_DELAY_MS);

    const shootingStarsTimer = window.setTimeout(() => {
      setShowShootingStars(true);
    }, SHOOTING_STARS_DELAY_MS);

    return () => {
      window.clearTimeout(starsTimer);
      window.clearTimeout(shootingStarsTimer);
    };
  }, []);

  if (!showStarsBackground && !showShootingStars) return null;

  return (
    <>
      {showStarsBackground && <StarsBackground />}
      {showShootingStars && <ShootingStars />}
    </>
  );
};
