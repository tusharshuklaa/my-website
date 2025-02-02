"use client";

import { ComponentPropsWithoutRef } from "react";
import { ShootingStars, StarsBackground } from "@ui";
import { Navbar } from "@components/navbar";
import { ContactSection } from "@components/contact-section";
import { Footer } from "@components/footer";
import { RootRefProvider } from "@contexts/use-root-ref";

export default function Template({ children }: ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <div className="bg-background fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <ShootingStars />
        <StarsBackground />
      </div>

      <RootRefProvider>
        <Navbar />

        {children}

        <ContactSection />
        <Footer />
      </RootRefProvider>
    </>
  );
}
