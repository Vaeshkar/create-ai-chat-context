# create-ai-chat-context

<div align="center">

[![npm version](https://badge.fury.io/js/create-ai-chat-context.svg)](https://www.npmjs.com/package/create-ai-chat-context)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/create-ai-chat-context.svg)](https://www.npmjs.com/package/create-ai-chat-context)
[![Stable](https://img.shields.io/badge/version-stable-green.svg)](https://github.com/Vaeshkar/create-ai-chat-context)

### **Simple AI Memory System for Daily Development**

### Never lose context between AI chat sessions again

**✅ STABLE VERSION** - Reliable, focused, production-ready

Stop wasting 30+ minutes re-explaining your project to AI assistants every chat session.

[Quick Start](#-quick-start) • [12 Commands](#-essential-commands) • [32 Templates](#-32-comprehensive-templates) • [AI Integrations](#-ai-integrations)

</div>

---

## 📢 **Important: Project Split**

We've **simplified this version** to focus on **reliability and daily productivity**:

- **✅ This Version:** Simple, stable, manual workflow - perfect for production use
- **🔬 Experimental:** Advanced automation, agents, multi-AI detection → [experimental repo](https://github.com/Vaeshkar/create-ai-chat-context-experimental)

**Why the split?** Complex features caused maintenance overhead. Users wanted something that **just works**.

---

## 🤔 The Problem

When working with AI coding assistants (ChatGPT, Claude, Copilot, Cursor, Augment, Warp, etc.), you face a frustrating issue:

**Every new chat session loses all context.**

You have to re-explain:
- Your project architecture
- Technical decisions you made  
- Why you chose X over Y
- What you accomplished in previous sessions
- Known issues and solutions

**This wastes 30+ minutes EVERY chat session.** 😤

---

## ✅ The Solution

`create-ai-chat-context` creates a `.ai/` knowledge base in your project that AI assistants read at the start of each chat.

**Result:** AI gets full context immediately. No more re-explaining!

### 📁 What Gets Created

**7 essential files** + **AI-optimized .aicf files**:

<div align="center">

| File | Purpose |
|------|---------|
| **conversation-log.md** | Chat history and key decisions |
| **technical-decisions.md** | Why you chose X over Y |
| **next-steps.md** | Current priorities and tasks |
| **project-overview.md** | Project context for AI assistants |
| **design-system.md** | Design patterns and conventions |
| **code-style.md** | Coding standards and guidelines |
| **README.md** | Overview of the knowledge base |

</div>

**Plus:** `.aicf/` directory with structured AI-optimized files for faster parsing.

---

## 🚀 Quick Start

```bash
# Auto-detect project type
npx aic init

# Or use specific template
npx aic init --template nextjs     # Next.js/React projects
npx aic init --template python     # Python projects  
npx aic init --template rust       # Rust projects
npx aic init --template go         # Go projects

# Customize for your project
vim .ai/project-overview.md
vim .ai/technical-decisions.md

# Commit to Git
git add .ai/ .ai-instructions .aicf/
git commit -m "Add AI knowledge base"

# In your next AI chat, start with:
"Read .ai-instructions first, then help me with [your task]"
```

**💡 Tip:** Use `npx aic` instead of `npx create-ai-chat-context` for shorter commands!

---

## 🔧 Essential Commands

<div align="center">

### **12 Focused Commands - Everything You Need**

</div>

```bash
# 🏗️ Core Setup & Management
npx aic init                    # Initialize knowledge base
npx aic migrate                 # Add missing files to existing project
npx aic validate                # Check knowledge base quality  
npx aic check                   # Quick health check

# 📊 Daily Usage
npx aic search "query"          # Find information in knowledge base
npx aic tokens                  # Show token usage breakdown
npx aic stats                   # View knowledge base statistics
npx aic config                  # Manage configuration

# 🤖 AI Integrations
npx aic cursor                  # Generate .cursorrules for Cursor IDE
npx aic warp                    # Generate Warp AI terminal instructions  
npx aic copilot                 # Generate GitHub Copilot instructions
npx aic claude-project          # Generate Claude Projects export
```

**That's it!** Simple, focused, reliable.

---

## 🎯 32 Comprehensive Templates

**Mind-blowing coverage** for virtually every major tech stack:

<div align="center">

| Category | Templates |
|----------|-----------|
| **JavaScript/TypeScript** | `nextjs`, `react`, `vue`, `angular`, `node` |
| **Python** | `python`, `django`, `fastapi`, `flask` |
| **Systems Programming** | `rust`, `go`, `cpp` |
| **Enterprise/JVM** | `java`, `spring`, `kotlin` |
| **.NET** | `csharp`, `dotnet` |
| **Web Technologies** | `php`, `laravel`, `ruby`, `rails` |
| **Specialized** | `mobile`, `fullstack`, `api`, `database`, `devops`, `terraform`, `ai_ml`, `blockchain`, `gamedev` |

</div>

**Each template includes:**
- Language-specific project structure
- Framework conventions and best practices
- Common dependencies and tooling
- Security and performance guidelines

---

## 🤖 AI Integrations

<div align="center">

### **4 Popular AI Assistants Supported**

</div>

### Cursor IDE Integration
```bash
npx aic cursor
# Creates .cursorrules file
# ✅ Cursor automatically reads your knowledge base!
```

### Warp AI Terminal
```bash  
npx aic warp
# Creates WARP_AI_INSTRUCTIONS.md with perfect copy-paste prompt
# ✅ Get full project context in Warp AI instantly!
```

### GitHub Copilot
```bash
npx aic copilot  
# Creates copilot-instructions.md
# ✅ Configure Copilot to understand your project!
```

### Claude Projects
```bash
npx aic claude-project
# Creates CLAUDE_PROJECT.md for easy import
# ✅ Set up Claude Projects with full knowledge base!
```

---

## 📖 Simple Manual Workflow

<div align="center">

### **You Control Everything - No Surprises**

</div>

1. **Initialize** your project: `npx aic init`
2. **Customize** the generated files for your project  
3. **Start AI chat** with: "Read .ai-instructions first"
4. **Have productive session** with full context
5. **Manually update** conversation-log.md with key decisions
6. **Repeat** for next session

**Why manual?**
- ✅ **Full control** over what gets saved
- ✅ **No surprises** - you know exactly what's in your knowledge base
- ✅ **Works reliably** - no complex automation to break
- ✅ **Universal** - works the same with every AI assistant

---

## 🔬 Advanced Features Available

Looking for **automated conversation parsing**, **intelligent agents**, and **multi-AI detection**?

<div align="center">

### **[Check out the Experimental Version →](https://github.com/Vaeshkar/create-ai-chat-context-experimental)**

**Advanced Features:**
- 🤖 Intelligent agent system
- 🔄 Real-time memory management  
- 🎯 Multi-LLM detection
- 📊 Advanced AICF format (85% token reduction)
- ⚡ Automated workflows

</div>

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

## 📊 Usage Examples

### Before create-ai-chat-context
```
🤖 AI: "Hi! How can I help?"
👨‍💻 You: "I'm working on a Next.js project with TypeScript, 
         using Prisma for the database, NextAuth for auth,
         Tailwind for styling. We decided to use server 
         components over client components for better 
         performance. Last session we implemented the 
         user dashboard and decided to use Zustand for 
         state management. There's a known issue with 
         the auth callback URL in development. Can you 
         help me add a new feature for user profiles?"
```

### After create-ai-chat-context
```
🤖 AI: "Hi! How can I help?"
👨‍💻 You: "Read .ai-instructions first, then help me add 
         a new feature for user profiles"
🤖 AI: "I've read your knowledge base. I understand your 
      Next.js project architecture, the auth setup, 
      previous decisions about server components, and 
      the current state. Let's add the user profiles 
      feature..."
```

**Time saved: 5+ minutes per session** ⏰

---

## 📚 Documentation

- **[Complete Command Reference](COMMANDS.md)** - All 12 commands explained
- **[Configuration Guide](CONFIGURATION.md)** - Customize the tool
- **[Full Documentation](docs/)** - Comprehensive guides

---

## 🔗 Links

- **[GitHub Repository](https://github.com/Vaeshkar/create-ai-chat-context)**
- **[npm Package](https://www.npmjs.com/package/create-ai-chat-context)**
- **[Issue Tracker](https://github.com/Vaeshkar/create-ai-chat-context/issues)**
- **[Experimental Version](https://github.com/Vaeshkar/create-ai-chat-context-experimental)**

---

<div align="center">

## 🎉 **Ready to Never Lose Context Again?**

```bash
npx aic init
```

**Made with ❤️ for developers who use AI assistants daily**

---

**Questions?** [Open an issue on GitHub](https://github.com/Vaeshkar/create-ai-chat-context/issues)

</div>