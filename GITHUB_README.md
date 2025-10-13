# create-ai-chat-context

[![npm version](https://img.shields.io/npm/v/create-ai-chat-context)](https://www.npmjs.com/package/create-ai-chat-context)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-120%20passing-brightgreen.svg)](https://github.com/Vaeshkar/create-ai-chat-context)

> **AI memory system for your projects** - Never lose context between AI chat sessions again.

Stop wasting 30+ minutes re-explaining your project to AI assistants every chat session.

---

## The Problem

When working with AI coding assistants (ChatGPT, Claude, Copilot, Cursor, Augment, etc.), **every new chat session loses all context**.

You have to re-explain:

- Your project architecture
- Technical decisions you made
- Why you chose X over Y
- What you accomplished in previous sessions
- Known issues and solutions

**This wastes significant time in every chat session.** 😤

---

## The Solution

`create-ai-chat-context` creates a `.ai/` knowledge base in your project that AI assistants read at the start of each chat.

**Result:** AI gets full context immediately. No more re-explaining!

### 📁 What Gets Created

**7 essential markdown files** in `.ai/` directory:

| File                       | Purpose                           |
| -------------------------- | --------------------------------- |
| **conversation-log.md**    | Chat history and key decisions    |
| **technical-decisions.md** | Why you chose X over Y            |
| **next-steps.md**          | Current priorities and tasks      |
| **project-overview.md**    | Project context for AI assistants |
| **design-system.md**       | Design patterns and conventions   |
| **code-style.md**          | Coding standards and guidelines   |
| **README.md**              | Overview of the knowledge base    |

**Plus:**

- `.aicf/` directory - AI-optimized compressed format
- `.ai-instructions` - Instructions for AI assistants
- `NEW_CHAT_PROMPT.md` - Template for starting new chats

### What is `.aicf/`?

The `.aicf/` directory contains AI-optimized versions of your knowledge base:

- **Structured format** - Pipe-delimited sections for faster parsing
- **Compressed** - 80 lines instead of 300 lines (same information)
- **AI-optimized** - Designed for AI assistants to parse quickly
- **Auto-generated** - Created automatically by `aic init`

**You don't need to edit `.aicf/` files manually** - they're for AI consumption. Edit the `.ai/` markdown files instead.

---

## 🚀 Quick Start

```bash
# Initialize knowledge base (no installation needed)
npx create-ai-chat-context@latest init

# Or use short alias
npx aic@latest init

# Customize for your project
vim .ai/project-overview.md
vim .ai/technical-decisions.md

# Commit to Git
git add .ai/ .aicf/ .ai-instructions NEW_CHAT_PROMPT.md
git commit -m "Add AI knowledge base"
```

---

## 📦 Installation

```bash
# Use with npx (recommended - no installation needed)
npx create-ai-chat-context@latest init

# Or install globally
npm install -g create-ai-chat-context@latest
aic init

# Or install as dev dependency
npm install --save-dev create-ai-chat-context@latest
npx aic init
```

---

## 🎯 Commands

### `aic init`

Initialize a new AI knowledge base in your project.

```bash
npx aic@latest init                    # Create .ai/ and .aicf/ directories
npx aic@latest init --force            # Overwrite existing files
npx aic@latest init --verbose          # Show detailed output
npx aic@latest init --dry-run          # Preview without creating files
```

### `aic migrate`

Migrate existing installation to latest version (adds missing files).

```bash
npx aic@latest migrate                 # Add missing files
npx aic@latest migrate --verbose       # Show detailed output
npx aic@latest migrate --dry-run       # Preview changes
```

### `aic tokens`

Analyze token usage in your knowledge base.

```bash
npx aic@latest tokens                  # Show total token count
npx aic@latest tokens --verbose        # Show breakdown by file
```

### `aic stats`

Show knowledge base statistics.

```bash
npx aic@latest stats                   # Show statistics
npx aic@latest stats --verbose         # Show detailed file list
```

## 🎨 Templates

`aic init` automatically detects your project type and uses appropriate templates.

**32 supported languages and frameworks:**

TypeScript, JavaScript, Python, Rust, Go, Java, Kotlin, C#, C++, PHP, Ruby, Swift, and 20 more including Next.js, React, Vue, Angular, Django, FastAPI, Spring Boot, Rails, Laravel, and specialized templates for AI/ML, blockchain, DevOps, and game development.

**Auto-detection** - Just run `aic init` and it figures out your project type.

---

## 💡 How It Works

1. **Initialize** - Run `aic init` to create `.ai/` directory with template files
2. **Customize** - Edit files to match your project
3. **Update** - Keep files updated as your project evolves
4. **AI Reads** - AI assistants read these files at the start of each chat

**Simple, manual, reliable.** You control when files are updated.

---

## 🎨 Example Workflow

```bash
# Start new project
mkdir my-project && cd my-project
npm init -y

# Initialize AI knowledge base
npx create-ai-chat-context@latest init

# Customize for your project
vim .ai/project-overview.md
# Add: "Building a REST API with Express and TypeScript"

vim .ai/technical-decisions.md
# Add: "Using PostgreSQL for data persistence"

# Commit
git add .ai/ .aicf/ .ai-instructions NEW_CHAT_PROMPT.md
git commit -m "Add AI knowledge base"

# Start coding with AI
# AI now has full context from .ai/ files!
```

---

## 📊 What's New in v2.0.0

**Complete TypeScript rewrite with modern standards:**

- ✅ **TypeScript 5.7+** - Full type safety with strict mode
- ✅ **ESM Modules** - Modern ES modules (with CJS compatibility)
- ✅ **4 Core Commands** - Simplified from 14 to 4 essential commands
- ✅ **120 Tests** - 100% passing with TDD approach
- ✅ **1,439 Lines** - Up from 323 lines, all tested
- ✅ **October 2025 Standards** - Modern best practices

**Philosophy:** "Small things, with love" 🪵

We built exactly what was needed - 4 core commands, clean tested code, modern standards, professional quality.

---

## 🔧 Requirements

- **Node.js** 20.0.0 or higher
- **npm** 7.0.0 or higher (or pnpm/yarn)

---

## 📚 Documentation

See the `docs/` directory for development documentation:

- **Development Guide** - How v2.0.0 was built
- **Completion Reports** - Phase completion details
- **Architecture** - System design and decisions

**Note:** Documentation is being updated for v2.0.0. See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📝 License

MIT © [Dennis H. A. van Leeuwen](https://github.com/Vaeshkar)

---

## 🔗 Links

- [GitHub Repository](https://github.com/Vaeshkar/create-ai-chat-context)
- [npm Package](https://www.npmjs.com/package/create-ai-chat-context)
- [Issue Tracker](https://github.com/Vaeshkar/create-ai-chat-context/issues)
- [Changelog](./CHANGELOG.md)

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐️ on [GitHub](https://github.com/Vaeshkar/create-ai-chat-context)!

---

**Built with ❤️ following "Small things, with love" philosophy**
