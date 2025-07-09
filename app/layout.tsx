import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Site } from "@/lib/constant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: Site.title,
  description: Site.description,
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: `${Site.title} - ${Site.headline}`,
    description: Site.description,
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Gitie Preview Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${Site.title} - ${Site.headline}`,
    description: Site.description,
    images: ["/hero.jpg"],
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
        className={`dark font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
