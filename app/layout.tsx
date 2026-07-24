import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { siteAsset } from "./site-paths";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://hhsp23.github.io/OZ-Visions/";
const socialImage = siteAsset("/og.png");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OZ Visions USA | Film, Media & Production",
  description:
    "OZ Visions USA develops independent productions and creates commercial film, media, podcasts, brand work, and live coverage.",
  icons: {
    icon: siteAsset("/favicon.ico"),
    shortcut: siteAsset("/favicon.ico"),
  },
  openGraph: {
    title: "OZ Visions USA",
    description:
      "Independent productions and creative media from Austin, Texas.",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1734,
        height: 907,
        alt: "OZ Visions USA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OZ Visions USA",
    description:
      "Independent productions and creative media from Austin, Texas.",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,700,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} antialiased`}
        style={
          {
            "--noise-image": `url("${siteAsset("/assets/noise.webp")}")`,
          } as CSSProperties
        }
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
