import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${roboto.className} ${roboto.variable} ${bdScript.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}