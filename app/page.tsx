import { LandingPageContent } from "@/components/landing-page-content";
import { Navbar } from "@/components/navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center rounded-lg bg-background">
      <ShootingStars />
      <StarsBackground />
      <Navbar />
      <LandingPageContent />
    </div>
  );
}
