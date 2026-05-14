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

const bdSans = localFont({
  src: [
    {
      path: "../public/fonts/BDSans-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/BDSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BDSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BDSans-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-bd-sans",
});

const bdScript = localFont({
  src: [
    {
      path: "../public/fonts/BDScript-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BDScript-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bd-script",
});

export const metadata: Metadata = {
  title: "Tokilo Technologies | Websites, Mobile Apps & AI Software Solutions",
  description:
    "Tokilo Technologies is an AI and software development company creating websites, mobile apps, backend systems, and intelligent digital solutions for modern businesses.",
  keywords: [
    "Tokilo Technologies",
    "Tokilo Tech",
    "web development",
    "mobile app development",
    "AI software solutions",
    "software company",
    "Sri Lanka software company",
  ],
  authors: [{ name: "Tokilo Technologies" }],
  creator: "Tokilo Technologies",
  publisher: "Tokilo Technologies",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Tokilo Technologies | Websites, Mobile Apps & AI Software Solutions",
    description:
      "AI and software development solutions for websites, mobile apps, backend systems, and intelligent digital products.",
    url: "https://www.tokilotech.com",
    siteName: "Tokilo Technologies",
    images: [
      {
        url: "/tokilotechlogo.png",
        width: 1200,
        height: 630,
        alt: "Tokilo Technologies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokilo Technologies | Websites, Mobile Apps & AI Software Solutions",
    description:
      "AI and software development solutions for websites, mobile apps, backend systems, and intelligent digital products.",
    images: ["/tokilotechlogo.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${bdSans.variable} ${bdScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}