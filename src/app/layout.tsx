import "~/styles/globals.css";

import { IBM_Plex_Mono } from "next/font/google";
import { type Metadata } from "next";

import Header from "~/components/general/Header";
import Providers from "./provider";

import { Toaster } from "~/components/ui/toaster";

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lizzy Boat",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ibm_plex_mono.className}`}>
      <body className="main-bg grid bg-cover bg-no-repeat">
        <Providers>
          <Header />
          <main className="flex min-h-[calc(100vh_-_200px)] items-center justify-center text-[#1f788b]">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
