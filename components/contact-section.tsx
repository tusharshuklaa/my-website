import { FC } from 'react';
import { motion } from "framer-motion";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { SnapSection } from '@/components/snap-container';
import { GradientText } from './text';

export const ContactSection: FC<UiComponent> = ({ className, ...props }) => {
  const contactSectionClasses = cn('max-w-7xl m-auto min-h-screen flex flex-col justify-center', className);

  return (
    <SnapSection data-testid={`cmp-contact-section`} className={contactSectionClasses} {...props}>
      <motion.h3
        initial={{
          opacity: 0,
          x: 50
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1
          },
        }}
      >
        <GradientText
          text="And that's a wrap!"
          color="orange"
          className="text-screen-lg"
        />
      </motion.h3>

      <motion.h3
        initial={{
          opacity: 0,
          x: 100
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 2
          }
        }}
      >
        <GradientText
          text="Piqued your interest?"
          color="purple"
          className="text-screen-lg"
        />
      </motion.h3>

      <motion.h3
        initial={{
          opacity: 0,
          x: 200
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 3
          }
        }}
      >
        <GradientText
          text="Let's connect!"
          color="blue"
          className="text-screen-lg"
        />
      </motion.h3>
    </SnapSection>
  );
};

ContactSection.displayName = 'ContactSection';