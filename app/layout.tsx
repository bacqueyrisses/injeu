import "./globals.css";
import type { Metadata } from "next";
import { Viewport } from "next";
import localFont from "next/font/local";
import { TimerProvider } from "@/providers/TimerProvider";
import { ReactNode } from "react";

const lucioleFont = localFont({
  src: "../public/fonts/Luciole-Bold.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INJEU",
  description: "Essayez l'expérience INJEU.",
  openGraph: {
    images: "/opengraph-image.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#CBBBA1",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={lucioleFont.className}>
      <TimerProvider>
        <body>{children}</body>
      </TimerProvider>
    </html>
  );
}
