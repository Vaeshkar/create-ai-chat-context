# Command Reference

Complete reference for all `create-ai-chat-context` commands.

---

## Table of Contents

- [Command Reference](#command-reference)
  - [Table of Contents](#table-of-contents)
  - [Quick Reference](#quick-reference)
  - [Command Details](#command-details)
    - [init](#init)
    - [migrate](#migrate)
    - [config](#config)
    - [tokens](#tokens)
    - [stats](#stats)
    - [search](#search)
    - [validate](#validate)
    - [check](#check)
    - [export](#export)
    - [cursor](#cursor)
    - [copilot](#copilot)
    - [claude-project](#claude-project)
    - [context](#context)
    - [convert](#convert)
    - [install-hooks](#install-hooks)
    - [checkpoint](#checkpoint)
    - [memory-decay](#memory-decay)
    - [finish](#finish)
    - [monitor](#monitor)
  - [Common Workflows](#common-workflows)
    - [Daily Development Workflow](#daily-development-workflow)
    - [Weekly Maintenance](#weekly-maintenance)
    - [New Project Setup](#new-project-setup)
    - [Token Management Workflow](#token-management-workflow)
  - [Tips \& Best Practices](#tips--best-practices)
    - [Command Aliases](#command-aliases)
    - [Regular Maintenance](#regular-maintenance)
    - [Configuration](#configuration)
    - [Search Tips](#search-tips)
  - [See Also](#see-also)

---

## Quick Reference

```bash
# Setup & Initialization
npx aic init                              # Initialize knowledge base
npx aic init --template nextjs            # Initialize with specific template
npx aic init --force                      # Overwrite existing files

# Daily Usage
npx aic migrate                           # Upgrade existing projects (add missing .ai/ files)
npx aic migrate --to-aicf                 # Convert .ai/ to .aicf/ format (AICF 3.0)
npx aic stats                             # View statistics
npx aic search "query"                    # Search knowledge base
npx aic validate                          # Check quality

# Configuration
npx aic config                            # List configuration
npx aic config set preferredModel "GPT-5" # Set preferred model
npx aic config get preferredModel         # Get specific value

# Token Management (v1.0.3+ AUTOMATIC)
npx aic tokens                            # Check token usage (top 4 models)
npx aic tokens --all                      # Check token usage (all 16 models)
npx aic monitor                           # Monitor token usage with recommendations
npx aic memory-decay                      # Apply intelligent memory decay (automatic)

# AI Integration
npx aic cursor                            # Generate Cursor AI rules
npx aic copilot                           # Generate Copilot instructions
npx aic claude-project                    # Generate Claude Projects export

# Session Management (v1.0.3+ NEW!)
npx aic finish                            # Finish session & prepare handoff
npx aic finish --aicf                     # Finish session & migrate to AICF 3.0
npx aic checkpoint --demo                 # Test checkpoint system
npx aic monitor                           # Check token usage & recommendations

# Maintenance
npx aic export --format md                # Export knowledge base
npx aic install-hooks                     # Install Git hooks
npx aic check                             # Quick health check
```

---

## Command Details

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

# JavaScript/TypeScript templates
npx aic init --template nextjs
npx aic init --template react
npx aic init --template vue
npx aic init --template angular
npx aic init --template node

# Python templates
npx aic init --template python
npx aic init --template django
npx aic init --template fastapi
npx aic init --template flask

# Systems programming
npx aic init --template rust
npx aic init --template go
npx aic init --template cpp

# Enterprise/JVM
npx aic init --template java
npx aic init --template spring
npx aic init --template kotlin

# .NET ecosystem
npx aic init --template csharp
npx aic init --template dotnet

# Web technologies
npx aic init --template php
npx aic init --template laravel
npx aic init --template ruby
npx aic init --template rails

# Specialized development
npx aic init --template mobile
npx aic init --template fullstack
npx aic init --template api
npx aic init --template database
npx aic init --template devops
npx aic init --template terraform
npx aic init --template ai_ml
npx aic init --template blockchain
npx aic init --template gamedev

# Skip Git integration
npx aic init --template nextjs --no-git
```

**What it creates:**

- `.ai/` directory with knowledge base files
- `.ai-instructions` file (entry point for AI)
- `NEW_CHAT_PROMPT.md` (quick reference)

**Files created in `.ai/`:**

- `README.md` - Overview of the knowledge base system
- `conversation-log.md` - Chat history and key decisions
- `technical-decisions.md` - Why you chose X over Y
- `next-steps.md` - Current priorities and tasks
- `project-overview.md` - Project context for AI assistants
- `design-system.md` - Design patterns and conventions
- `code-style.md` - Coding standards and guidelines

**When to use:**

- Starting a new project
- Adding AI context to existing project
- Resetting knowledge base (with `--force`)

---

### migrate

Upgrade existing projects to the latest AI memory system.

**Syntax:**

```bash
npx aic migrate [options]
```

**Options:**

- `--force` - Skip confirmation prompt
- `--to-aicf` - Convert .ai/ directory to .aicf/ format (AICF 3.0)

**Two Migration Types:**

**1. Standard Migration (Default):**
- Checks which `.ai/` files are missing from your project
- Shows what will be added before making changes
- Adds missing template files without modifying existing content
- Non-destructive - never overwrites existing files

**2. AICF 3.0 Migration (--to-aicf):**
- Creates `.aicf/` directory with AI-optimized files
- Converts `conversation-log.md` → `conversations.aicf` (fast AI access)
- Converts `technical-decisions.md` → `decisions.aicf` (quick decision context)
- Converts `known-issues.md` → `issues.aicf` (problem awareness)
- Converts `next-steps.md` → `tasks.aicf` (current tasks)
- Creates `index.aicf` for fast lookup
- Generates `.meta` with project metadata
- **Keeps human files in `.ai/`:** `design-system.md`, `code-style.md`, `README.md`, `project-overview.md`

**When to use:**

**Standard Migration:**
- Upgrading from older versions to v1.0.0
- Adding missing files to existing projects
- Ensuring your project has all 7 essential files

**AICF 3.0 Migration:**
- First time using AICF 3.0 hybrid system with Logic Agents
- Want 88% token reduction for AI-critical files
- Need enhanced AI continuity with context references and confidence scoring
- Enhanced token lengths for complex topics and detailed outcomes
- Hitting context window limits
- Prefer hybrid: AI gets fast access, humans get readable docs

**Examples:**

```bash
# Standard migration - add missing .ai/ files
npx aic migrate

# AICF 3.0 migration - convert to .aicf/ format with enhanced AI continuity
npx aic migrate --to-aicf

# Force migration without confirmation
npx aic migrate --force
npx aic migrate --to-aicf --force
```

**Standard Migration Output:**

```bash
$ npx aic migrate

🔄 Migrating AI Memory System

✔ Found 4/7 .ai/ files

📝 Will add to .ai/:
   + design-system.md
   + code-style.md
   + project-overview.md

✅ Migration complete!
```

**AICF 3.0 Migration Output:**

```bash
$ npx aic migrate --to-aicf

🚀 Migrating to AICF 3.0

Converting AI-critical files...
  - Conversations: 9
  - Decisions: 6
  - Tasks: 49
  - Issues: 5
✔ Migration complete!

📊 Results:
   Conversations: 9
   Decisions: 6
   Tasks: 49
   Issues: 5
   
📁 File Structure:
   .aicf/ - AI-optimized files (85% token reduction)
   .ai/ - Human-readable files (design, code style, etc.)
```

**Manual workflow:**

At the end of each AI session, ask the AI to update the `.ai/` files:

```
"Can you update the .ai files with what we accomplished in this session?"
```

The AI will update:

- `conversation-log.md` - Add chat summary
- `technical-decisions.md` - Document decisions made
- `next-steps.md` - Update priorities and tasks

---

### config

Manage configuration settings.

**Syntax:**

```bash
npx aic config [action] [key] [value]
```

**Actions:**

- `list` (default) - Show all configuration
- `get <key>` - Get specific value
- `set <key> <value>` - Set specific value

**Available keys:**

- `preferredModel` - Your preferred AI model
- `showAllModels` - Show all models (true/false)
- `useAiNativeFormat` - Use AI-native format for conversation logs (true/false)

**Examples:**

```bash
# List all configuration
npx aic config
npx aic config list

# Get specific value
npx aic config get preferredModel

# Set preferred model
npx aic config set preferredModel "Claude Sonnet 4.5"
npx aic config set preferredModel "GPT-5"

# Always show all models
npx aic config set showAllModels true

# Enable AI-native format (85% token reduction!)
npx aic config set useAiNativeFormat true

# Disable AI-native format (back to YAML)
npx aic config set useAiNativeFormat false
```

**AI-Native Format (AICF):**

The AI-native format is an ultra-compact format designed for maximum token efficiency:

- **85% fewer tokens** vs YAML (12 tokens vs 80 tokens per entry)
- **92% fewer tokens** vs prose (150 tokens vs 12 tokens per entry)
- **6x more history** in context windows
- **Instant parsing** - Simple string split, no NLP needed

**Format:** `C#|YYYYMMDD|T|TOPIC|WHAT|WHY|O|FILES`

**Example:**

```
7|20251001|R|v0.10.0 auto chat-finish|Rewrote chat-finish auto operation|Users no questions after 4hr sessions|S|src/chat-finish.js
```

**When to use:**

- Large conversation history (50+ chats)
- Hitting context window limits
- Maximum token efficiency needed
- Don't need to manually read logs

**Backward compatible:** Supports reading all 3 formats (Markdown, YAML, AI-native) simultaneously.

**See also:** [CONFIGURATION.md](CONFIGURATION.md) for detailed guide

---

### tokens

Show detailed token usage breakdown.

**Syntax:**

```bash
npx aic tokens [options]
```

**Options:**

- `-a, --all` - Show all 16 AI models (default: top 4)

**Examples:**

```bash
# Show top 4 models (default)
npx aic tokens

# Show all 16 models
npx aic tokens --all
```

**Output:**

```
📊 Token Usage Report

Entry Point:
  .ai-instructions                       540 words     719 tokens  (4.7%)

Core Knowledge Base:
  .ai/README.md                          492 words     655 tokens  (4.3%)
  .ai/architecture.md                   1085 words    1444 tokens  (9.5%)
  ...

Total:
  All files                            11405 words   15174 tokens

Context Window Usage:

⭐ Claude Sonnet 4.5      7.59%  ███
   GPT-5                  3.79%  █
   GPT-4o                11.85%  █████
   Gemini 1.5 Pro         0.76%

💡 Showing 4 models. Run 'npx aic tokens --all' to see all 16 models
```

**When to use:**

- Check if context fits in AI models
- Decide when to archive old conversations
- Compare token usage across models

---

### stats

Show knowledge base statistics and insights.

**Syntax:**

```bash
npx aic stats
```

**Output:**

```
📊 Knowledge Base Statistics

📝 Content:

   Total files:              7
   Total lines:              3,013
   Total words:              10,499
   Estimated tokens:         ~13,964
   Conversation entries:     24

📈 Activity:

   Last updated:             25 minutes ago
   Most active file:         conversation-log.md
   Most active file size:    3,045 words

💡 Insights:

   💬 24 conversation entries - healthy amount
   ✅ Token usage is healthy - fits comfortably in most AI contexts
```

**When to use:**

- Get overview of knowledge base
- Check conversation entry count
- See which files are most active

---

### search

Search across all knowledge base files.

**Syntax:**

```bash
npx aic search <query> [options]
```

**Options:**

- `-c, --case-sensitive` - Case-sensitive search

**Examples:**

```bash
# Basic search
npx aic search "authentication"

# Case-sensitive search
npx aic search "JWT" --case-sensitive

# Search for phrases
npx aic search "user login flow"
```

**Output:**

```
🔍 Search Results for "authentication"

📄 .ai/architecture.md (2 matches)
  Line 45: ## Authentication System
  Line 67: We use JWT for authentication with bcrypt...

📄 .ai/conversation-log.md (1 match)
  Line 123: ## Chat #5 - Implement user authentication

Found 3 matches in 2 files
```

**When to use:**

- Find where something was discussed
- Locate specific decisions or issues
- Quick lookup without reading all files

---

### validate

Validate knowledge base quality and completeness.

**Syntax:**

```bash
npx aic validate
```

**Checks:**

- All required files exist
- Files are not empty
- Conversation log format is correct
- Token usage is reasonable
- Files have been updated recently

**Output:**

```
✅ Validation passed

Files:
  ✅ .ai-instructions exists
  ✅ .ai/README.md exists
  ✅ .ai/architecture.md exists
  ...

Quality:
  ✅ All files have content
  ✅ Conversation log format is valid
  ✅ Token usage is healthy (15,174 tokens)

Recommendations:
  💡 Consider updating .ai/next-steps.md (last updated 30 days ago)
```

**When to use:**

- Before starting a new AI chat
- After major updates
- Periodic quality checks

---

### check

Quick health check of knowledge base.

**Syntax:**

```bash
npx aic check
```

**Output:**

```
✅ Knowledge base is healthy

Files: 7/7 present
Token usage: 15,174 tokens (healthy)
Last updated: 2 hours ago
```

**When to use:**

- Quick status check
- Verify setup after init
- CI/CD health checks

---


### export

Export knowledge base in various formats.

**Syntax:**

```bash
npx aic export [options]
```

**Options:**

- `-f, --format <format>` - Export format (markdown, json, html) (default: markdown)
- `-o, --output <file>` - Output file name
- `--force` - Overwrite existing file

**Examples:**

```bash
# Export as markdown
npx aic export

# Export as JSON
npx aic export --format json

# Export as HTML
npx aic export --format html

# Specify output file
npx aic export --output my-knowledge-base.md

# Overwrite existing file
npx aic export --force
```

**When to use:**

- Share knowledge base with team
- Backup before major changes
- Generate documentation

---

### cursor

Generate `.cursorrules` file for Cursor AI integration.

**Syntax:**

```bash
npx aic cursor [options]
```

**Options:**

- `-f, --force` - Overwrite existing `.cursorrules` file

**Examples:**

```bash
# Generate .cursorrules
npx aic cursor

# Overwrite existing file
npx aic cursor --force
```

**What it creates:**

- `.cursorrules` file in project root
- Tells Cursor AI to read `.ai/` knowledge base

**Output:**

```
✅ Cursor integration configured!

📝 What this does:
  • Cursor will automatically read your .ai/ knowledge base
  • AI gets full context in every chat
  • No need to manually paste context

🚀 Next steps:
  1. Restart Cursor (if running)
  2. Start a new chat
  3. Cursor will automatically have your project context!
```

**When to use:**

- Using Cursor AI editor
- Want automatic context loading
- First-time Cursor setup

---

### copilot

Generate GitHub Copilot instructions for integration.

**Syntax:**

```bash
npx aic copilot [options]
```

**Options:**

- `-f, --force` - Overwrite existing `copilot-instructions.md` file

**Examples:**

```bash
# Generate Copilot instructions
npx aic copilot

# Overwrite existing file
npx aic copilot --force
```

**What it creates:**

- `.github/copilot-instructions.md` file
- Tells GitHub Copilot to read `.ai/` knowledge base

**Output:**

```
✅ GitHub Copilot integration configured!

📝 What this does:
  • GitHub Copilot will automatically read your .ai/ knowledge base
  • AI gets full context for better suggestions
  • Works in VS Code, GitHub.com, and CLI

🚀 Next steps:
  1. Commit the .github/copilot-instructions.md file
  2. Push to GitHub
  3. GitHub Copilot will automatically use your context!
```

**When to use:**

- Using GitHub Copilot
- Want automatic context loading
- First-time Copilot setup

---

### claude-project

Generate Claude Projects export.

**Syntax:**

```bash
npx aic claude-project [options]
```

**Options:**

- `-f, --force` - Overwrite existing `CLAUDE_PROJECT.md` file

**Examples:**

```bash
# Generate Claude Projects export
npx aic claude-project

# Overwrite existing file
npx aic claude-project --force
```

**What it creates:**

- `CLAUDE_PROJECT.md` file in project root
- Formatted for Claude Projects feature

**Output:**

```
✅ Claude Projects export created!

📝 What this does:
  • Creates CLAUDE_PROJECT.md with your knowledge base
  • Formatted for Claude's Projects feature
  • Single file with all context

🚀 Next steps:
  1. Go to claude.ai
  2. Create a new Project
  3. Upload CLAUDE_PROJECT.md as project knowledge
  4. Claude will have full context in that project!
```

**When to use:**

- Using Claude AI (claude.ai)
- Want to use Claude Projects feature
- Need single-file export for Claude

---

### context

Display AI context for starting new chat sessions.

**Syntax:**

```bash
npx aic context [options]
```

**Options:**

- `--ai` - AI-optimized format (paste into new chats)
- `--full` - Show complete details

**Examples:**

```bash
# Human-readable summary
npx aic context

# AI-optimized (for new chats)
npx aic context --ai

# Complete details
npx aic context --full
```

**Example Output (--ai):**

```
# AI Context - create-ai-chat-context v0.14.0

## Project Overview
Preserve AI chat context and history across sessions

## Current State
Status: active_development
Phase: migrated_to_aicf
Last Chat: #9

## Statistics
- Conversations: 9
- Decisions: 6
- Tasks: 49
- Issues: 5

## Active Tasks
- [TODO] Test v0.10.0 and publish to npm (Priority: H)
- [TODO] Gather user feedback (Priority: H)
...

## Recent Decisions
- Per-Project Configuration Storage: Store config in .ai/config.json
- Simplified Token Report: Show 4 models by default
...

---
Full context available in .aicf/ directory
```

**Use Case:**

When your current chat fills up:

1. Run `npx aic context --ai`
2. Copy the output
3. Start a new AI chat
4. Paste the output
5. Say: "Continue from here"

**The new AI instantly has full context!** 🎉

**When to use:**

- Chat session is filling up (approaching token limit)
- Starting a new AI chat session
- Want to transfer context between AIs
- Need quick project overview

**See also:** [AICF Guide](./docs/aicf/AICF-GUIDE.md) for complete documentation

---

### convert

Convert conversation log between formats (Markdown, YAML, AI-native).

**Syntax:**

```bash
npx aic convert [options]
```

**Options:**

- `--to-ai-native` - Convert to AI-native format (85% token reduction)
- `--to-yaml` - Convert to YAML format (human-readable)
- `--to-markdown` - Convert to Markdown format (traditional)
- `--no-backup` - Skip creating backup file (default: creates backup)

**Examples:**

```bash
# Convert to AI-native format (maximum token efficiency)
npx aic convert --to-ai-native

# Convert to YAML format (human-readable)
npx aic convert --to-yaml

# Convert to Markdown format (traditional)
npx aic convert --to-markdown

# Convert without creating backup
npx aic convert --to-ai-native --no-backup
```

**What it does:**

- Detects current format(s) in conversation log
- Converts all entries to target format
- Creates backup by default (`.ai/conversation-log.md.backup`)
- Shows token savings comparison
- Preserves file structure and headers

**Token Savings:**

| Source Format | Target Format | Token Reduction |
| ------------- | ------------- | --------------- |
| Markdown      | YAML          | ~47%            |
| Markdown      | AI-native     | ~92%            |
| YAML          | AI-native     | ~85%            |
| AI-native     | YAML          | -85% (increase) |
| AI-native     | Markdown      | -92% (increase) |

**Example Output:**

```
📝 Converting Conversation Log

✔ Detected current format: YAML
✔ Converting to: AI-native
✔ Found 10 entries
✔ Created backup: .ai/conversation-log.md.backup
✔ Converted 10 entries

✅ Conversion completed successfully!

Token Savings:
   Before: 800 tokens (YAML)
   After: 120 tokens (AI-native)
   Savings: 680 tokens (85% reduction!)

🚀 Impact: Can keep 6x more history in context!

💡 Next steps:
   1. Review the converted log
   2. Run "npx aic tokens" to see updated token usage
   3. If satisfied, delete backup: rm .ai/conversation-log.md.backup
```

**When to use:**

- **To AI-native:** When you have 50+ chat entries or hitting context limits
- **To YAML:** When you want human-readable format with good token efficiency
- **To Markdown:** When you want traditional format (not recommended for large logs)

**Safety:**

- Always creates backup by default
- Can revert by copying backup: `cp .ai/conversation-log.md.backup .ai/conversation-log.md`
- Non-destructive (original preserved in backup)

---

### install-hooks

Install Git hooks for knowledge base maintenance.

**Syntax:**

```bash
npx aic install-hooks [options]
```

**Options:**

- `-f, --force` - Overwrite existing hooks

**Examples:**

```bash
# Install Git hooks
npx aic install-hooks

# Overwrite existing hooks
npx aic install-hooks --force
```

**What it does:**

- Installs `post-commit` Git hook
- Reminds you to update knowledge base after commits
- Non-intrusive (just a reminder)

**Hook behavior:**

```bash
$ git commit -m "Add feature"

✅ Committed successfully!

💡 Reminder: Update your AI knowledge base
   Run: npx aic log

Recent changes:
  • src/auth.js
  • tests/auth.test.js
```

**When to use:**

- Want automatic reminders
- Frequently forget to update logs
- Team wants consistent documentation

---

**🚀 v1.0.3 BREAKTHROUGH!** Real-time memory preservation - Every AI response triggers automatic checkpointing with zero API costs.

> **Architecture Evolution:** v1.0.2 used 20k token batches, v1.0.3 processes every response in real-time. No more lost conversations!

Process conversation checkpoints using the revolutionary Logic Agent Orchestrator.

**Syntax:**

```bash
npx aic checkpoint [options]
```

**Options:**

- `-f, --file <path>` - Load checkpoint from JSON file
- `--demo` - Use demo data for testing (default if no file specified)
- `-v, --verbose` - Enable verbose logging
- `--show-memory` - Display memory statistics after processing

**Examples:**

```bash
# Test with demo data (instant)
npx aic checkpoint --demo

# Process real checkpoint file
npx aic checkpoint --file examples/checkpoint-example.json

# Full verbose processing with memory stats
npx aic checkpoint --file data.json --verbose --show-memory
```

**What it does:**

1. **Loads checkpoint data** (JSON format with conversation messages)
2. **Runs 6 specialized logic agents in parallel:**
   - ConversationParserAgent (extracts flow)
   - DecisionExtractorAgent (finds key decisions) 
   - InsightAnalyzerAgent (captures insights)
   - StateTrackerAgent (monitors progress)
   - FileWriterAgent (outputs dual formats)
   - MemoryDropOffAgent (applies decay strategy)
3. **Outputs to both formats:**
   - `.aicf/conversations.aicf` (AI-optimized, 85% token reduction)
   - `.ai/conversation-log.md` (human-readable)
   - `.ai/technical-decisions.md` (decisions)
   - `.ai/next-steps.md` (action items)

**Performance:**
- **Processing time:** ~10 milliseconds
- **API cost:** $0.00 (zero-cost logic agents)
- **Information preservation:** 100% (vs 60-75% with AI compression)
- **Token reduction:** 85% in AICF format

**Example Output:**

```
🤖 Checkpoint Orchestrator - AI Memory Processing

✅ Loaded checkpoint from examples/checkpoint-example.json
✅ Checkpoint data validated: 10 messages
Processing checkpoint...
📦 Processing checkpoint: project-discussion-2024-01-15-CP3
🤖 Running specialized agents in parallel...
  ✅ conversationParser: completed items
  ✅ decisionExtractor: completed items
  ✅ insightAnalyzer: completed items
  ✅ stateTracker: completed items
🔄 Combining agent results...
💾 Writing to .aicf and .ai files...
  ✅ Updated 4 files
✅ Checkpoint processed in 11ms

✅ Checkpoint Processing Complete!

📊 Processing Summary:
   • Session: project-discussion-2024-01-15-CP3
   • Processing Time: 11ms
   • Agents Executed: 4
   • Files Updated: 4
```

**Input Format:**

Checkpoint JSON must contain:

```json
{
  "sessionId": "project-discussion-2024-01-15",
  "checkpointNumber": 3,
  "startTime": "2024-01-15T14:30:00.000Z",
  "endTime": "2024-01-15T16:45:00.000Z",
  "tokenCount": 28500,
  "messages": [
    {
      "role": "user",
      "content": "Message content...",
      "timestamp": "2024-01-15T14:30:15.000Z"
    }
  ]
}
```

**When to use (v1.0.3+):**
- **Automatically after every AI response** (real-time memory preservation)
- **Zero manual intervention required** (runs in background)
- **Solves context loss from session resets** (Warp, ChatGPT, etc.)
- **Preserves long-term working relationships** with AI assistants

**Advantages over AI compression:**
- **4,500x faster** (10ms vs 30-45 seconds)
- **Zero ongoing costs** (vs $0.03-0.15 per checkpoint)
- **100% information preserved** (vs 60-75%)
- **Deterministic quality** (vs variable)
- **Works offline** (no API dependency)

---


**🧹 NEW!** Apply intelligent memory decay strategy to optimize storage.

**Syntax:**

```bash
npx aic memory-decay [options]
```

**Options:**

- `-v, --verbose` - Enable verbose logging

**Examples:**

```bash
# Apply memory decay
npx aic memory-decay

# Apply with detailed logging
npx aic memory-decay --verbose
```

**What it does:**

1. **Analyzes conversation age** in `.aicf/conversations.aicf`
2. **Applies decay strategy:**
   - **Recent** (< 7 days): Keep full detail
   - **Medium** (7-30 days): Extract key insights and decisions
   - **Old** (30-90 days): Compress to essential context only
   - **Ancient** (> 90 days): Archive with minimal metadata
3. **Triggers automatically** when files exceed 1MB
4. **Preserves critical information** while optimizing storage

**Example Output:**

```
🧹 Memory Decay - Intelligent Memory Management

Current memory state:
   • Conversations: 43
   • Size: 221.9 KB

Applying memory decay...
✅ Memory decay applied successfully!

📊 Decay Results:
   • Conversations processed: 15
   • Compression ratio: 73%
   • Decay distribution:
     - RECENT: 28 conversations
     - MEDIUM: 10 conversations  
     - OLD: 5 conversations
     - ARCHIVED: 0 conversations
```

**Benefits:**
- **Prevents token bloat** in long projects
- **Preserves critical information** while reducing storage
- **Automatic optimization** based on conversation age
- **Maintains context quality** for recent work

**When to use:**
- When `.aicf/conversations.aicf` exceeds 1MB
- Monthly maintenance routine
- Before major project milestones
- When context windows are getting full

---


**🏁 NEW!** Finish current AI session and prepare seamless handoff to new chat.

**Syntax:**

```bash
npx aic finish [options]
```

**Options:**

- `-t, --topic <topic>` - Session topic
- `-w, --what <what>` - What was accomplished
- `-y, --why <why>` - Why this work was done
- `-o, --outcome <outcome>` - Session outcome
- `--aicf` - Migrate to AICF 3.0 format
- `--no-commit` - Skip git commit

**Examples:**

```bash
# Smart finish (auto-detects changes)
npx aic finish

# Finish with AICF 3.0 migration
npx aic finish --aicf

# Custom session summary
npx aic finish -t "API Development" -w "Built user authentication" -o "Login system complete"

# Skip git commit
npx aic finish --no-commit
```

**What it does:**

1. **Analyzes git changes** - Extracts context from staged/unstaged files
2. **Updates conversation log** - Adds new chat entry with session summary
3. **Migrates to AICF 3.0** - (if --aicf flag used) for 85% token reduction
4. **Commits changes** - Automatic git commit with meaningful message
5. **Generates handoff text** - Copy-paste instructions for next AI chat

**Example Output:**

```
🏁 Finishing AI Session & Preparing Handoff

✅ Updated conversation-log.md with Chat #15
🚀 Migrating to AICF 3.0
✅ Changes committed to git

🎉 Session Finished Successfully!

📋 Session Summary:
   Topic: AICF 3.0 Development
   Outcome: Enhanced schema with AI continuity fields
   Files: src/aicf-migrate.js, COMMANDS.md +more

🔄 Next AI Session Setup:

📝 Copy this to your next AI chat:
────────────────────────────────────────────────────────────
I'm continuing from a previous AI session. Please read my AI memory system first:

**AICF 3.0 Enhanced Memory Available** - Use .aicf/ files for fast context loading

**Project Status:**
AICF 3.0 development with enhanced AI continuity features...

**Recent Activity:**
Chat #14: Enhanced schema implementation...

**Next Steps:**
Continue testing and documentation updates...

Please read the .ai-instructions file and .ai/ directory contents to get full context, then help me continue where we left off.
────────────────────────────────────────────────────────────

🚀 Quick Commands for New Session:
   npx aic context --ai    # Get AI-optimized context summary
   npx aic stats           # View knowledge base statistics
   npx aic check           # Quick health check
   # AICF 3.0 available - 85% more token efficient!

✨ Seamless AI continuity achieved! ✨
```

**When to use:**

- When approaching 20k+ tokens in current chat
- Before switching to new AI chat session
- At end of productive development session
- When context window is getting full
- Before major commits or milestones

---


**📊 NEW!** Monitor token usage and get session management recommendations.

**Syntax:**

```bash
npx aic monitor [options]
```

**Options:**

- `--check-finish` - Check if session should be finished

**Examples:**

```bash
# Full token usage report
npx aic monitor

# Quick finish check
npx aic monitor --check-finish
```

**Example Output:**

```
📊 Token Usage Monitor

📈 Overall Statistics:
   Total Tokens: 45,230
   Context Usage: 22.6%
   AICF Savings: 12,450 tokens (73.2%)

💬 Conversation Analysis:
   Conversation Log: 18,450 tokens

📁 File Breakdown:
   .ai/conversation-log.md: 18,450 tokens
   .aicf/conversations.aicf: 6,200 tokens
   .ai/technical-decisions.md: 8,230 tokens
   .aicf/decisions.aicf: 2,100 tokens

🎯 Recommendation:
   MEDIUM: Session growing, monitor token usage

🚀 Suggested Actions:
   npx aic finish --aicf     # Finish session & migrate to AICF
   npx aic archive --keep 5  # Archive old conversations
   npx aic summary --keep 5  # Summarize old conversations
```

**When to use:**

- Check current token usage regularly
- Before major development sessions
- When conversation feels "heavy"
- To validate AICF 3.0 efficiency gains
- Monitor context window utilization

---

## Common Workflows

### Daily Development Workflow

```bash
# Morning: Check status
npx aic check

# During work: Search for context
npx aic search "authentication"

# After AI chat: Ask AI to update files
# "Can you update the .ai files with what we accomplished?"

# End of day: Check token usage
npx aic stats
```

### Weekly Maintenance (v1.0.3+ AUTOMATIC)

```bash
# Check quality
npx aic validate

# Check token usage & get recommendations
npx aic monitor

# Memory decay now automatic with every-response checkpointing!
# Manual decay only if needed:
npx aic memory-decay

# Export backup
npx aic export --format json
```

### New Project Setup

```bash
# Initialize
npx aic init

# Configure
npx aic config set preferredModel "Claude Sonnet 4.5"

# Set up AI integration
npx aic cursor          # If using Cursor
npx aic copilot         # If using GitHub Copilot
npx aic claude-project  # If using Claude Projects

# Install Git hooks
npx aic install-hooks

# Verify setup
npx aic check
```

### Token Management Workflow (v1.0.3+ REVOLUTIONIZED)

```bash
# v1.0.3+: Automatic every-response memory preservation!
# No more manual token management needed!

# Check current usage with intelligent recommendations
npx aic monitor

# Finish current session when recommended
npx aic finish --aicf

# Memory decay happens automatically with every AI response
# Manual decay only if needed:
npx aic memory-decay
```

> **🚀 v1.0.3 Breakthrough:** Token management is now fully automatic! Every AI response triggers intelligent memory preservation and decay. No more lost conversations!

### 🤖 Checkpoint Orchestrator Workflow (NEW!)

```bash
# Test the system first
npx aic checkpoint --demo

# Process real conversation checkpoints
npx aic checkpoint --file session-data.json --verbose

# Run comprehensive validation
npm run test:checkpoint

# Apply memory decay when needed
npx aic memory-decay --verbose

# Verify results
npx aic stats
```

**Long Session Workflow:**

```bash
# During 5+ hour coding session:
# Every 50 messages or when context is full:

# 1. Export conversation to JSON (from your AI tool)
# 2. Process with logic agents
npx aic checkpoint --file conversation-export.json

# 3. Start fresh AI session with:
# "Read .ai-instructions first, then continue where we left off"

# 4. AI reads the updated context and continues seamlessly
```

---

## Tips & Best Practices

### Command Aliases

Use `aic` instead of `create-ai-chat-context`:

```bash
npx aic init        # ✅ Short
npx create-ai-chat-context init  # ❌ Long
```

### Regular Maintenance (v1.0.3+ MINIMAL)

- ✅ **AI memory is now automatic** - No manual file updates needed!
- ✅ **Token management is automatic** - Memory decay happens with every response
- Run `npx aic validate` weekly (quality check)
- Run `npx aic monitor` monthly (usage overview)
- Use `npx aic finish` when switching AI sessions

### Configuration

- Set `preferredModel` for your primary AI
- Use `showAllModels: false` for cleaner output
- Use `--all` flag when comparing models

### Search Tips

- Use specific terms: `npx aic search "JWT authentication"`
- Use quotes for phrases: `npx aic search "user login flow"`
- Use `--case-sensitive` for acronyms: `npx aic search "API" -c`

---

## See Also

- [README.md](README.md) - Main documentation
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration guide
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [GitHub Issues](https://github.com/Vaeshkar/create-ai-chat-context/issues) - Report bugs
