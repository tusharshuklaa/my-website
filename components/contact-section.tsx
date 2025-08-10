import { FC } from "react";
import { motion } from "motion/react";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { GradientText } from "@components/text";
import { AnimatedLink, AnimatedLinkProps } from "@components/animated-link";

const contactLinks: Array<AnimatedLinkProps> = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tusharshuklaa/",
    color: "blue",
  },
  {
    name: "GitHub",
    url: "https://github.com/tusharshuklaa",
    color: "purple",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/theTSguy",
    color: "indigo",
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/2996624/tushar-shukla",
    color: "orange",
  },
  {
    name: "Codepen",
    url: "https://codepen.io/tusharshukla",
    color: "green",
  },
  {
    name: "Email",
    url: "mailto:tusharshukla.dev@gmail.com",
    color: "red",
  },
];

export const ContactSection: FC<UiComponent> = ({ className, ...props }) => {
  const contactSectionClasses = cn(
    "max-w-sm md:max-w-4xl lg:max-w-7xl m-auto py-4 px-4 sm:px-0 pt-16 md:pt-28 flex flex-col justify-center",
    className,
  );

  return (
    <section data-testid={`cmp-contact-section`} className={contactSectionClasses} {...props}>
      <div>
        <motion.h3
          initial={{
            opacity: 0,
            x: 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
        >
          <GradientText text="And that's a wrap!" color="orange" className="text-screen-lg" />
        </motion.h3>

        <motion.h3
          initial={{
            opacity: 0,
            x: 100,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 2,
            },
          }}
        >
          <GradientText text="Piqued your interest?" color="purple" className="text-screen-lg" />
        </motion.h3>

        <motion.h3
          initial={{
            opacity: 0,
            x: 200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 2.2,
            },
          }}
        >
          <GradientText text="Let's connect!" color="blue" className="text-screen-lg" />
        </motion.h3>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-2 sm:gap-0 md:mt-32 md:flex md:justify-between">
        {contactLinks.map(({ color, name, url }, index) => (
          <AnimatedLink key={index} color={color} name={name} url={url} className="text-lg" />
        ))}
      </div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";
