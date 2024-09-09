import { ModeToggle } from "@/components/mode-toggle";
import { Navbar } from "@/components/navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <ShootingStars />
      <StarsBackground />
      <Navbar />
      <ModeToggle />
      <h1 className={cn("relative z-20 text-xl text-white md:text-4xl")}>
        Tailwind is Awesome
      </h1>
      <p className="relative z-20 mt-2 text-center text-neutral-300">
        Framer motion is the best animation library ngl
      </p>
    </div>
  );
}
