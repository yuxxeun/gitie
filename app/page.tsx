"use client"

import { useState, useRef, useEffect } from "react"
import { Clipboard, Download, FileCode2, GitBranch, Github, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toaster as SonnerToaster, toast } from "sonner"
import { CodeBlock } from "@/components/code-block"

// Optimized project types with essential content only
const projectTypes = [
  {
    category: "Web",
    items: [
      {
        id: "node",
        label: "Node.js",
        icon: <FileCode2 className="h-4 w-4 text-emerald-500" />,
        content: `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*

# Environment variables
.env
.env.local

# Build output
.next
out
dist`,
      },
      {
        id: "react",
        label: "React",
        icon: <FileCode2 className="h-4 w-4 text-blue-500" />,
        content: `# Dependencies
/node_modules
/.pnp
.pnp.js

# Production
/build

# Environment
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*`,
      },
      {
        id: "vue",
        label: "Vue",
        icon: <FileCode2 className="h-4 w-4 text-green-500" />,
        content: `.DS_Store
node_modules
/dist

# Local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*

# Editor directories
.idea
.vscode`,
      },
      {
        id: "angular",
        label: "Angular",
        icon: <FileCode2 className="h-4 w-4 text-red-500" />,
        content: `# Compiled output
/dist
/tmp
/out-tsc

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.vscode/*
!.vscode/settings.json

# System files
.DS_Store
Thumbs.db`,
      },
      {
        id: "nextjs",
        label: "Next.js",
        icon: <FileCode2 className="h-4 w-4 text-black dark:text-white" />,
        content: `# Dependencies
/node_modules
/.pnp
.pnp.js

# Next.js
/.next/
/out/

# Production
/build

# Environment variables
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts`,
      },
      {
        id: "gatsby",
        label: "Gatsby",
        icon: <FileCode2 className="h-4 w-4 text-purple-600" />,
        content: `# Gatsby files
.cache/
public

# Dependencies
node_modules/

# Environment variables
.env*

# Logs
*.log
npm-debug.log*`,
      },
    ],
  },
  {
    category: "Mobile",
    items: [
      {
        id: "flutter",
        label: "Flutter",
        icon: <FileCode2 className="h-4 w-4 text-cyan-500" />,
        content: `# Miscellaneous
*.class
*.log
.DS_Store

# IntelliJ related
*.iml
*.ipr
*.iws
.idea/

# Flutter/Dart/Pub related
.dart_tool/
.flutter-plugins
.packages
.pub-cache/
.pub/
/build/`,
      },
      {
        id: "reactnative",
        label: "React Native",
        icon: <FileCode2 className="h-4 w-4 text-purple-500" />,
        content: `# OSX
.DS_Store

# Xcode
build/
*.pbxuser
xcuserdata
*.xcuserstate

# Android/IntelliJ
build/
.idea
.gradle
local.properties
*.iml

# Node.js
node_modules/
npm-debug.log

# React Native
*.jsbundle`,
      },
      {
        id: "android",
        label: "Android",
        icon: <FileCode2 className="h-4 w-4 text-green-600" />,
        content: `# Gradle files
.gradle/
build/

# Local configuration
local.properties

# Log files
*.log

# Android Studio
captures/
.externalNativeBuild/
*.apk

# IntelliJ
*.iml
.idea/`,
      },
      {
        id: "ios",
        label: "iOS",
        icon: <FileCode2 className="h-4 w-4 text-gray-500" />,
        content: `# Xcode
xcuserdata/
*.xcscmblueprint
*.xccheckout

# Build files
build/
DerivedData/
*.moved-aside

# App packaging
*.ipa
*.dSYM.zip
*.dSYM

# CocoaPods
Pods/`,
      },
    ],
  },
  {
    category: "Languages",
    items: [
      {
        id: "python",
        label: "Python",
        icon: <FileCode2 className="h-4 w-4 text-yellow-500" />,
        content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/

# Environments
.env
.venv
env/
venv/
ENV/`,
      },
      {
        id: "java",
        label: "Java",
        icon: <FileCode2 className="h-4 w-4 text-orange-500" />,
        content: `# Compiled class file
*.class

# Log file
*.log

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup`,
      },
      {
        id: "go",
        label: "Go",
        icon: <FileCode2 className="h-4 w-4 text-sky-500" />,
        content: `# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary
*.test

# Output of the go coverage tool
*.out

# Go workspace file
go.work`,
      },
      {
        id: "rust",
        label: "Rust",
        icon: <FileCode2 className="h-4 w-4 text-orange-600" />,
        content: `# Generated by Cargo
debug/
target/

# Remove Cargo.lock from gitignore if creating an executable
Cargo.lock

# Backup files generated by rustfmt
**/*.rs.bk

# MSVC Windows builds
*.pdb`,
      },
      {
        id: "php",
        label: "PHP",
        icon: <FileCode2 className="h-4 w-4 text-indigo-500" />,
        content: `# Composer files
composer.phar
/vendor/

# Local configs
config/autoload/*.local.php

# Binary gettext files
*.mo

# Data
data/logs/
data/cache/
data/sessions/
data/tmp/
temp/`,
      },
    ],
  },
  {
    category: "DevOps",
    items: [
      {
        id: "docker",
        label: "Docker",
        icon: <FileCode2 className="h-4 w-4 text-blue-600" />,
        content: `# Docker project generated files
.vagrant*
bin
docker/docker
.*.swp
a.out
*.orig
build_src
.flymake*
.idea
.DS_Store`,
      },
      {
        id: "kubernetes",
        label: "Kubernetes",
        icon: <FileCode2 className="h-4 w-4 text-blue-500" />,
        content: `# Kubernetes
kubeconfig
*.kubeconfig
.kube/
.minikube/

# Secrets
*.pem
*.key
*.crt

# Logs
*.log
logs/

# OS specific files
.DS_Store
Thumbs.db`,
      },
      {
        id: "terraform",
        label: "Terraform",
        icon: <FileCode2 className="h-4 w-4 text-purple-600" />,
        content: `# Local .terraform directories
**/.terraform/*

# .tfstate files
*.tfstate
*.tfstate.*

# Crash log files
crash.log

# .tfvars files
*.tfvars
*.tfvars.json

# Override files
override.tf
override.tf.json
*_override.tf
*_override.tf.json`,
      },
    ],
  },
  {
    category: "Database",
    items: [
      {
        id: "mongodb",
        label: "MongoDB",
        icon: <FileCode2 className="h-4 w-4 text-green-600" />,
        content: `# MongoDB
*.mongodb
mongodb/
data/db/
data/configdb/

# Logs
*.log
logs/

# OS specific files
.DS_Store
Thumbs.db`,
      },
      {
        id: "mysql",
        label: "MySQL",
        icon: <FileCode2 className="h-4 w-4 text-blue-600" />,
        content: `# MySQL
*.sql
*.sql.gz
*.mysql
mysql/
data/mysql/

# Logs
*.log
logs/

# OS specific files
.DS_Store
Thumbs.db`,
      },
      {
        id: "postgresql",
        label: "PostgreSQL",
        icon: <FileCode2 className="h-4 w-4 text-blue-700" />,
        content: `# PostgreSQL
*.sql
*.sql.gz
*.psql
postgresql/
data/postgresql/

# Logs
*.log
logs/

# OS specific files
.DS_Store
Thumbs.db`,
      },
    ],
  },
  {
    category: "OS",
    items: [
      {
        id: "macos",
        label: "macOS",
        icon: <FileCode2 className="h-4 w-4 text-gray-500" />,
        content: `# General
.DS_Store
.AppleDouble
.LSOverride

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns`,
      },
      {
        id: "windows",
        label: "Windows",
        icon: <FileCode2 className="h-4 w-4 text-blue-500" />,
        content: `# Windows thumbnail cache files
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Dump file
*.stackdump

# Folder config file
[Dd]esktop.ini

# Recycle Bin used on file shares
$RECYCLE.BIN/

# Windows shortcuts
*.lnk`,
      },
      {
        id: "linux",
        label: "Linux",
        icon: <FileCode2 className="h-4 w-4 text-orange-500" />,
        content: `*~

# temporary files which can be created if a process still has a handle open of a deleted file
.fuse_hidden*

# KDE directory preferences
.directory

# Linux trash folder which might appear on any partition or disk
.Trash-*

# .nfs files are created when an open file is removed but is still being accessed
.nfs*`,
      },
    ],
  },
  {
    category: "Editors",
    items: [
      {
        id: "vscode",
        label: "VS Code",
        icon: <FileCode2 className="h-4 w-4 text-blue-500" />,
        content: `.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# Local History for Visual Studio Code
.history/

# Built Visual Studio Code Extensions
*.vsix`,
      },
      {
        id: "intellij",
        label: "IntelliJ",
        icon: <FileCode2 className="h-4 w-4 text-pink-500" />,
        content: `# User-specific stuff
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/**/usage.statistics.xml
.idea/**/dictionaries
.idea/**/shelf

# Generated files
.idea/**/contentModel.xml

# Sensitive or high-churn files
.idea/**/dataSources/
.idea/**/dataSources.ids
.idea/**/dataSources.local.xml`,
      },
      {
        id: "vim",
        label: "Vim",
        icon: <FileCode2 className="h-4 w-4 text-green-600" />,
        content: `# Swap
[._]*.s[a-v][a-z]
[._]*.sw[a-p]
[._]s[a-rt-v][a-z]
[._]ss[a-gi-z]
[._]sw[a-p]

# Session
Session.vim
Sessionx.vim

# Temporary
.netrwhist
*~
tags`,
      },
    ],
  },
]

export default function GitIgnoreGenerator() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Web")
  const [searchQuery, setSearchQuery] = useState("")
  const tabsRef = useRef<HTMLDivElement>(null)

  const allCategories = projectTypes.map((category) => category.category)

  // Reset search when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (searchQuery) {
      setSearchQuery("")
    }

    // Scroll to the active tab
    setTimeout(() => {
      if (tabsRef.current) {
        const activeTabElement = tabsRef.current.querySelector('[data-state="active"]')
        if (activeTabElement) {
          const tabsContainer = tabsRef.current
          const activeTabRect = activeTabElement.getBoundingClientRect()
          const containerRect = tabsContainer.getBoundingClientRect()

          // Calculate the scroll position to center the active tab
          const scrollLeft = activeTabRect.left - containerRect.left - containerRect.width / 2 + activeTabRect.width / 2

          tabsContainer.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          })
        }
      }
    }, 100)
  }

  // Scroll to active tab on initial render
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector('[data-state="active"]')
      if (activeTabElement) {
        const tabsContainer = tabsRef.current
        const activeTabRect = activeTabElement.getBoundingClientRect()
        const containerRect = tabsContainer.getBoundingClientRect()

        // Calculate the scroll position to center the active tab
        const scrollLeft = activeTabRect.left - containerRect.left - containerRect.width / 2 + activeTabRect.width / 2

        tabsContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [])

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId)
      } else {
        return [...prev, typeId]
      }
    })
  }

  const generateGitIgnore = () => {
    let content = "# Generated .gitignore file\n# Created with Git Ignore Generator\n\n"

    selectedTypes.forEach((typeId) => {
      const category = projectTypes.find((category) => category.items.some((item) => item.id === typeId))
      const item = category?.items.find((item) => item.id === typeId)

      if (item) {
        content += `# ${item.label}\n${item.content}\n\n`
      }
    })

    return content
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateGitIgnore())
    toast.success(<p className="font-[GeistSans] font-bold">
      The .gitignore content has been copied to your clipboard.
    </p>)
  }

  const downloadGitIgnore = () => {
    const content = generateGitIgnore()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = ".gitignore"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(<p className="font-[GeistSans] font-bold">
      Your .gitignore file has been downloaded.
    </p>)
  }

  const filteredItems = (category: (typeof projectTypes)[0]) => {
    if (!searchQuery.trim()) return category.items
    return category.items.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  }

  // Get all items for the current view (either filtered by search or by tab)
  const currentItems = searchQuery.trim()
    ? projectTypes.flatMap((category) => filteredItems(category))
    : projectTypes.find((category) => category.category === activeTab)?.items || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      <SonnerToaster position="top-center" closeButton richColors />

      {/* Vercel-style header */}
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GitBranch className="h-5 w-5 sm:h-6 sm:w-6 text-primary dark:text-primary" />
            <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
              Gitie
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Vercel-style hero section */}
        <div className="text-left sm:text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 max-w-4xl mx-auto sm:text-center">
            One click to ignore them.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto sm:text-center">
            Mix 'n match tech stacks like toppings — and ignore them all.
          </p>
        </div>


        <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {/* Search bar */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search for languages, frameworks, or tools..."
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
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

          {/* Tabs for categories */}
          {!searchQuery && (
            <div className="px-6 pt-4">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-4">
                <div className="relative">
                  {/* Improved scrollable tabs container */}
                  <div
                    ref={tabsRef}
                    className="overflow-x-auto scrollbar-hide touch-pan-x"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    <TabsList className="inline-flex w-max bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
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
                  {/* Scroll indicators */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none sm:hidden"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none sm:hidden"></div>
                </div>
              </Tabs>
            </div>
          )}

          {/* Search results heading */}
          {searchQuery && (
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Search results for "{searchQuery}"
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="h-7 px-2 text-xs">
                Clear search
              </Button>
            </div>
          )}

          {/* Grid of items */}
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
                            selectedTypes.includes(item.id) ? "text-primary" : "text-zinc-500 dark:text-zinc-400",
                          )}
                        >
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium truncate">{item.label}</span>
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
                    {searchQuery ? "No matches found for your search" : "No items available in this category"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Selected count and actions */}
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col xs:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {selectedTypes.length} {selectedTypes.length === 1 ? "item" : "items"} selected
              </span>
              {selectedTypes.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => setSelectedTypes([])} className="h-7 px-2 text-xs bg-secondary">
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
                    <DrawerTitle className="text-xl font-bold">Your .gitignore File</DrawerTitle>
                    <DrawerDescription className="text-sm">
                      Based on your selected project types:{" "}
                      {selectedTypes
                        .map((id) => {
                          const category = projectTypes.find((c) => c.items.some((i) => i.id === id))
                          const item = category?.items.find((i) => i.id === id)
                          return item?.label
                        })
                        .join(", ")}
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <CodeBlock code={generateGitIgnore()} language="gitignore" showLineNumbers={true} />
                  </div>
                  <DrawerFooter className="flex flex-col sm:flex-row justify-end gap-2">
                    <DrawerClose asChild>
                      <Button variant="outline" className="border-zinc-300 dark:border-zinc-700">
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
                    <Button onClick={downloadGitIgnore} className="gap-2 bg-primary hover:bg-primary/50">
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
                const category = projectTypes.find((c) => c.items.some((i) => i.id === typeId))
                const item = category?.items.find((i) => i.id === typeId)
                return (
                  item && (
                    <span
                      key={typeId}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 gap-2 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      {item.icon}
                      <span className="max-w-[100px] truncate">{item.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTypeToggle(typeId)
                        }}
                        className="rounded-full p-0.5 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  )
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Based on the official GitHub .gitignore templates. Select multiple project types to combine them.</p>
        </div>
      </div>
    </div >
  )
}
