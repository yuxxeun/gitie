import { Site } from "@/lib/constant";
import React from "react";

export default function Footer() {
  return (
    <footer className="font-mono w-full border-t border-border bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 py-8">
      <div className="container mx-auto px-4 text-sm text-muted-foreground flex flex-col items-center gap-1">
        <p className="text-center">Based on .gitignore standards file.</p>
        <p className="text-center">
          Devouring the details by{" "}
          <a
            href={Site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            {Site.author}
          </a>
        </p>
      </div>
    </footer>
  );
}
