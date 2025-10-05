# create-ai-chat-context

![npm version](https://img.shields.io/npm/v/create-ai-chat-context)
![GitHub release](https://img.shields.io/github/v/release/Vaeshkar/create-ai-chat-context)
![Downloads](https://img.shields.io/npm/dm/create-ai-chat-context.svg)
![Commands](https://img.shields.io/badge/Commands-14-blue)
![AI Integrations](https://img.shields.io/badge/AI%20Integrations-6-green)
![Templates](https://img.shields.io/badge/Templates-32-orange)

> **✅ STABLE VERSION:** Simple, reliable AI context management for daily development. For advanced automation see [experimental version](https://github.com/Vaeshkar/create-ai-chat-context-experimental).

---

## 📢 Important Update: Project Split

We've **simplified this version** to focus on **stability and reliability**. Here's why:

- **Complex features** caused maintenance overhead and broke frequently
- **Users wanted reliability** over experimental automation  
- **Manual workflow** gives you full control over your knowledge base

**Result:** This stable version has **14 focused commands** that just work, while all experimental features live in the [experimental repo](https://github.com/Vaeshkar/create-ai-chat-context-experimental).

---

## The Problem

When working with AI coding assistants (ChatGPT, Claude, Copilot, Cursor, Augment, Warp, etc.), every new chat session loses all context. You have to re-explain your project architecture, technical decisions, why you chose X over Y, what you accomplished in previous sessions, and known issues. This wastes significant time in every chat session.

## The Solution

`create-ai-chat-context` creates a `.ai/` knowledge base in your project that AI assistants read at the start of each chat. Result: AI gets full context immediately. No more re-explaining.

### 📁 What Gets Created

The tool creates **7 essential documentation files** in your project:

| File                       | Purpose                           |
| -------------------------- | --------------------------------- |
| **conversation-log.md**    | Chat history and key decisions    |
| **technical-decisions.md** | Why you chose X over Y            |
| **next-steps.md**          | Current priorities and tasks      |
| **project-overview.md**    | Project context for AI assistants |
| **design-system.md**       | Design patterns and conventions   |
| **code-style.md**          | Coding standards and guidelines   |
| **README.md**              | Overview of the knowledge base    |

**Simple, focused, and effective.** No complex formats or setup needed.

---

## 🎯 32 Comprehensive Templates

**Mind-blowing coverage:** We support virtually every major programming language, framework, and development category!

### JavaScript/TypeScript Ecosystem
- **nextjs** - Next.js, React, TypeScript projects
- **react** - React, Create React App, Vite projects  
- **vue** - Vue.js, Nuxt.js, Vite projects
- **angular** - Angular projects with TypeScript
- **node** - Node.js backend projects, Express, NestJS

### Python Ecosystem
- **python** - General Python projects
- **django** - Django web framework projects
- **fastapi** - FastAPI backend projects  
- **flask** - Flask web framework projects

### Systems Programming
- **rust** - Rust systems programming projects
- **go** - Go backend and systems projects
- **cpp** - C++ systems and application projects

### Enterprise/JVM
- **java** - Java projects, Spring Boot, Maven/Gradle
- **spring** - Spring Boot, Spring Framework projects
- **kotlin** - Kotlin projects, Android, multiplatform

### .NET Ecosystem
- **csharp** - C# .NET projects
- **dotnet** - .NET Core, ASP.NET Core projects

### Web Technologies
- **php** - PHP projects, Laravel, Symfony
- **laravel** - Laravel PHP framework projects
- **ruby** - Ruby projects, Ruby on Rails
- **rails** - Ruby on Rails web framework projects

### Specialized Development
- **mobile** - React Native, Flutter, Swift, Kotlin
- **fullstack** - Full-stack projects with frontend + backend
- **api** - Generic backend API projects
- **database** - Database design, migrations, stored procedures
- **devops** - Docker, Kubernetes, CI/CD, Infrastructure
- **terraform** - Infrastructure as Code with Terraform
- **ai_ml** - Machine Learning, Deep Learning, Data Science
- **blockchain** - Smart contracts, DApps, cryptocurrency
- **gamedev** - Unity, Unreal, indie games, mobile games

**Each template includes:**
- Language-specific project structure
- Framework conventions and best practices
- Common dependencies and tooling
- Security and performance guidelines
- Deployment strategies
- Code style standards

---

## 🚀 Quick Start

```bash
# Auto-detect project type
npx aic init

# Or use specific technology template
npx aic init --template nextjs     # Next.js/React projects
npx aic init --template python     # Python projects  
npx aic init --template rust       # Rust projects
npx aic init --template go         # Go projects
npx aic init --template java       # Java/Spring Boot
npx aic init --template react      # React projects
npx aic init --template vue        # Vue.js projects
npx aic init --template fastapi    # Python FastAPI
npx aic init --template django     # Django projects
npx aic init --template devops     # DevOps/Infrastructure
npx aic init --template ai_ml      # AI/ML projects

# Customize for your project
vim .ai/project-overview.md
vim .ai/technical-decisions.md

# Commit to Git
git add .ai/ .ai-instructions
git commit -m "Add AI knowledge base"

# In your next AI chat, start with:
"Read .ai-instructions first, then help me with [your task]"
```

**💡 Tip:** Use `npx aic` instead of `npx create-ai-chat-context` for shorter commands!

---

## 🔧 Essential Commands

### Core Commands (8)

```bash
# Setup & Management
npx aic init                    # Initialize knowledge base
npx aic migrate                 # Add missing files to existing project
npx aic validate                # Check knowledge base quality
npx aic check                   # Quick health check

# Daily Usage  
npx aic search "query"          # Find information in knowledge base
npx aic tokens                  # Show token usage breakdown
npx aic stats                   # View knowledge base statistics
npx aic config                  # Manage configuration
```

### AI Integrations (6)

```bash
# AI Assistant Setup
npx aic cursor                  # Generate .cursorrules for Cursor IDE
npx aic warp                    # Generate Warp AI terminal instructions
npx aic copilot                 # Generate GitHub Copilot instructions
npx aic claude-project          # Generate Claude Projects export
npx aic chatgpt                 # Generate ChatGPT integration instructions
npx aic gemini                  # Generate Google Gemini integration instructions
```

**That's it!** Just 14 focused commands that cover everything you need.

---

## 🤖 AI Integration Examples

### Cursor IDE Integration
```bash
npx aic cursor
# Creates .cursorrules file
# Cursor automatically reads your knowledge base in every chat!
```

### Warp AI Terminal Integration  
```bash
npx aic warp
# Creates WARP_AI_INSTRUCTIONS.md with perfect copy-paste prompt
# Use in Warp AI to get full project context immediately
```

### GitHub Copilot Integration
```bash
npx aic copilot  
# Creates copilot-instructions.md
# Configure Copilot to understand your project conventions
```

### Claude Projects Integration
```bash
npx aic claude-project
# Creates CLAUDE_PROJECT.md for easy import
# Set up Claude Projects with your full knowledge base
```

### ChatGPT Integration
```bash
npx aic chatgpt
# Creates CHATGPT_INSTRUCTIONS.md with optimized prompts
# Perfect setup for ChatGPT web interface and API
```

### Google Gemini Integration
```bash
npx aic gemini
# Creates GEMINI_INSTRUCTIONS.md optimized for 1M token context
# Take advantage of Gemini's massive context window
```

---

## 📖 Simple Manual Workflow

This stable version uses a **simple manual workflow** that gives you full control:

1. **Initialize** your project: `npx aic init`
2. **Customize** the generated files for your project
3. **Start AI chat** with: "Read .ai-instructions first"
4. **Have productive session** with full context
5. **Manually update** conversation-log.md with key decisions
6. **Repeat** for next session

**Why manual?** 
- ✅ **You control** what gets saved
- ✅ **No surprises** - you know exactly what's in your knowledge base  
- ✅ **Works reliably** - no complex automation to break
- ✅ **Universal** - works the same with every AI assistant

---

## 🔬 Advanced Features Available

Looking for **complex automation**, **intelligent agents**, and **multi-AI detection**?

Check out the **[experimental version](https://github.com/Vaeshkar/create-ai-chat-context-experimental)** with:

- 🤖 **Intelligent agent system** - Automatic conversation parsing
- 🔄 **Real-time memory management** - Zero-API-cost processing  
- 🎯 **Multi-LLM detection** - Automatically detects which AI you're using
- 📊 **Advanced AICF format** - 85% token reduction with structured data
- ⚡ **Automated workflows** - Session management and handoff systems

**When to use experimental:**
- You want cutting-edge automation
- You're comfortable with experimental features
- You want to contribute to AI tooling research

**When to use stable (this version):**
- You want reliability over features
- You prefer manual control  
- You need something that just works
- You're using this in production

---

## 🛠️ Configuration

Optional configuration for customizing the tool:

```bash
# View current configuration
npx aic config

# Set preferred AI model for token reports (optional)
npx aic config set preferredModel "Claude Sonnet 4.5"
```

**Configuration is stored per-project** in `.ai/config.json`. See [CONFIGURATION.md](CONFIGURATION.md) for details.

---

## 📚 Full Documentation

### Core Documentation
- **[COMMANDS.md](COMMANDS.md)** - Complete command reference with examples
- **[CONFIGURATION.md](CONFIGURATION.md)** - Detailed configuration guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates

### After Running `init`
These files are created in your project:

**📁 .ai/ Directory (Human-readable files):**
- **`.ai/README.md`** - Overview of the knowledge base system
- **`.ai/project-overview.md`** - Project context and conventions (AI config)
- **`.ai/conversation-log.md`** - Chat history and decisions
- **`.ai/technical-decisions.md`** - Architecture and technical choices
- **`.ai/next-steps.md`** - Current priorities and tasks
- **`.ai/design-system.md`** - Design patterns and conventions
- **`.ai/code-style.md`** - Coding standards and guidelines

**📁 .aicf/ Directory (AI-optimized files):**
- **`.aicf/conversations.aicf`** - Structured conversation history
- **`.aicf/decisions.aicf`** - Technical decisions in structured format
- **`.aicf/tasks.aicf`** - Project tasks and priorities
- **`.aicf/issues.aicf`** - Known issues and solutions
- **`.aicf/technical-context.aicf`** - Technical context and architecture
- **`.aicf/README.md`** - AICF format documentation
- **And more...** - Additional context files

**📄 Root files:**
- **`.ai-instructions`** - Instructions for AI assistants

---

## 🔗 Links

- [GitHub Repository](https://github.com/Vaeshkar/create-ai-chat-context)
- [npm Package](https://www.npmjs.com/package/create-ai-chat-context)
- [Issue Tracker](https://github.com/Vaeshkar/create-ai-chat-context/issues)
- [Full Documentation](https://github.com/Vaeshkar/create-ai-chat-context#readme)
- [Experimental Version](https://github.com/Vaeshkar/create-ai-chat-context-experimental)

---

## 📄 License

MIT

---

**Made with ❤️ for developers who use AI assistants daily**

---

**Questions?** [Open an issue on GitHub](https://github.com/Vaeshkar/create-ai-chat-context/issues)