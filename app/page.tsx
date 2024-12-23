import { InfoBar } from "@components/info-bar";
import { Navbar } from "@components/navbar";
import { PageContent } from "@components/page-content";
import { ShootingStars, StarsBackground } from "@ui";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center rounded-lg bg-background">
      <InfoBar hidden={true}>🚧 This website is under construction. Please expect bugs 🐛</InfoBar>
      <ShootingStars />
      <StarsBackground />
      <Navbar />
      <PageContent />
    </div>
  );
}
