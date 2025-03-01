import { FC } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Underline } from "@components/text";
import { HighlightText } from "@components/text/underline";
import { DownloadResumeButton } from "@components/download-resume-button";

type FooterItemProps = {
  url: string;
  text: string;
};

const FooterListItem: FC<FooterItemProps> = ({ url, text }) => (
  <li>
    <Link href={url}>
      <Underline className="inline-flex">
        <span>{text}</span> <ArrowUpRight className="h-3 w-3" />
      </Underline>
    </Link>
  </li>
);

const footerLinks = [
  { url: "/blog", text: "Blog" },
  { url: "/", text: "Home" },
  { url: "/about-me", text: "About Me" },
  { url: "/showcase", text: "Showcase" },
  { url: "/uses", text: "Uses" },
];

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx- flex w-full flex-col bg-gradient-to-t from-sky-950/30 from-60% to-transparent to-100% px-4 pb-4 pt-24 sm:px-0 sm:pb-8 md:pt-40">
      <div className="m-auto mb-14 flex w-full max-w-sm flex-col justify-between sm:max-w-7xl md:flex-row md:px-0">
        <div className="w-full md:w-1/2">
          <h3 className="mb-4 text-3xl">Tushar&apos;s Personal Website</h3>
          <p>
            Design inspired by casual internet surfing 😆 and coded in{" "}
            <Link href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">
              <Underline>Visual Studio Code</Underline>
            </Link>
            . Built with{" "}
            <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
              <Underline>Next.js</Underline>
            </Link>
            ,{" "}
            <Link href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
              <Underline>Tailwind</Underline>
            </Link>
            , lots of coffee and ❤️
          </p>
          <p className="mt-4">
            Show some love to my{" "}
            <Link href="https://github.com/tusharshuklaa/my-website" target="_blank" rel="noopener noreferrer">
              <Underline>Github repository</Underline>
            </Link>{" "}
            for this website
          </p>
          <p className="mt-4">
            <HighlightText className="after:z-0">Pro Tip:</HighlightText> Don&apos;t forget to check command center by
            either clicking on the search bar in the navigation menu or by pessing keyboard keys (Cmd or Ctrl + K)
          </p>
          <DownloadResumeButton containerClassName="mt-6 left-0 sm:left-auto right-0 sm:right-auto mx-auto sm:mx-0" />
        </div>

        <div className="mt-8 w-full shrink-0 md:mt-0 md:w-1/4">
          <h4 className="mb-4 text-3xl">Pages</h4>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((link, index) => (
              <FooterListItem key={index} {...link} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4 h-[1px] w-full bg-gradient-to-r from-transparent via-[#68d0ee] to-transparent" />

      <div className="m-auto flex w-full max-w-7xl flex-col justify-around text-center text-gray-300 sm:flex-row sm:justify-center sm:gap-2">
        <span>Copyright © {currentYear} Tushar Shukla.</span> <span>All rights reserved.</span>
      </div>
    </footer>
  );
};
