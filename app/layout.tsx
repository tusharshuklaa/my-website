import type { Metadata } from "next";
import { Dongle, Poppins } from "next/font/google";
import { ThemeProvider } from "@components/theme-provider";
import { InfoBar } from "@components/info-bar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-poppins",
});
const dongle = Dongle({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dongle",
});

export const metadata: Metadata = {
  title: "Tushar Shukla",
  description: "Frontend Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${dongle.variable} font-poppins antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false} disableTransitionOnChange>
          <InfoBar hidden={true}>🚧 This website is under construction. Please expect bugs 🐛</InfoBar>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
