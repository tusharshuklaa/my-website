import { FC } from "react";
import { shuffle } from "lodash";
import { FlipWords } from "./ui/flip-words";

export const LandingPageBanner: FC = () => {
  const words = shuffle([
    "building stuff for the web 👨🏻‍💻",
    "riding my RE Classic 🏍️",
    "my 2 cute monsters 👻",
    "creating CSS art 🧑🏻‍🎨",
    "conversations about space 💫",
    "tweaking my gadgets 📱",
    "staying informed of latest tech 💿",
    "talking to people 🗣️",
    "loosing money in stocks 📉",
    "using emojis 😅",
    "anime and manga 🎌",
    "money... bcz who doesn't? 🤑",
    "learning new things 😵",
    "solving problems ▩",
    "playing mobile games 👾",
  ]);

  return (
    <section className="flex h-[40rem] flex-col justify-center px-4 min-w-80">
      <div>Namaste</div>
      <div>I&apos;m Tushar Shukla and I</div>
      <div className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">
        ❤️
        <FlipWords words={words} duration={5000} /> <br />
      </div>
    </section>
  );
};
