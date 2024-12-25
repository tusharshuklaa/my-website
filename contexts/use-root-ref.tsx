import React, { FC, createContext, useContext, useRef, ComponentPropsWithRef } from 'react';
import { motion } from 'framer-motion';

type RootRefContextType = {
  rootRef: React.RefObject<HTMLDivElement>;
}

const RootRefContext = createContext<RootRefContextType | undefined>(undefined);

export const RootRefProvider: FC<ComponentPropsWithRef<"div">> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <RootRefContext.Provider value={{ rootRef }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed left-0 top-0 h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth snap-start snap-normal snap-y snap-proximity scroll-pt-10"
        ref={rootRef}
      >
        {children}
      </motion.div>
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
