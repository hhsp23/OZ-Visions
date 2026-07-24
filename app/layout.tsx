import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "oz-visions-usa.puppetx2.chatgpt.site";
  const protocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0] ?? "https";
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "OZ Visions USA | Film, Media & Production",
    description:
      "OZ Visions USA develops independent productions and creates commercial film, media, podcasts, brand work, and live coverage.",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
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
}

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
      <body className={`${dmSans.variable} antialiased`}>
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
