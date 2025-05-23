import type React from "react";
import { Analytics } from '@vercel/analytics/next';
import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Gitie",
  description: "Ignore like a boss. Commit like a king.",
  icons: {
    icon: '/favicon/favicon.ico',
  },
  openGraph: {
    title: "Gitie",
    description: "Ignore like a boss. Commit like a king.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Gitie Preview Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitie",
    description: "Ignore like a boss. Commit like a king.",
    images: ["/banner.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark ${GeistSans.variable} ${GeistMono.variable} font-sans`}>
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
