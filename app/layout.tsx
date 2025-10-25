import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add BDSans font
const bdSans = localFont({
  src: [
    {
      path: '../public/fonts/BDSans-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/BDSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BDSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/BDSans-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-bd-sans',
});

const bdScript = localFont({
  src: [
    {
      path: '../public/fonts/BDScript-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BDScript-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-bd-script',
});

export const metadata: Metadata = {
  title: "Tokilo Technologies - AI-Powered Solutions for Modern Businesses",
  description: "Transforming businesses with cutting-edge AI technology and software solutions tailored for the modern world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bdSans.variable} ${bdScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}