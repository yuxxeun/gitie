"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightGitignore = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      // Empty lines
      if (!trimmedLine) {
        return (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span className="h-5"></span>
          </div>
        );
      }

      // Comments (lines starting with #)
      if (trimmedLine.startsWith("#")) {
        return (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {line}
            </span>
          </div>
        );
      }

      // File patterns with wildcards
      if (trimmedLine.includes("*") || trimmedLine.includes("?")) {
        const parts = line.split(/(\*+|\?+)/);
        return (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span>
              {parts.map((part, partIndex) => {
                if (part.match(/\*+|\?+/)) {
                  return (
                    <span
                      key={partIndex}
                      className="text-cyan-500 dark:text-cyan-400 font-bold"
                    >
                      {part}
                    </span>
                  );
                }
                return (
                  <span
                    key={partIndex}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    {part}
                  </span>
                );
              })}
            </span>
          </div>
        );
      }

      // Directory patterns (ending with /)
      if (trimmedLine.endsWith("/")) {
        return (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              {line}
            </span>
          </div>
        );
      }

      // File extensions
      if (trimmedLine.startsWith("*.")) {
        return (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span>
              <span className="text-cyan-500 dark:text-cyan-400 font-bold">
                *
              </span>
              <span className="text-orange-600 dark:text-orange-400 font-medium">
                {line.slice(1)}
              </span>
            </span>
          </div>
        );
      }

      // Negation patterns (starting with !)
      if (trimmedLine.startsWith("!")) {
        return (
          <div key={index} className="flex">
            {showLineNumbers && (
              <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
                {index + 1}
              </span>
            )}
            <span>
              <span className="text-red-500 dark:text-red-400 font-bold">
                !
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">
                {line.slice(1)}
              </span>
            </span>
          </div>
        );
      }

      // Regular file/folder names
      return (
        <div key={index} className="flex">
          {showLineNumbers && (
            <span className="select-none text-zinc-400 dark:text-zinc-600 text-xs font-mono w-8 text-right pr-3 flex-shrink-0">
              {index + 1}
            </span>
          )}
          <span className="text-zinc-700 dark:text-zinc-300">{line}</span>
        </div>
      );
    });
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 ml-2">
            .gitignore
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-b-lg border border-t-0 border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="p-4 overflow-auto max-h-[60vh] font-mono text-sm leading-relaxed">
          <div className="space-y-1">{highlightGitignore(code)}</div>
        </div>
      </div>
    </div>
  );
}
