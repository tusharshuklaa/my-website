import React, { FC, createContext, useContext, useRef, ComponentPropsWithRef, useEffect, useCallback } from "react";
import { PageTransition } from "@components/page-transition";

type RootRefContextType = {
  rootRef: React.RefObject<HTMLDivElement>;
  mainRef: React.RefObject<HTMLElement>;
  isMainReady: boolean;
};

const RootRefContext = createContext<RootRefContextType | undefined>(undefined);

export const RootRefProvider: FC<ComponentPropsWithRef<"div">> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [isMainReady, setIsMainReady] = React.useState(false);

  const setMainRef = useCallback((element: HTMLElement | null) => {
    if (element) {
      Object.defineProperty(mainRef, "current", {
        value: element,
        writable: false,
        configurable: true,
      });
      setIsMainReady(true);
    }
  }, []);

  useEffect(() => {
    const mainElement = document.getElementById("main") as HTMLElement;
    if (mainElement) {
      setMainRef(mainElement);
    } else {
      const timer = setTimeout(() => {
        const retryElement = document.getElementById("main") as HTMLElement;
        if (retryElement) {
          setMainRef(retryElement);
        }
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [setMainRef]);

  return (
    <RootRefContext.Provider value={{ rootRef, mainRef, isMainReady }}>
      <PageTransition ref={rootRef}>{children}</PageTransition>
    </RootRefContext.Provider>
  );
};

export const useRootRef = (): RootRefContextType => {
  const context = useContext(RootRefContext);

  if (!context) {
    throw new Error("useRootRef must be used within a RootRefProvider");
  }
  return context;
};
