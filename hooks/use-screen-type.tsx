import { useState, useEffect, useCallback } from 'react';

/**
 * Screen type object containing boolean values for isDesktop, isTablet, and isMobile.
 */
export type ScreenType = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

// Define breakpoints for mobile, tablet, and desktop
const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
};

/**
 * Custom hook to determine the current screen type: desktop, tablet, or mobile.
 *
 * @returns {ScreenType} An object containing boolean values for isDesktop, isTablet, and isMobile.
 */
export const useScreenType = (): ScreenType => {
  // Function to determine the current screen type
  const getScreenType = useCallback((): ScreenType => {
    if (window.matchMedia(breakpoints.desktop).matches) return { isMobile: false, isTablet: false, isDesktop: true };
    if (window.matchMedia(breakpoints.mobile).matches) return { isMobile: true, isTablet: false, isDesktop: false };
    if (window.matchMedia(breakpoints.tablet).matches) return { isMobile: false, isTablet: true, isDesktop: false };

    return { isMobile: false, isTablet: false, isDesktop: true }; // Fallback in case no match is found
  }, [breakpoints]);

  // State to store the current screen type
  const [screenType, setScreenType] = useState<ScreenType>(getScreenType);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Handler to update screen type with debouncing
    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const newScreenType = getScreenType();
        // Update state only if the screen type has changed
        setScreenType((prevScreenType) =>
          prevScreenType.isMobile !== newScreenType.isMobile ||
          prevScreenType.isTablet !== newScreenType.isTablet ||
          prevScreenType.isDesktop !== newScreenType.isDesktop
            ? newScreenType
            : prevScreenType
        );
      }, 200); // Adjust debounce delay as needed
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Initial check in case the screen size changes before the first render
    handleResize();

    // Cleanup event listener and timeout on unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [getScreenType]);

  return screenType;
};
