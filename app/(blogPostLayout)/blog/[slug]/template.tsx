"use client";

import { ComponentPropsWithoutRef } from "react";
import { LampContainer } from "@ui";
import { Navbar } from "@components/navbar";
import { PageTransition } from "@components/page-transition";
import { ContactSection } from "@components/contact-section";
import { Footer } from "@components/footer";

export default function Template({ children }: ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <PageTransition>
        <Navbar />
        <main className="bg-slate-950 fixed inset-0 overflow-x-hidden overflow-y-auto">
          {children}

          <ContactSection />
          <Footer />
        </main>
      </PageTransition>
    </>
  );
};
