import { LandingPageBanner } from "@/components/landing-page-banner";
import { Navbar } from "@/components/navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden rounded-lg bg-background px-8">
      <ShootingStars />
      <StarsBackground />
      <Navbar />
      <LandingPageBanner />
    </div>
  );
}
