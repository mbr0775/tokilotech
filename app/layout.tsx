import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-WFWXH5N911";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
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

  title:
    "Tokilo Technologies | Startup Software & AI Solutions | MBR Group",

  description:
    "Tokilo Technologies is a startup software and AI solutions company founded as the first company under MBR Group. We build websites, mobile apps, backend systems, automation tools, and intelligent digital solutions for startups, small businesses, and growing brands.",

  keywords: [
    "Tokilo Technologies",
    "TokiloTech",
    "Tokilo Tech",
    "MBR Group",
    "startup software company",
    "AI solutions company",
    "web development",
    "mobile app development",
    "backend systems",
    "business website development",
    "automation tools",
    "software development Sri Lanka",
    "Sri Lanka software company",
    "startup technology company",
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
    title:
      "Tokilo Technologies | Startup Software & AI Solutions | MBR Group",
    description:
      "A startup software and AI solutions company founded as the first company under MBR Group, building websites, mobile apps, backend systems, automation tools, and digital solutions.",
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
    title:
      "Tokilo Technologies | Startup Software & AI Solutions | MBR Group",
    description:
      "Tokilo Technologies builds websites, mobile apps, backend systems, automation tools, and AI-powered digital solutions for startups and growing businesses.",
    images: ["/tokilotechlogo.png"],
  },

  alternates: {
    canonical: "https://www.tokilotech.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${roboto.className} ${roboto.variable} ${bdScript.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>

      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}