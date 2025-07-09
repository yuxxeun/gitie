import { Site } from "@/lib/constant";
import { GitBranchPlus, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b backdrop-blur-md bg-white/80 dark:bg-black/50 border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-2">
          <GitBranchPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight lowercase text-zinc-800 dark:text-zinc-100">
            {Site.title}
          </span>
        </div>

        <Link href={Site.repo} target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Github className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-700 dark:text-zinc-200" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
