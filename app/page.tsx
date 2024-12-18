import { Navbar, PageContent } from "@components";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center rounded-lg bg-background">
      <ShootingStars />
      <StarsBackground />
      <Navbar />
      <PageContent />
    </div>
  );
}
