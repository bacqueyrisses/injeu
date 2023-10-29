import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { TimerProvider } from "@/providers/TimerProvider";

const lucioleFont = localFont({
  src: "../public/fonts/Luciole-Bold.ttf",
});

export const metadata: Metadata = {
  title: "INJEU",
  description: "Le jeu INJEU.",
  themeColor: "#CBBBA1",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TimerProvider>
        <body className={lucioleFont.className}>{children}</body>
      </TimerProvider>
    </html>
  );
}
