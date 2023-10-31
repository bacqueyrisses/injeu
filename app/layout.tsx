import "./globals.css";
import type { Metadata } from "next";
import { Viewport } from "next";
import localFont from "next/font/local";
import { TimerProvider } from "@/providers/TimerProvider";
import { ReactNode } from "react";

const lucioleFont = localFont({
  src: "../public/fonts/Luciole-Bold.ttf",
});

export const metadata: Metadata = {
  title: "INJEU",
  description: "Le jeu INJEU.",
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
    <html lang="en">
      <TimerProvider>
        <body className={lucioleFont.className}>{children}</body>
      </TimerProvider>
    </html>
  );
}
