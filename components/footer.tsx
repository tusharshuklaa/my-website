import { ArrowUpRight } from "lucide-react";
import { Underline } from "./text";
import Link from "next/link";
import { FC } from "react";
import { HighlightText } from "./text/underline";

type FooterItemProps = {
  url: string;
  text: string;
};

const FooterListItem: FC<FooterItemProps> = ({ url, text }) => (
  <li>
    <Link href={url}>
      <Underline className="inline-flex">
        <span>{text}</span> <ArrowUpRight className="w-3 h-3" />
      </Underline>
    </Link>
  </li>
);

const footerLinks = [
  { url: "/", text: "Home" },
  { url: "/", text: "About" },
  { url: "/", text: "Work" },
  { url: "/", text: "Contact" },
];

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col w-full pt-24 md:pt-40 pb-4 sm:pb-8 bg-gradient-to-t from-60% from-sky-950/30 to-transparent to-100%">
      <div className="mb-14 flex flex-col md:flex-row justify-between w-full max-w-sm sm:max-w-7xl m-auto md:px-0">
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl mb-4">Tushar's Personal Website</h3>
          <p>Design inspired by casual internet surfing 😆 and coded in <Link href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer"><Underline>Visual Studio Code</Underline></Link>. Built with <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer"><Underline>Next.js</Underline></Link>, <Link href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"><Underline>Tailwind</Underline></Link>, lots of coffee and ❤️</p>
          <p className="mt-4">Show some love to my <Link href="https://github.com/tusharshuklaa/my-website" target="_blank" rel="noopener noreferrer"><Underline>Github repository</Underline></Link> for this website</p>
          <p className="mt-4">
            <HighlightText className="after:z-0">Pro Tip:</HighlightText> Don&apos;t forget to check command center by either clicking on the search bar in the navigation menu or by pessing keyboard keys (Cmd or Ctrl + K)
          </p>
        </div>

        <div className="w-full md:w-1/4 shrink-0 mt-8 md:mt-0">
          <h4 className="text-3xl mb-4">Pages</h4>
          <ul className="flex flex-col gap-2">
            {
              footerLinks.map((link, index) => (
                <FooterListItem key={index} {...link} />
              ))
            }
          </ul>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-transparent via-[#68d0ee] mb-4" />

      <div className="text-center text-gray-300 w-full max-w-7xl m-auto flex justify-around sm:justify-center sm:gap-2 flex-col sm:flex-row">
        <span>Copyright © {currentYear} Tushar Shukla.</span> <span>All rights reserved.</span>
      </div>
    </footer>
  );
};
