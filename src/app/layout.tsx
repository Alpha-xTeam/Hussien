import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/utils/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hussein - Web Developer",
  description: "Professional web developer specializing in React and Next.js with experience in creating modern and responsive digital solutions",
  keywords: ["web developer", "React", "Next.js", "TypeScript", "Hussein"],
  authors: [{ name: "Hussein" }],
  openGraph: {
    title: "Hussein - Web Developer",
    description: "Professional web developer specializing in React and Next.js with experience in creating modern and responsive digital solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark-mode`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
