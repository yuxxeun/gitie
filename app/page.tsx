"use client";

import { useState, useRef, useEffect } from "react";
import {
  Clipboard,
  Download,
  FileCode2,
  GitBranchPlus,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Toaster as SonnerToaster, toast } from "sonner";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { projectTypes } from "@/data/projectTypes";

export default function GitIgnoreGenerator() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Web");
  const [searchQuery, setSearchQuery] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);

  const allCategories = projectTypes.map((category) => category.category);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (searchQuery) {
      setSearchQuery("");
    }

    setTimeout(() => {
      if (tabsRef.current) {
        const activeTabElement = tabsRef.current.querySelector(
          '[data-state="active"]',
        );
        if (activeTabElement) {
          const tabsContainer = tabsRef.current;
          const activeTabRect = activeTabElement.getBoundingClientRect();
          const containerRect = tabsContainer.getBoundingClientRect();

          const scrollLeft =
            activeTabRect.left -
            containerRect.left -
            containerRect.width / 2 +
            activeTabRect.width / 2;

          tabsContainer.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }
      }
    }, 100);
  };

  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(
        '[data-state="active"]',
      );
      if (activeTabElement) {
        const tabsContainer = tabsRef.current;
        const activeTabRect = activeTabElement.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();

        const scrollLeft =
          activeTabRect.left -
          containerRect.left -
          containerRect.width / 2 +
          activeTabRect.width / 2;

        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const generateGitIgnore = () => {
    let content = "# Generated .gitignore file\n# Created with Gitie\n\n";

    selectedTypes.forEach((typeId) => {
      const category = projectTypes.find((category) =>
        category.items.some((item) => item.id === typeId),
      );
      const item = category?.items.find((item) => item.id === typeId);

      if (item) {
        content += `# ${item.label}\n${item.content}\n\n`;
      }
    });

    return content;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateGitIgnore());
    toast.success(
      <p className="font-[GeistSans] font-bold">
        The .gitignore content has been copied to your clipboard.
      </p>,
    );
  };

  const downloadGitIgnore = () => {
    const content = generateGitIgnore();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".gitignore";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(
      <p className="font-[GeistSans] font-bold">
        Your .gitignore file has been downloaded.
      </p>,
    );
  };

  const filteredItems = (category: (typeof projectTypes)[0]) => {
    if (!searchQuery.trim()) return category.items;
    return category.items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  };

  const currentItems = searchQuery.trim()
    ? projectTypes.flatMap((category) => filteredItems(category))
    : projectTypes.find((category) => category.category === activeTab)?.items ||
    [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      <SonnerToaster position="top-center" richColors />
      <header className="w-full border-b sticky top-0 z-20 backdrop-blur-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black/50">
        <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GitBranchPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary dark:text-primary" />
            <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
              Gitie
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-left sm:text-center mb-8 sm:mb-12 px-1">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-1 max-w-4xl sm:mb-4 mx-auto sm:text-center">
            One click to ignore them.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto sm:text-center">
            Ignore files like a pro, commit with confidence.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search for languages, frameworks, or tools..."
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {!searchQuery && (
            <div className="px-6 pt-4">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full mb-4"
              >
                <div className="relative">
                  <div
                    ref={tabsRef}
                    className="overflow-x-auto scrollbar-hide touch-pan-x"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    <TabsList className="inline-flex w-max bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-lg">
                      {allCategories.map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="px-4 py-1.5 text-xs font-medium whitespace-nowrap data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:shadow-sm rounded-md"
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none sm:hidden"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none sm:hidden"></div>
                </div>
              </Tabs>
            </div>
          )}

          {searchQuery && (
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Search results for "{searchQuery}"
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="h-7 px-2 text-xs"
              >
                Clear search
              </Button>
            </div>
          )}

          <div className="p-4 sm:p-6 pt-2">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Card
                    key={item.id}
                    className={cn(
                      "cursor-pointer transition-all border overflow-hidden group h-12",
                      selectedTypes.includes(item.id)
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
                    )}
                    onClick={() => handleTypeToggle(item.id)}
                  >
                    <div className="flex items-center justify-between h-full px-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "flex items-center justify-center",
                            selectedTypes.includes(item.id)
                              ? "text-primary"
                              : "text-zinc-500 dark:text-zinc-400",
                          )}
                        >
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium truncate">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedTypes.includes(item.id)}
                          className={cn(
                            "h-5 w-5 rounded-sm border-2 transition-all",
                            selectedTypes.includes(item.id)
                              ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                              : "border-zinc-300 dark:border-zinc-600",
                          )}
                        />
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {searchQuery
                      ? "No matches found for your search"
                      : "No items available in this category"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col xs:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {selectedTypes.length}{" "}
                {selectedTypes.length === 1 ? "item" : "items"} selected
              </span>
              {selectedTypes.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTypes([])}
                  className="h-7 px-2 text-xs bg-secondary"
                >
                  Clear
                </Button>
              )}
            </div>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  disabled={selectedTypes.length === 0}
                  className="gap-2 h-9 bg-primary hover:bg-primary/50 text-white"
                  size="sm"
                >
                  <FileCode2 className="h-3.5 w-3.5" />
                  Generate .gitignore
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 rounded-t-xl">
                <div className="mx-auto w-full max-w-4xl px-4">
                  <DrawerHeader>
                    {/* <DrawerTitle className="text-xl font-bold">
                      Hey, this is your .gitignore 🎊
                    </DrawerTitle> */}
                    <DrawerDescription className="text-sm">
                      <h3 className="text-lg font-bold mb-2">
                        Based on your selected project types:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTypes.map((id) => {
                          const category = projectTypes.find((c) =>
                            c.items.some((i) => i.id === id),
                          );
                          const item = category?.items.find((i) => i.id === id);

                          return item ? (
                            <Badge key={id} variant="default">
                              {item.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <CodeBlock
                      code={generateGitIgnore()}
                      language="gitignore"
                      showLineNumbers={true}
                    />
                  </div>
                  <DrawerFooter className="flex flex-col sm:flex-row justify-end gap-2">
                    <DrawerClose asChild>
                      <Button
                        variant="outline"
                        className="border-zinc-300 dark:border-zinc-700"
                      >
                        Close
                      </Button>
                    </DrawerClose>
                    <Button
                      variant="outline"
                      onClick={copyToClipboard}
                      className="gap-2 border-primary text-primary hover:bg-primary/50 dark:border-primary hover:text-primary dark:hover:bg-primary/10"
                    >
                      <Clipboard className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      onClick={downloadGitIgnore}
                      className="gap-2 bg-primary hover:bg-primary/50"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {selectedTypes.length > 0 && (
          <div className="mt-6 sm:mt-8 px-4">
            <div className="flex flex-wrap justify-center gap-2 max-w-full">
              {selectedTypes.map((typeId) => {
                const category = projectTypes.find((c) =>
                  c.items.some((i) => i.id === typeId),
                );
                const item = category?.items.find((i) => i.id === typeId);
                return (
                  item && (
                    <span
                      key={typeId}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 gap-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      {item.icon}
                      <span className="max-w-[100px] truncate">
                        {item.label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTypeToggle(typeId);
                        }}
                        className="rounded-full p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  )
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Based on the official GitHub .gitignore standards.</p>
        </div>
      </div>
    </div>
  );
}
