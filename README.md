# create-ai-chat-context

![npm version](https://img.shields.io/npm/v/create-ai-chat-context)
![GitHub tag](https://img.shields.io/github/v/tag/Vaeshkar/create-ai-chat-context)
![Downloads](https://img.shields.io/npm/dm/create-ai-chat-context.svg)

> **Universal AI Memory Protocol - Never lose context between AI chat sessions**

---

## 🚀 **NEW: AICF 2.0 - Aligned with Anthropic's Context Management Vision**

On **September 29, 2025**, Anthropic announced [context management features](https://www.anthropic.com/news/context-management) for Claude, including a **memory tool** for persistent storage across conversations.

**We built AICF 2.0 - and it's even better:**

| Feature               | Anthropic | AICF 2.0   |
| --------------------- | --------- | ---------- |
| Token Reduction       | 84%       | **88%** ✨ |
| File-based Memory     | ✅        | ✅         |
| Persistent Storage    | ✅        | ✅         |
| Relationship Tracking | ❌        | **✅** ✨  |
| O(1) Lookup           | ❌        | **✅** ✨  |
| Works with ALL AIs    | ❌        | **✅** ✨  |

**New Commands:**

```bash
npx aic migrate      # Convert .ai/ to .aicf/ format
npx aic context --ai # Get AI-ready context for new chats
```

**The Magic:**

```
Chat Session 1 (fills up)
    ↓
npx aic context --ai
    ↓
Copy output
    ↓
Chat Session 2 (new)
    ↓
Paste context
    ↓
AI has FULL MEMORY of Session 1! ✨
```

---

## 🚨 FOR AI ASSISTANTS: READ THIS FIRST 🚨

**CRITICAL: Before working on this project, read the `.ai/` knowledge base:**

1. **`.ai/architecture.md`** - Complete system architecture
2. **`.ai/conversation-log.md`** - Key decisions from previous chats
3. **`.ai/technical-decisions.md`** - Why we chose X over Y

**Why?** This preserves institutional knowledge so you have full context immediately.

**See `.ai-instructions` file for detailed instructions.**

---

## The Problem

When working with AI coding assistants (ChatGPT, Claude, Copilot, Cursor, Augment, etc.), every new chat session loses all context. You have to re-explain your project architecture, technical decisions, why you chose X over Y, what you accomplished in previous sessions, and known issues. This wastes significant time in every chat session.

Unlike other AI context tools that focus on project planning and rules, `create-ai-chat-context` focuses on preserving conversation history and technical decisions across sessions. It works with ALL AI assistants and maintains institutional knowledge through files like `conversation-log.md`, `technical-decisions.md`, and `known-issues.md`.

## The Solution

`create-ai-chat-context` creates a `.ai/` knowledge base in your project that AI assistants read at the start of each chat. Result: AI gets full context immediately. No more re-explaining.

### 🚀 Token-Efficient Formats

The tool supports three formats with increasing token efficiency:

| Format       | Tokens/Entry | Best For                     |
| ------------ | ------------ | ---------------------------- |
| **Markdown** | 150          | Human readability            |
| **YAML**     | 80           | Balance (readable + compact) |
| **AICF 2.0** | 12           | Maximum efficiency           |

**AICF 2.0** (AI Context Format) provides **88% token reduction** and enables persistent memory across chat sessions.

**Learn more:** [AICF Guide](./docs/aicf/AICF-GUIDE.md) | [Format Comparison](./docs/aicf/AICF-BENCHMARK-REPORT.md)

### 🎯 Aligned with Anthropic's Context Management Vision

On September 29, 2025, Anthropic announced [context management features](https://www.anthropic.com/news/context-management) for Claude. **AICF 2.0 implements their vision - and goes beyond:**

| Feature               | Anthropic | AICF 2.0   |
| --------------------- | --------- | ---------- |
| Token Reduction       | 84%       | **88%** ✨ |
| File-based Memory     | ✅        | ✅         |
| Persistent Storage    | ✅        | ✅         |
| Relationship Tracking | ❌        | **✅** ✨  |
| O(1) Lookup           | ❌        | **✅** ✨  |
| Works with ALL AIs    | ❌        | **✅** ✨  |

**Learn more:** [Anthropic Alignment](./docs/aicf/ANTHROPIC-ALIGNMENT.md)

## What's New

- **v0.12.0** - 🚀 AI-Native Format (AICF) - 85% token reduction! Keep 6x more history in context!
- **v0.11.1** - 🤖 AI-Optimized Format - YAML entries + pipe-delimited summaries (52% token reduction!)
- **v0.11.0** - 🚨 "Verify Before You Advise" - Prevents AI from suggesting completed work!
- **v0.10.2** - 🎯 All commands now recommend `chat-finish` (automatic workflow)!
- **v0.10.1** - ✨ Perfect formatting for all `.ai/` files - Clean, professional output!
- **v0.9.1** - 🔧 Fixed `chat-finish` compatibility with older conversation-log.md formats
- **v0.6.2** - ⚡ Added `aic` short alias (use `npx aic` instead of `npx create-ai-chat-context`)
- **v0.6.1** - 📖 Cleaned up README (76% shorter, easier to read)
- **v0.6.0** - 🎯 Auto-detection (Next.js, Python, Rust) + Git hooks for reminders
- **v0.5.0** - 🔍 Search, stats, export, and update commands
- **v0.4.0** - 🤖 GitHub Copilot & Claude Projects integration
- **v0.3.0** - 🎨 Project-specific templates (Next.js, Python)
- **v0.2.0** - 📝 Effortless logging, validation, Cursor integration

## Quick Start

```bash
# Initialize (auto-detects Next.js, Python, or Rust)
npx aic init

# Customize for your project
vim .ai/architecture.md
vim .ai/technical-decisions.md

# Commit to Git
git add .ai/ .ai-instructions
git commit -m "Add AI knowledge base"

# In your next AI chat, start with:
"Read .ai-instructions first, then help me with [your task]"
```

**💡 Tip:** Use `npx aic` instead of `npx create-ai-chat-context` for shorter commands!

## Key Commands

```bash
npx aic init                    # Initialize (auto-detects project type)
npx aic chat-finish             # 🎬 Auto-update all .ai/ files (recommended!)
npx aic search "query"          # Find information
npx aic stats                   # View analytics
npx aic validate                # Check quality
npx aic config                  # Manage configuration
npx aic export --format md      # Export knowledge base
npx aic update                  # Update templates
npx aic install-hooks           # Install Git hooks
npx aic cursor                  # Cursor AI integration
npx aic copilot                 # GitHub Copilot integration
npx aic claude-project          # Claude Projects export
npx aic archive --keep 10       # Archive old entries
npx aic tokens                  # Check token usage (top 4 models)
npx aic tokens --all            # Check token usage (all 16 models)
```

Run `npx aic --help` for all commands.

## Configuration

Set your preferences to customize the tool for your workflow:

```bash
# View current configuration
npx aic config

# Set your preferred AI model (gets highlighted with ⭐ in token reports)
npx aic config set preferredModel "Claude Sonnet 4.5"
npx aic config set preferredModel "GPT-5"
npx aic config set preferredModel "Gemini 1.5 Pro"

# Always show all models in token reports (default: top 4)
npx aic config set showAllModels true

# Get a specific config value
npx aic config get preferredModel
```

**Available Models:**

- OpenAI: GPT-5, GPT-5 mini, GPT-5 nano, GPT-4o, GPT-4 Turbo, o1-preview, o1-mini
- Anthropic: Claude Sonnet 4.5, Claude Opus 4.1, Claude Sonnet 4, Claude Opus 4, Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- Google: Gemini 1.5 Pro, Gemini 1.5 Flash

**Configuration is stored per-project** in `.ai/config.json`, so you can use different models for different projects.

## Full Documentation

### Core Documentation

- **[COMMANDS.md](COMMANDS.md)** - Complete command reference with examples
- **[CONFIGURATION.md](CONFIGURATION.md)** - Detailed configuration guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates

### After Running `init`

These files are created in your project:

- **`.ai/README.md`** - Overview of the knowledge base system
- **`.ai/SETUP_GUIDE.md`** - Comprehensive setup and usage guide
- **`.ai/TOKEN_MANAGEMENT.md`** - Token usage and optimization tips
- **`NEW_CHAT_PROMPT.md`** - Quick reference for the one-liner prompt

## Links

- [GitHub](https://github.com/Vaeshkar/create-ai-chat-context)
- [npm](https://www.npmjs.com/package/create-ai-chat-context)
- [Issues](https://github.com/Vaeshkar/create-ai-chat-context/issues)
- [Full Documentation](https://github.com/Vaeshkar/create-ai-chat-context#readme)

## License

MIT

---

**Made with ❤️ for developers who use AI assistants daily**

Questions or issues? [Open an issue on GitHub](https://github.com/Vaeshkar/create-ai-chat-context/issues)
