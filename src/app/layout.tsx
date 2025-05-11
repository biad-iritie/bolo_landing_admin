import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BOLO - Trouvez des produits en promotion près de chez vous",
  description:
    "Découvrez les promotions dans les supermarchés et hypermarchés à proximité grâce à l'extension Chrome BOLO",
  keywords: [
    "promotions",
    "supermarché",
    "extension chrome",
    "économies",
    "courses",
    "réductions",
    "BOLO",
  ],
  authors: [{ name: "Équipe BOLO" }],
  creator: "BOLO",
  publisher: "BOLO",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bolo-extension.com",
    title: "BOLO - Trouvez des produits en promotion près de chez vous",
    description:
      "Découvrez les promotions dans les supermarchés et hypermarchés à proximité grâce à l'extension Chrome BOLO",
    siteName: "BOLO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BOLO - Extension Chrome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOLO - Trouvez des produits en promotion près de chez vous",
    description:
      "Découvrez les promotions dans les supermarchés et hypermarchés à proximité grâce à l'extension Chrome BOLO",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://bolo-extension.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <Suspense fallback={null}>
          {children}
          <Toaster richColors position="top-center" />
        </Suspense>
      </body>
    </html>
  );
}
