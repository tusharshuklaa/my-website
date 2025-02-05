import { FC } from "react";
import Image from "next/image";
import { SnapSection } from "@components/snap-container";
import { AnimatedHeading, Heading2 } from "@components/text";
import { PrettyLink } from "@components/pretty-link";
import { Spotlight } from "@components/ui";
import { cn } from "@/lib/utils";
import { BasicUiComponent } from "@/types";

const JustText: FC<BasicUiComponent> = ({ children, className }) => (
  <p className={cn("mt-4 text-justify leading-8 tracking-wider", className)}>{children}</p>
);

const AboutMePage: FC = () => (
  <div className="grid md:grid-flow-col md:grid-cols-[minmax(20vw,auto)_1fr_minmax(150px,auto)] relative antialiased">
    <div className="hidden md:block"></div>
    <SnapSection className="max-w-4xl mx-auto mt-20 md:mt-40 relative px-4 md:px-2">
      <AnimatedHeading>About Me</AnimatedHeading>
      <JustText className="first-letter:-mb-4 first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
        Hey there! I&apos;m Tushar Shukla, a Senior Frontend Developer from <span className="indian-flag px-1 text-black font-bold">India</span> with over a decade of experience (yes, I&apos;ve been doing this long enough to remember Internet Explorer struggles 🥴). I specialize in building high-performance ⚡, responsive websites while making sure they don&apos;t just work — but feel amazing ❣️ to use.
      </JustText>

      <Heading2 className="mt-12 mb-2">What I do (a.k.a Why You Should Care)</Heading2>
      <JustText>
        My coding philosophy 🤔? Think like a user 🧑🏻‍💻, develop like a ninja 🥷🏻. I live and breathe web standards, performance optimization, and best coding practices — because let&apos;s be honest, no one likes slow websites 🐌. My tech stack includes React, TypeScript and all the fun things that make frontend development exciting (and occasionally frustrating 🙄).
        <br />
        I'm a firm believer in continuous learning, mostly because the web changes faster than I can keep up 🏃🏻‍♂️, but also because I genuinely enjoy it 😍. I'm always eager to explore and leverage new technologies, even the slightly weird ones, to create even better solutions.
        <br />
        Beyond just writing code & blogs, I thrive in collaboration, enjoy leading teams, and have a special talent for explaining complex dev concepts without making people&apos;s eyes glaze over 👀.
      </JustText>

      <Heading2 className="mt-12 mb-2">Fun Facts (Because I&apos;m Not Just a Code Machine)</Heading2>
      <JustText>
        When I'm not immersed in the world of code 🌐, you can find me indulging in some of my other passions:<br />
        🦸🏻 <strong>Anime Enthusiast:</strong> When I&apos;m not coding, I&apos;m probably watching anime — One Piece and Naruto taught me more about perseverance than any self-help book.<br />
        🎨 <strong>CSS Art:</strong> I create CSS Art in my free time because who needs a drawing tablet when you have clip-path and box-shadow?<br />
        🔧 <strong>Tech &amp; Gadgets:</strong> I&apos;m always on the lookout for new tech and gadgets to geek out over because, let&apos;s be honest, who doesn&apos;t love a shiny new toy that makes life easier (or at least more fun)?<br />
        🏍️ <strong>Motorcycle Riding:</strong> There&apos;s nothing quite like the feeling of the open road, wind in your face, and the hum of an engine beneath you (dug dug dug dug dug....💨). It&apos;s my way of escaping the digital world and recharging my creative batteries — though I&apos;m pretty sure my helmet hair is a CSS challenge I&apos;ll never fully solve..
      </JustText>

      <Heading2 className="mt-12 mb-2">Let&apos;s Connect!</Heading2>
      <JustText>
        I believe that my blend of professional expertise and personal interests brings a unique perspective to my work 😎, making me not just a developer but a creator who continuously seeks to push boundaries and innovate.
        Feel free to explore my <PrettyLink href="/showcase" title="projects to showcase">projects</PrettyLink>, checkout <PrettyLink href="/uses" title="things that I use">things that I use in my daily life</PrettyLink> or <PrettyLink href="mailto:tusharshuklaa@gmail.com" title="get in touch">drop me a line, or just say hi</PrettyLink>. Let's connect and create something awesome together!
      </JustText>
    </SnapSection>

    <div className="relative hidden md:block">
      <div className="hidden md:block absolute w-screen h-full -left-full top-0 max-w-6xl z-10 pointer-events-none">
        <Spotlight className="sticky -top-40 left-0 md:left-1/2 md:-top-20 max-h-dvh lg:w-full" fill="white" />
      </div>
      <Image
        src="/img/tushar.jpg"
        alt="Tushar Shukla's image"
        width="285"
        height="775"
        className="sticky top-[20dvh] h-[80dvh] w-auto"
      />
    </div>
  </div>
);

export default AboutMePage;
