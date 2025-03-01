"use client";

import { ComponentPropsWithoutRef } from "react";
import { Navbar } from "@components/navbar";
import { PageTransition } from "@components/page-transition";
import { ContactSection } from "@components/contact-section";
import { Footer } from "@components/footer";
import { Toaster } from "@ui";

export default function Template({ children }: ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <PageTransition>
        <Navbar />
        <main
          className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-slate-950 selection:bg-fuchsia-300 selection:text-fuchsia-900"
          id="main"
        >
          {children}

          <ContactSection />
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </main>
      </PageTransition>
    </>
  );
}
