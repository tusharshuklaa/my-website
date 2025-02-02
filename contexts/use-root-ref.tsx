import React, { FC, createContext, useContext, useRef, ComponentPropsWithRef } from 'react';
import { PageTransition } from '@components/page-transition';

type RootRefContextType = {
  rootRef: React.RefObject<HTMLDivElement>;
}

const RootRefContext = createContext<RootRefContextType | undefined>(undefined);

export const RootRefProvider: FC<ComponentPropsWithRef<"div">> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <RootRefContext.Provider value={{ rootRef }}>
      <PageTransition ref={rootRef}>
        {children}
      </PageTransition>
    </RootRefContext.Provider>
  );
};

export const useRootRef = (): RootRefContextType => {
  const context = useContext(RootRefContext);

  if (!context) {
    throw new Error('useRootRef must be used within a RootRefProvider');
  }
  return context;
};
