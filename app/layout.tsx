import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Gitie",
  description: "Ignore like a pro, commit with confidence.",
  icons: {
    icon: "/favicon/favicon.ico",
  },
  openGraph: {
    title: "Gitie — One click to ignore them",
    description: "Ignore like a pro, commit with confidence.",
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
    title: "Gitie — One click to ignore them",
    description: "Ignore like a pro, commit with confidence.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark ${GeistSans.variable} ${GeistMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
