# Configuration Guide

Complete guide to configuring `create-ai-chat-context` for your workflow.

---

## Table of Contents

- [Overview](#overview)
- [Configuration File](#configuration-file)
- [Commands](#commands)
  - [List Configuration](#list-configuration)
  - [Get a Value](#get-a-value)
  - [Set a Value](#set-a-value)
- [Configuration Options](#configuration-options)
  - [preferredModel](#preferredmodel)
  - [showAllModels](#showallmodels)
- [Available AI Models](#available-ai-models)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## Overview

The configuration system allows you to customize how `create-ai-chat-context` works for your specific needs. Configuration is **per-project**, stored in `.ai/config.json`, so you can use different settings for different projects.

**Key Features:**
- Set your preferred AI model (gets highlighted with ⭐ in token reports)
- Control how many models are shown in token reports
- Per-project configuration (not global)
- Simple command-line interface

---

## Configuration File

Configuration is stored in `.ai/config.json` in your project directory.

**Location:** `<your-project>/.ai/config.json`

**Example:**
```json
{
  "preferredModel": "Claude Sonnet 4.5",
  "showAllModels": false
}
```

**Note:** You don't need to manually edit this file. Use the `config` command instead.

---

## Commands

### List Configuration

Show all current configuration settings.

**Syntax:**
```bash
npx aic config
# or
npx aic config list
```

**Output:**
```
⚙️  Configuration

Preferred Model: Claude Sonnet 4.5
Show All Models: No

💡 Tip: Use 'npx aic config set <key> <value>' to change settings
```

**When to use:**
- Check what your current settings are
- Verify a setting was changed correctly
- See all available configuration options

---

### Get a Value

Get a specific configuration value.

**Syntax:**
```bash
npx aic config get <key>
```

**Examples:**
```bash
# Get your preferred model
npx aic config get preferredModel
# Output: Claude Sonnet 4.5

# Get showAllModels setting
npx aic config get showAllModels
# Output: false
```

**When to use:**
- Check a specific setting in scripts
- Verify a single value without seeing all config

---

### Set a Value

Set a specific configuration value.

**Syntax:**
```bash
npx aic config set <key> <value>
```

**Examples:**
```bash
# Set your preferred model
npx aic config set preferredModel "Claude Sonnet 4.5"

# Always show all models
npx aic config set showAllModels true

# Show only top 4 models (default)
npx aic config set showAllModels false
```

**Output:**
```
✅ Preferred model set to: Claude Sonnet 4.5

💡 Run 'npx aic tokens' to see how your context fits in this model
```

**When to use:**
- Change your preferred AI model
- Toggle between showing 4 or 16 models
- Set up a new project

---

## Configuration Options

### preferredModel

**Type:** String  
**Default:** `null` (not set)  
**Description:** Your preferred AI model. Gets highlighted with ⭐ in token reports.

**Valid Values:**
- Any model name from the [Available AI Models](#available-ai-models) list
- Must match exactly (case-sensitive)

**Examples:**
```bash
npx aic config set preferredModel "Claude Sonnet 4.5"
npx aic config set preferredModel "GPT-5"
npx aic config set preferredModel "Gemini 1.5 Pro"
```

**Effect:**
- When you run `npx aic tokens`, your preferred model is shown with a ⭐ star
- If not showing all models, your preferred model is always included in the top 4

**Before setting preferred model:**
```
Context Window Usage:

   GPT-5                  3.79%  █
   GPT-4o                11.85%  █████
   Claude Sonnet 4.5      7.59%  ███
   Gemini 1.5 Pro         0.76%  
```

**After setting preferred model to "Claude Sonnet 4.5":**
```
Context Window Usage:

⭐ Claude Sonnet 4.5      7.59%  ███
   GPT-5                  3.79%  █
   GPT-4o                11.85%  █████
   Gemini 1.5 Pro         0.76%  
```

---

### showAllModels

**Type:** Boolean  
**Default:** `false`  
**Description:** Whether to always show all 16 AI models in token reports.

**Valid Values:**
- `true` - Always show all 16 models
- `false` - Show only top 4 models (default)

**Examples:**
```bash
# Always show all 16 models
npx aic config set showAllModels true

# Show only top 4 models (default)
npx aic config set showAllModels false
```

**Effect:**
- `false` (default): Shows 4 models (your preferred + top 3 popular)
- `true`: Shows all 16 models every time
- You can override with `npx aic tokens --all` flag

**When to use `true`:**
- You regularly work with multiple AI models
- You want to see all options every time
- You're comparing context windows across many models

**When to use `false` (default):**
- You primarily use 1-2 AI models
- You want cleaner, less overwhelming output
- You can still use `--all` flag when needed

---

## Available AI Models

### OpenAI Models

| Model Name | Context Window |
|------------|----------------|
| GPT-5 | 400,000 tokens |
| GPT-5 mini | 400,000 tokens |
| GPT-5 nano | 400,000 tokens |
| GPT-4o | 128,000 tokens |
| GPT-4 Turbo | 128,000 tokens |
| o1-preview | 128,000 tokens |
| o1-mini | 128,000 tokens |

### Anthropic Claude Models

| Model Name | Context Window |
|------------|----------------|
| Claude Sonnet 4.5 | 200,000 tokens |
| Claude Opus 4.1 | 200,000 tokens |
| Claude Sonnet 4 | 200,000 tokens |
| Claude Opus 4 | 200,000 tokens |
| Claude 3.5 Sonnet | 200,000 tokens |
| Claude 3.5 Haiku | 200,000 tokens |
| Claude 3 Opus | 200,000 tokens |

### Google Gemini Models

| Model Name | Context Window |
|------------|----------------|
| Gemini 1.5 Pro | 2,000,000 tokens |
| Gemini 1.5 Flash | 1,000,000 tokens |

**Note:** Model names are case-sensitive. Use exact names as shown above.

---

## Examples

### Example 1: First-Time Setup

```bash
# Initialize your project
npx aic init

# Set your preferred model
npx aic config set preferredModel "Claude Sonnet 4.5"

# Check token usage (shows your model with ⭐)
npx aic tokens
```

### Example 2: Switching Models

```bash
# You were using Claude, now switching to GPT-5
npx aic config set preferredModel "GPT-5"

# Verify the change
npx aic config get preferredModel
# Output: GPT-5

# Check how your context fits in GPT-5
npx aic tokens
```

### Example 3: Comparing All Models

```bash
# See all 16 models once
npx aic tokens --all

# Or always show all models
npx aic config set showAllModels true

# Now 'npx aic tokens' always shows all 16
npx aic tokens
```

### Example 4: Different Projects, Different Models

```bash
# In your Python project
cd ~/projects/python-api
npx aic config set preferredModel "Claude Sonnet 4.5"

# In your Next.js project
cd ~/projects/nextjs-app
npx aic config set preferredModel "GPT-5"

# Each project remembers its own preferred model!
```

---

## Troubleshooting

### "No .ai/ directory found"

**Problem:**
```
⚠️  No .ai/ directory found. Run 'npx aic init' first.
```

**Solution:**
```bash
# Initialize the knowledge base first
npx aic init

# Then configure
npx aic config set preferredModel "Claude Sonnet 4.5"
```

---

### Model name not recognized

**Problem:**
```
⚠️  Unknown config key: myModel
```

**Solution:**
- Use exact model names from the [Available AI Models](#available-ai-models) list
- Model names are case-sensitive
- Use quotes around model names with spaces

**Wrong:**
```bash
npx aic config set preferredModel claude sonnet 4.5  # ❌ No quotes
npx aic config set preferredModel "claude sonnet"    # ❌ Wrong name
```

**Correct:**
```bash
npx aic config set preferredModel "Claude Sonnet 4.5"  # ✅
```

---

### Preferred model not showing with star

**Problem:** You set a preferred model but don't see the ⭐ star in token reports.

**Solution:**
1. Verify the model name is correct:
   ```bash
   npx aic config get preferredModel
   ```

2. Check if the name matches exactly (case-sensitive):
   ```bash
   # Wrong: "claude sonnet 4.5"
   # Correct: "Claude Sonnet 4.5"
   ```

3. Re-set with correct name:
   ```bash
   npx aic config set preferredModel "Claude Sonnet 4.5"
   ```

---

### Config file corrupted

**Problem:**
```
⚠️  Config file corrupted, using defaults
```

**Solution:**
The tool automatically falls back to defaults. Just re-set your preferences:
```bash
npx aic config set preferredModel "Claude Sonnet 4.5"
```

Or manually delete and recreate:
```bash
rm .ai/config.json
npx aic config set preferredModel "Claude Sonnet 4.5"
```

---

## See Also

- [README.md](README.md) - Main documentation
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [.ai/TOKEN_MANAGEMENT.md](.ai/TOKEN_MANAGEMENT.md) - Token optimization guide (after running `init`)

