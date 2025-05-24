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
      {
        id: "ruby",
        label: "Ruby",
        icon: <FileCode2 className="h-4 w-4 text-red-600" />,
        content: `*.gem
*.rbc
/.config
/coverage/
/InstalledFiles
/pkg/
/spec/reports/
/spec/examples.txt
/test/tmp/
/test/version_tmp/
/tmp/

# Used by dotenv library to load environment variables.
# .env

# Ignore Byebug command history file.
.byebug_history

## Specific to RubyMotion:
.dat*
.repl_history
build/
*.bridgesupport
build-iPhoneOS/
build-iPhoneSimulator/

## Documentation cache and generated files:
/.yardoc/
/_yardoc/
/doc/
/rdoc/

## Environment normalization:
/.bundle/
/vendor/bundle
/lib/bundler/man/

# for a library or gem, you might want to ignore these files since the code is
# intended to run in multiple environments; otherwise, check them in:
# Gemfile.lock
# .ruby-version
# .ruby-gemset

# unless supporting rvm < 1.11.0 or doing something fancy, ignore this:
.rvmrc

# Used by RuboCop. Remote config files pulled in from inherit_from directive.
# .rubocop-https?--*`,
      },
      {
        id: "csharp",
        label: "C#",
        icon: <FileCode2 className="h-4 w-4 text-purple-500" />,
        content: `## Ignore Visual Studio temporary files, build results, and
## files generated by popular Visual Studio add-ons.
##
## Get latest from https:

# User-specific files
*.rsuser
*.suo
*.user
*.userosscache
*.sln.docstates

# User-specific files (MonoDevelop/Xamarin Studio)
*.userprefs

# Mono auto generated files
mono_crash.*

# Build results
[Dd]ebug/
[Dd]ebugPublic/
[Rr]elease/
[Rr]eleases/
x64/
x86/
[Ww][Ii][Nn]32/
[Aa][Rr][Mm]/
[Aa][Rr][Mm]64/
bld/
[Bb]in/
[Oo]bj/
[Ll]og/
[Ll]ogs/

# Visual Studio 2015/2017 cache/options directory
.vs/

# MSTest test Results
[Tt]est[Rr]esult*/
[Bb]uild[Ll]og.*

# NUnit
*.VisualState.xml
TestResult.xml
nunit-*.xml

# Build Results of an ATL Project
[Dd]ebugPS/
[Rr]eleasePS/
dlldata.c

# .NET Core
project.lock.json
project.fragment.lock.json
artifacts/

# ASP.NET Scaffolding
ScaffoldingReadMe.txt

# Files built by Visual Studio
*_i.c
*_p.c
*_h.h
*.ilk
*.meta
*.obj
*.iobj
*.pch
*.pdb
*.ipdb
*.pgc
*.pgd
*.rsp
*.sbr
*.tlb
*.tli
*.tlh
*.tmp
*.tmp_proj
*_wpftmp.csproj
*.log
*.tlog
*.vspscc
*.vssscc
.builds
*.pidb
*.svclog
*.scc`,
      },
      {
        id: "cpp",
        label: "C++",
        icon: <FileCode2 className="h-4 w-4 text-blue-600" />,
        content: `# Prerequisites
*.d

# Compiled Object files
*.slo
*.lo
*.o
*.obj

# Precompiled Headers
*.gch
*.pch

# Compiled Dynamic libraries
*.so
*.dylib
*.dll

# Fortran module files
*.mod
*.smod

# Compiled Static libraries
*.lai
*.la
*.a
*.lib

# Executables
*.exe
*.out
*.app`,
      },
      {
        id: "swift",
        label: "Swift",
        icon: <FileCode2 className="h-4 w-4 text-orange-500" />,
        content: `# Xcode
#
# gitignore contributors: remember to update Global/Xcode.gitignore, Objective-C.gitignore & Swift.gitignore

## User settings
xcuserdata/

## compatibility with Xcode 8 and earlier (ignoring not required starting Xcode 9)
*.xcscmblueprint
*.xccheckout

## compatibility with Xcode 3 and earlier (ignoring not required starting Xcode 4)
build/
DerivedData/
*.moved-aside
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3

## Obj-C/Swift specific
*.hmap

## App packaging
*.ipa
*.dSYM.zip
*.dSYM

## Playgrounds
timeline.xctimeline
playground.xcworkspace

# Swift Package Manager
#
# Add this line if you want to avoid checking in source code from Swift Package Manager dependencies.
# Packages/
# Package.pins
# Package.resolved
# *.xcodeproj
#
# Xcode automatically generates this directory with a .xcworkspacedata file and xcuserdata
# hence it is not needed unless you have added a package configuration file to your project
# .swiftpm

.build/`,
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
crash.*.log

# Exclude all .tfvars files, which are likely to contain sensitive data, such as
# password, private keys, and other secrets. These should not be part of version 
# control as they are data points which are potentially sensitive and subject 
# to change depending on the environment.
*.tfvars
*.tfvars.json

# Ignore override files as they are usually used to override resources locally and so
# are not checked in
override.tf
override.tf.json
*_override.tf
*_override.tf.json

# Include override files you do wish to add to version control using negated pattern
# !example_override.tf

# Include tfplan files to ignore the plan output of command: terraform plan -out=tfplan
# example: *tfplan*

# Ignore CLI configuration files
.terraformrc
terraform.rc`,
      },
      {
        id: "ansible",
        label: "Ansible",
        icon: <FileCode2 className="h-4 w-4 text-red-500" />,
        content: `*.retry
.galaxy_install_info`,
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

# Icon must end with two \r
Icon

# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

# iCloud generated files
*.icloud`,
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

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp

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
!.vscode/*.code-snippets

# Local History for Visual Studio Code
.history/

# Built Visual Studio Code Extensions
*.vsix`,
      },
      {
        id: "intellij",
        label: "IntelliJ",
        icon: <FileCode2 className="h-4 w-4 text-pink-500" />,
        content: `# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio, WebStorm and Rider
# Reference: https:

# User-specific stuff
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/**/usage.statistics.xml
.idea/**/dictionaries
.idea/**/shelf

# AWS User-specific
.idea/**/aws.xml

# Generated files
.idea/**/contentModel.xml

# Sensitive or high-churn files
.idea/**/dataSources/
.idea/**/dataSources.ids
.idea/**/dataSources.local.xml
.idea/**/sqlDataSources.xml
.idea/**/dynamic.xml
.idea/**/uiDesigner.xml
.idea/**/dbnavigator.xml

# Gradle
.idea/**/gradle.xml
.idea/**/libraries

# Gradle and Maven with auto-import
# When using Gradle or Maven with auto-import, you should exclude module files,
# since they will be recreated, and may cause churn.  Uncomment if using
# auto-import.
# .idea/artifacts
# .idea/compiler.xml
# .idea/jarRepositories.xml
# .idea/modules.xml
# .idea/*.iml
# .idea/modules
# *.iml
# *.ipr

# CMake
cmake-build-*/

# Mongo Explorer plugin
.idea/**/mongoSettings.xml

# File-based project format
*.iws

# IntelliJ
out/

# mpeltonen/sbt-idea plugin
.idea_modules/

# JIRA plugin
atlassian-ide-plugin.xml

# Cursive Clojure plugin
.idea/replstate.xml

# SonarLint plugin
.idea/sonarlint/

# Crashlytics plugin (for Android Studio and IntelliJ)
com_crashlytics_export_strings.xml
crashlytics.properties
crashlytics-build.properties
fabric.properties

# Editor-based Rest Client
.idea/httpRequests

# Android studio 3.1+ serialized cache file
.idea/caches/build_file_checksums.ser`,
      },
      {
        id: "vim",
        label: "Vim",
        icon: <FileCode2 className="h-4 w-4 text-green-600" />,
        content: `# Swap
[._]*.s[a-v][a-z]
!*.svg  # comment out if you don't need vector files
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
# Auto-generated tag files
tags
# Persistent undo
[._]*.un~`,
      },
      {
        id: "emacs",
        label: "Emacs",
        icon: <FileCode2 className="h-4 w-4 text-purple-500" />,
        content: `# -*- mode: gitignore; -*-
*~
\\#*\\#
/.emacs.desktop
/.emacs.desktop.lock
*.elc
auto-save-list
tramp
.\\#*

# Org-mode
.org-id-locations
*_archive

# flymake-mode
*_flymake.*

# eshell files
/eshell/history
/eshell/lastdir

# elpa packages
/elpa/

# reftex files
*.rel

# AUCTeX auto folder
/auto/

# cask packages
.cask/
dist/

# Flycheck
flycheck_*.el

# server auth directory
/server/

# projectiles files
.projectile

# directory configuration
.dir-locals.el

# network security
/network-security.data`,
      },
      {
        id: "sublimetext",
        label: "Sublime Text",
        icon: <FileCode2 className="h-4 w-4 text-orange-400" />,
        content: `# Cache files for Sublime Text
*.tmlanguage.cache
*.tmPreferences.cache
*.stTheme.cache

# Workspace files are user-specific
*.sublime-workspace

# Project files should be checked into the repository, unless a significant
# proportion of contributors will probably not be using Sublime Text
# *.sublime-project

# SFTP configuration file
sftp-config.json
sftp-config-alt*.json

# Package control specific files
Package Control.last-run
Package Control.ca-list
Package Control.ca-bundle
Package Control.system-ca-bundle
Package Control.cache/
Package Control.ca-certs/
Package Control.merged-ca-bundle
Package Control.user-ca-bundle
oscrypto-ca-bundle.crt
bh_unicode_properties.cache

# Sublime-github package stores a github token in this file
# https:
GitHub.sublime-settings`,
      },
    ],
  },
];

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
      </p>
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
      <SonnerToaster position="top-center" closeButton richColors />
      <header className="w-full border-b sticky top-0 z-20 backdrop-blur-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black/50">
        <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GitBranchPlus className="h-5 w-5 sm:h-6 sm:w-6 text-primary dark:text-primary" />
            <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
              Gitie
            </h1>
          </div>
          {/* <ThemeToggle /> */}
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
