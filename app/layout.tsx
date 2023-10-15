import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const lucioleFont = localFont({
  src: "../public/fonts/Luciole-Bold.ttf",
});

export const metadata: Metadata = {
  title: "INJEU",
  description: "Le jeu INJEU.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lucioleFont.className}>{children}</body>
    </html>
  );
}
