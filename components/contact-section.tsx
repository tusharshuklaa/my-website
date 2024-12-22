import { FC } from 'react';
import { motion } from "framer-motion";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { SnapSection } from '@/components/snap-container';
import { GradientText } from '@/components/text';
import { AnimatedLink, AnimatedLinkProps } from '@/components/animated-link';

export const ContactSection: FC<UiComponent> = ({ className, ...props }) => {
  const contactSectionClasses = cn('max-w-7xl m-auto min-h-screen flex flex-col justify-center', className);
  const contactLinks: Array<AnimatedLinkProps> = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tusharshuklaa/",
      color: "blue"
    },
    {
      name: "GitHub",
      url: "https://github.com/tusharshuklaa",
      color: "purple"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/theTSguy",
      color: "indigo"
    },
    {
      name: "Stack Overflow",
      url: "https://stackoverflow.com/users/2996624/tushar-shukla",
      color: "orange"
    },
    {
      name: "Telegram",
      url: "https://t.me/thetsguy",
      color: "green"
    },
    {
      name: "Codepen",
      url: "https://codepen.io/tusharshukla",
      color: "pink"
    },
    {
      name: "Email",
      url: "mailto:tusharshuklaa@gmail.com",
      color: "red"
    }
  ];

  return (
    <SnapSection data-testid={`cmp-contact-section`} className={contactSectionClasses} {...props}>
      <div>
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
              duration: 2.2
            }
          }}
        >
          <GradientText
            text="Let's connect!"
            color="blue"
            className="text-screen-lg"
          />
        </motion.h3>
      </div>

      <div className="flex justify-between mt-32">
        {
          contactLinks.map(({color, name, url}, index) => (
            <AnimatedLink key={index} color={color} name={name} url={url} />
          ))
        }
      </div>
    </SnapSection>
  );
};

ContactSection.displayName = 'ContactSection';
