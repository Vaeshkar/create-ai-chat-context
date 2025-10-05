# Command Reference

Complete reference for all `create-ai-chat-context` commands in the **stable version**.

---

## 🎯 Stable Version - 12 Focused Commands

This version provides **12 essential commands** that cover everything you need for AI context management. All complex experimental features are available in the [experimental version](https://github.com/Vaeshkar/create-ai-chat-context-experimental).

---

## Quick Reference

```bash
# Core Setup & Management (4 commands)
npx aic init                    # Initialize knowledge base
npx aic migrate                 # Add missing files to existing project
npx aic validate                # Check knowledge base quality  
npx aic check                   # Quick health check

# Daily Usage (4 commands)
npx aic search "query"          # Find information in knowledge base
npx aic tokens                  # Show token usage breakdown
npx aic stats                   # View knowledge base statistics
npx aic config                  # Manage configuration

# AI Integrations (4 commands)
npx aic cursor                  # Generate .cursorrules for Cursor IDE
npx aic warp                    # Generate Warp AI terminal instructions  
npx aic copilot                 # Generate GitHub Copilot instructions
npx aic claude-project          # Generate Claude Projects export
```

**💡 Tip:** Use `npx aic` instead of `npx create-ai-chat-context` for shorter commands!

---

## Core Commands

### init

Initialize the `.ai/` knowledge base system in your project.

**Syntax:**
```bash
npx aic init [options]
```

**Options:**
- `-f, --force` - Overwrite existing files
- `--no-git` - Skip Git integration  
- `-t, --template <name>` - Choose from 32 comprehensive templates

**Available Templates:**

**JavaScript/TypeScript:**
- `nextjs` - Next.js, React, TypeScript projects
- `react` - React, Create React App, Vite projects
- `vue` - Vue.js, Nuxt.js, Vite projects
- `angular` - Angular projects with TypeScript
- `node` - Node.js backend projects, Express, NestJS

**Python:**
- `python` - General Python projects
- `django` - Django web framework projects
- `fastapi` - FastAPI backend projects
- `flask` - Flask web framework projects

**Systems Programming:**
- `rust` - Rust systems programming projects
- `go` - Go backend and systems projects
- `cpp` - C++ systems and application projects

**Enterprise/JVM:**
- `java` - Java projects, Spring Boot, Maven/Gradle
- `spring` - Spring Boot, Spring Framework projects
- `kotlin` - Kotlin projects, Android, multiplatform

**.NET:**
- `csharp` - C# .NET projects
- `dotnet` - .NET Core, ASP.NET Core projects

**Web Technologies:**
- `php` - PHP projects, Laravel, Symfony
- `laravel` - Laravel PHP framework projects
- `ruby` - Ruby projects, Ruby on Rails
- `rails` - Ruby on Rails web framework projects

**Specialized:**
- `mobile` - React Native, Flutter, Swift, Kotlin
- `fullstack` - Full-stack projects with frontend + backend
- `api` - Generic backend API projects
- `database` - Database design, migrations, stored procedures
- `devops` - Docker, Kubernetes, CI/CD, Infrastructure
- `terraform` - Infrastructure as Code with Terraform
- `ai_ml` - Machine Learning, Deep Learning, Data Science
- `blockchain` - Smart contracts, DApps, cryptocurrency
- `gamedev` - Unity, Unreal, indie games, mobile games
- `default` - Generic/Universal template

**Examples:**
```bash
# Auto-detect project type
npx aic init

# Force overwrite existing files
npx aic init --force

# Use specific templates
npx aic init --template nextjs
npx aic init --template python
npx aic init --template rust
npx aic init --template java
```

**What gets created:**
- `.ai/` directory with 7 essential markdown files
- `.ai-instructions` file for AI assistants
- Project-specific content based on template

---

### migrate

Add missing `.ai/` files to an existing project or upgrade outdated knowledge base.

**Syntax:**
```bash
npx aic migrate [options]
```

**Options:**
- `--force` - Skip confirmation prompt

**Examples:**
```bash
# Add missing files to existing project
npx aic migrate

# Force migration without confirmation
npx aic migrate --force
```

**What it does:**
- Detects missing `.ai/` files
- Adds them using appropriate template
- Preserves existing content
- Updates outdated file structures

---

### validate

Check the quality and completeness of your knowledge base.

**Syntax:**
```bash
npx aic validate
```

**What it checks:**
- All required `.ai/` files exist
- Files have been customized for your project
- Content quality and completeness
- `.ai-instructions` file exists

**Example output:**
```bash
📁 File Check:
  ✅ README.md
  ✅ conversation-log.md
  ✅ technical-decisions.md
  ✅ .ai-instructions

✏️ Customization Check:
  ✅ technical-decisions.md
  ⚠️ conversation-log.md (needs more entries)

📊 Quality Score: 85% - Good
```

---

### check

Quick health check of your knowledge base.

**Syntax:**
```bash
npx aic check
```

**What it shows:**
- Token usage breakdown
- Number of conversation entries
- Last updated date
- Health status and recommendations

**Example output:**
```bash
📊 Knowledge Base Health Check

Token Usage:
  15,420 tokens
  7.7% of Claude 200K | 12.0% of GPT-4 Turbo 128K

Conversation Log:
  12 entries
  Last updated: Today

Status:
  ✅ Healthy - No action needed
```

---

## Daily Usage Commands

### search

Find information across all knowledge base files.

**Syntax:**
```bash
npx aic search <query> [options]
```

**Options:**
- `-c, --case-sensitive` - Case-sensitive search

**Examples:**
```bash
# Search for information
npx aic search "authentication"
npx aic search "database schema"
npx aic search "deployment process"

# Case-sensitive search
npx aic search "React" --case-sensitive
```

**What it searches:**
- All `.ai/` files
- File names and content
- Returns relevant excerpts with context

---

### tokens

Show detailed token usage breakdown of your knowledge base.

**Syntax:**
```bash
npx aic tokens [options]
```

**Options:**
- `-a, --all` - Show all AI models (default: show top 4)

**Examples:**
```bash
# Show token usage for top 4 AI models
npx aic tokens

# Show token usage for all supported models
npx aic tokens --all
```

**Supported Models:**
- GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- Gemini Pro, Gemini 1.5 Pro
- And more...

---

### stats

Show comprehensive knowledge base statistics and insights.

**Syntax:**
```bash
npx aic stats
```

**What it shows:**
- File breakdown and sizes
- Quality score assessment
- Token usage insights
- Conversation entry analysis
- Helpful maintenance commands

---

### config

Manage configuration settings.

**Syntax:**
```bash
# View all configuration
npx aic config

# View specific setting  
npx aic config get <key>

# Set configuration value
npx aic config set <key> <value>
```

**Examples:**
```bash
# View current configuration
npx aic config

# Set preferred AI model for token reports
npx aic config set preferredModel "Claude Sonnet 4.5"

# Get specific configuration value
npx aic config get preferredModel
```

**Configuration is stored** in `.ai/config.json` per project.

---

## AI Integration Commands

### cursor

Generate `.cursorrules` file for Cursor AI IDE integration.

**Syntax:**
```bash
npx aic cursor [options]
```

**Options:**
- `-f, --force` - Overwrite existing `.cursorrules` file

**What it does:**
- Creates `.cursorrules` file in project root
- Configures Cursor to automatically read your knowledge base
- Sets up workflow instructions for AI sessions

**Example:**
```bash
# Generate Cursor integration
npx aic cursor

# Force overwrite existing file
npx aic cursor --force
```

---

### warp

Generate Warp AI terminal integration instructions.

**Syntax:**
```bash
npx aic warp [options]
```

**Options:**
- `-f, --force` - Overwrite existing `WARP_AI_INSTRUCTIONS.md` file

**What it does:**
- Creates `WARP_AI_INSTRUCTIONS.md` with copy-paste prompt
- Provides workflow tips for Warp AI terminal usage
- Lists all knowledge base files for reference

**Example:**
```bash
# Generate Warp AI instructions
npx aic warp

# The file contains the perfect prompt to use in Warp AI
```

---

### copilot

Generate GitHub Copilot integration instructions.

**Syntax:**
```bash
npx aic copilot [options]
```

**Options:**
- `-f, --force` - Overwrite existing `copilot-instructions.md` file

**What it does:**
- Creates `copilot-instructions.md`
- Provides setup instructions for GitHub Copilot
- Configures Copilot to understand your project context

---

### claude-project

Generate Claude Projects export for easy import.

**Syntax:**
```bash
npx aic claude-project [options]
```

**Options:**
- `-f, --force` - Overwrite existing `CLAUDE_PROJECT.md` file

**What it does:**
- Creates `CLAUDE_PROJECT.md` export file
- Formats your knowledge base for Claude Projects
- Enables easy import into Claude Projects interface

---

## Common Workflows

### New Project Setup

```bash
# 1. Initialize knowledge base
npx aic init --template nextjs

# 2. Customize files for your project
vim .ai/project-overview.md
vim .ai/technical-decisions.md

# 3. Set up AI integrations
npx aic cursor          # For Cursor IDE
npx aic warp           # For Warp terminal

# 4. Commit to version control
git add .ai/ .ai-instructions .cursorrules
git commit -m "Add AI knowledge base"
```

### Daily Development

```bash
# Start AI session with: "Read .ai-instructions first"
# Have productive coding session
# Manually update conversation-log.md with key decisions

# Check knowledge base health
npx aic check

# Search for past decisions
npx aic search "authentication approach"
```

### Weekly Maintenance

```bash
# Check knowledge base quality
npx aic validate

# Review token usage  
npx aic tokens

# View comprehensive statistics
npx aic stats
```

---

## Tips & Best Practices

### Regular Maintenance

1. **Update conversation-log.md** after each significant AI session
2. **Run `npx aic check`** weekly to monitor token usage
3. **Use `npx aic validate`** to ensure quality
4. **Search existing knowledge** before asking AI repeated questions

### Configuration

- Set `preferredModel` to match your primary AI assistant
- Keep `.ai/config.json` in version control for team consistency

### Search Tips

- Use specific terms: `"authentication"` rather than `"auth"`
- Search for concepts: `"database schema"`, `"deployment process"`
- Use quotes for exact phrases

---

## Looking for More?

This stable version focuses on **reliability and simplicity**. 

For **advanced features** like automated conversation parsing, intelligent agents, and multi-LLM detection, check out the [experimental version](https://github.com/Vaeshkar/create-ai-chat-context-experimental).

---

## See Also

- [Main README](README.md) - Project overview and quick start
- [Configuration Guide](CONFIGURATION.md) - Detailed configuration options
- [Changelog](CHANGELOG.md) - Version history and updates  
- [Experimental Version](https://github.com/Vaeshkar/create-ai-chat-context-experimental) - Advanced features

---

**Questions?** [Open an issue on GitHub](https://github.com/Vaeshkar/create-ai-chat-context/issues)