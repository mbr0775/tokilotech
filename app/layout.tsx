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
  metadataBase: new URL("https://www.tokilotech.com"),

  title: {
    default: "Tokilo Technologies | Websites, Mobile Apps & AI Software Solutions",
    template: "%s | Tokilo Technologies",
  },

  description:
    "Tokilo Technologies builds modern websites, mobile apps, admin dashboards, project tracking systems, Supabase backends, and AI-powered business solutions for growing businesses.",

  keywords: [
    "Tokilo Technologies",
    "TokiloTech",
    "Tokilo Tech",
    "Tokilo software",
    "Tokilo AI",
    "web development",
    "mobile app development",
    "AI software solutions",
    "business systems",
    "admin dashboard development",
    "project tracking system",
    "Supabase developer",
    "Next.js developer",
    "React developer",
    "software company Sri Lanka",
    "software solutions Qatar",
  ],

  authors: [{ name: "Tokilo Technologies" }],
  creator: "Tokilo Technologies",
  publisher: "Tokilo Technologies",

  alternates: {
    canonical: "https://www.tokilotech.com",
  },

  openGraph: {
    title: "Tokilo Technologies | Websites, Mobile Apps & AI Software Solutions",
    description:
      "Tokilo Technologies builds modern websites, mobile apps, admin dashboards, project tracking systems, Supabase backends, and AI-powered business solutions.",
    url: "https://www.tokilotech.com",
    siteName: "Tokilo Technologies",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Tokilo Technologies | Websites, Mobile Apps & AI Software Solutions",
    description:
      "Modern websites, mobile apps, admin dashboards, project tracking systems, and AI-powered business solutions.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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