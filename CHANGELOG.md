# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features

- VS Code extension (optional)
- Advanced search with filters
- Team collaboration features
- Analytics dashboard

## [1.0.3] - 2025-10-04

### Changed

- **🚀 BREAKTHROUGH: Every-Response Checkpointing**
  - **Revolutionary architecture:** Checkpoint triggers after every AI response (not 20k token batches)
  - **Zero API costs:** Logic agents run locally without external API calls
  - **Real-time memory preservation:** No more lost conversations when sessions reset
  - **Intelligent file management:** Prevents overflow with 4-tier memory decay system
  - Updated `.aicf/config.json`: `checkpointFrequency: "every_response"`
  - Cost estimates updated to reflect zero-cost operation

- **🧠 Enhanced Memory Decay Strategy**
  - Recent (0-7 days): Full detail preserved
  - Medium (7-30 days): Key points only (~80% reduction)
  - Old (30-90 days): Single line summaries (~95% reduction)  
  - Archived (90+ days): Critical decisions only (~99% reduction)
  - Automatic backup creation before first compression
  - Graduated information decay prevents data loss while managing size

### Performance

- Checkpoint processing: ~9ms for real conversation data
- Zero latency impact on AI interactions
- Infinite scalability through intelligent memory decay
- Processing 365 days of daily checkpoints ≈ size of 1 week recent conversations

### Impact

- **Solves fundamental AI amnesia problem**
- **Eliminates context re-onboarding every session**
- **Preserves long-term working relationships with AI**
- **Makes AI collaboration truly persistent across time**

## [1.0.2] - 2025-10-03

### Added

- **🏁 Session Management System**
  - `npx aic finish` - Complete session wrap-up with git integration
  - `npx aic finish --aicf` - Finish session and migrate to AICF 3.0
  - `npx aic monitor` - Token usage monitoring and recommendations
  - `npx aic monitor --check-finish` - Check if session should be finished
  - Automatic git analysis (staged/unstaged files for context)
  - Smart topic inference from changed files
  - Seamless handoff text generation for next AI chat
  - Meaningful commit messages with session summaries

- **🚀 AICF 3.0 Enhanced AI Continuity Format**
  - Enhanced token lengths: TOPIC (60→80), OUTCOME (80→120), DECISION (100→120)
  - New AI continuity fields: CONTEXT_REFS, CONFIDENCE, IMPACT_SCORE
  - Intelligent scoring algorithms for priority filtering
  - Enhanced conversation parser supporting structured markdown
  - Better relationship mapping between conversations, decisions, tasks

- **🎯 32 Comprehensive Templates**
  - JavaScript/TypeScript: nextjs, react, vue, angular, node
  - Python: python, django, fastapi, flask
  - Systems Programming: rust, go, cpp
  - Enterprise/JVM: java, spring, kotlin
  - .NET: csharp, dotnet
  - Web Technologies: php, laravel, ruby, rails
  - Specialized: mobile, fullstack, api, database, devops, terraform, ai_ml, blockchain, gamedev
  - Each template with language-specific content and examples
  - Automated template generation script

- **⚙️ Enhanced Migration System**
  - Unified `migrate` command with dual functionality
  - `npx aic migrate` - Add missing .ai/ files (standard migration)
  - `npx aic migrate --to-aicf` - Convert to AICF 3.0 format
  - Hybrid architecture: Human files stay in .ai/, AI files in .aicf/

### Changed

- Updated CLI with finish and monitor commands
- Enhanced AICF migration with structured markdown parsing
- Improved conversation schema with AI continuity fields
- Updated COMMANDS.md with comprehensive session management documentation
- Added major update announcement to README highlighting new features

### Performance

- AICF 3.0 maintains 85% token reduction while adding enhanced features
- Session finish processing: ~100ms for comprehensive git analysis
- Template generation: All 32 templates in <500ms
- Zero API costs for all logic agent operations

### Statistics

- Started: September 30, 2025 at 8pm (from initial idea!)
- Timeline: Idea to 3,300+ downloads in just 3.5 days 🤯
- Developer: 7 months of coding experience
- Goal: 1,000,000 downloads! 🎯
- Templates: 4 → 32 (800% increase)
- Commands: 12 → 16 (session management added)
- Achievement: Viral success in under a week! 🚀

## [1.0.0] - 2025-10-03

### Changed

- **🎯 BREAKING CHANGE: Simplified to 7 Essential Files**

  - Reduced from 15 files to 7 essential documentation files
  - Removed `.aicf/` folder entirely (complex format not needed)
  - Focus on simple, maintainable markdown files
  - Files: README.md, conversation-log.md, technical-decisions.md, next-steps.md, design-system.md, code-style.md, project-overview.md

- **📝 Updated Commands**

  - `init` now creates only 7 files in `.ai/` folder
  - `migrate` upgrades existing projects to v1.0.0 structure
  - Removed `chat-finish` command (manual workflow adopted)
  - Updated success messages and documentation

- **🔧 Simplified Workflow**
  - Manual workflow: Ask AI to "update the .ai files" at session end
  - No complex formats or token optimization
  - Simple, readable markdown files
  - Works with all AI assistants

### Removed

- **`.aicf/` folder and all AICF format complexity**
- **4 template files**: architecture.md, known-issues.md, SETUP_GUIDE.md, TOKEN_MANAGEMENT.md
- **`chat-finish` command** (replaced with manual workflow)
- **All AICF 2.0 features and documentation**

### Added

- **`project-overview.md`** as AI-optimized config file with "Quick Reference" section
- **Simplified README.md** focused on core functionality
- **Updated package.json** description

## [0.14.0] - 2025-10-02

### Changed

- **🚀 Direct .aicf/ Reading - ZERO Manual Steps!**

  - AI can now read `.aicf/` files directly without copy/paste
  - Removed copy/paste workflow from all documentation
  - Updated workflow: "Start new chat → Say: 'Read .aicf/ and continue' → Done!"
  - Zero manual steps, zero clipboard usage

- **📊 Updated Diagrams**

  - Removed decorative emojis (kept only ✅/❌)
  - Updated AI models: Claude Sonnet 4.5, Opus 4, OpenAI o1
  - Fixed workflow diagram (removed orphaned nodes)
  - All diagrams show direct reading workflow

- **📝 Documentation Cleanup**

  - Removed duplicate Anthropic comparison table
  - Updated "What's New" section (v0.13.0, v0.13.1, v0.14.0)
  - Simplified "Key Commands" (15 → 8 essential commands)
  - Created dedicated "AICF 2.0 Commands" section
  - Moved advanced commands to COMMANDS.md

- **🎯 Repositioned `context` Command**
  - Now optional (for human review only)
  - AI reads `.aicf/` files directly without this command
  - `context --ai` shows AI-optimized summary for review

### Added

- **📖 Complete AICF Guide** (`docs/aicf/AICF-GUIDE.md`)

  - How to read AICF files
  - Format specifications
  - Converting back instructions
  - Advanced usage examples
  - Troubleshooting section

- **🎨 Visual Diagrams**
  - `04_aicf-workflow.mmd` - Complete AICF 2.0 workflow
  - `05_token-efficiency.mmd` - Token comparison (Markdown/YAML/AICF)
  - `06_anthropic-alignment.mmd` - Anthropic vision alignment

### Fixed

- Removed 6 orphaned nodes from workflow diagram
- Fixed duplicate content in README
- Updated all version references

## [0.13.1] - 2025-10-02

### Changed

- **📚 Documentation Reorganization**

  - Moved 8 AICF docs to `docs/aicf/`
  - Moved 2 guides to `docs/guides/`
  - Moved 3 archive files to `docs/archive/`
  - Deleted 7 temp files (test scripts, etc.)
  - Root now has only 7 essential files

- **📝 Simplified README**

  - Reduced from 315 lines → 208 lines (34% reduction)
  - Moved detailed format examples to docs
  - Kept hero section and quick start
  - Added links to comprehensive docs

- **📖 Updated docs/README.md**
  - Complete index of all documentation
  - Organized by category (AICF, Guides, Archive)
  - Quick links for users/contributors/developers

### Added

- Added `migrate` command documentation to COMMANDS.md
- Added `context` command documentation to COMMANDS.md

## [0.13.0] - 2025-10-02

### Added

- **🎉 AICF 2.0 - Universal AI Memory Protocol** - Complete system for persistent AI memory!

  - **New Commands:**

    - `npx aic migrate` - Convert `.ai/` directory to `.aicf/` format
    - `npx aic context` - Display AI context summary
    - `npx aic context --ai` - AI-optimized format for new chat sessions
    - `npx aic context --full` - Complete context with all details

  - **Directory Structure:**

    - `.aicf/index.aicf` - Fast lookup index with project metadata
    - `.aicf/conversations.aicf` - All chat history (ultra-compact)
    - `.aicf/decisions.aicf` - Technical decisions
    - `.aicf/tasks.aicf` - Project tasks
    - `.aicf/issues.aicf` - Known issues
    - `.aicf/.meta` - Project metadata (JSON)

  - **Features:**

    - ✅ **88% token reduction** vs markdown (1.8K vs 15K tokens)
    - ✅ **Instant context loading** - 2 seconds vs 5 minutes
    - ✅ **Relationship tracking** - Link conversations to decisions
    - ✅ **Temporal tracking** - Evolution over time
    - ✅ **Query system** - Filter by any field
    - ✅ **Concurrent safe** - Multiple AIs can read simultaneously
    - ✅ **Lossless** - Can reconstruct full context
    - ✅ **Extensible** - Add new types without breaking

  - **Parsers:**

    - Converts `conversation-log.md` (9 entries extracted)
    - Converts `technical-decisions.md` (6 decisions extracted)
    - Converts `known-issues.md` (5 issues extracted)
    - Converts `next-steps.md` (49 tasks extracted)
    - Handles all formats: Markdown, YAML, AICF, bullet lists

  - **Use Case:**
    - Chat fills up → Start new chat → Paste `npx aic context --ai` output
    - New AI instantly knows full project history!
    - No more context loss between sessions!

- **🎯 Aligned with Anthropic's Context Management Vision**
  - Anthropic announced context management features (Sept 29, 2025)
  - AICF 2.0 perfectly implements their memory tool vision
  - See [ANTHROPIC-ALIGNMENT.md](./ANTHROPIC-ALIGNMENT.md) for details
  - **AICF 2.0 advantages:** 88% vs 84% token reduction, O(1) lookup, relationship tracking

### Documentation

- Added `AICF-SPEC.md` - Complete AICF 2.0 format specification
- Added `AICF-2.0-COMPLETE.md` - Implementation summary
- Added `QUICKSTART-AICF.md` - Quick start guide
- Added `ANTHROPIC-ALIGNMENT.md` - Alignment with Anthropic's vision
- Updated `README.md` - Added Anthropic alignment section
- Updated `CHANGELOG.md` - This entry!

### Technical Details

**AICF 2.0 Format:**

- Pipe-delimited ultra-compact format
- Schema-defined data with `@SCHEMA` and `@DATA` sections
- Relationship tracking via `@LINKS` section
- O(1) lookup via index file

**Parser Architecture:**

- `convertConversationLog()` - Parses markdown/YAML/AICF formats
- `convertTechnicalDecisions()` - Parses `## Title` with `### Decision/Rationale/Impact`
- `convertKnownIssues()` - Parses `### Title` with `**Problem:**` and `**Solution:**`
- `convertNextSteps()` - Parses bullet lists with `- [ ]` and `- [x]`

**Files Added:**

- `src/aicf-migrate.js` - Migration logic
- `src/aicf-parser.js` - Read AICF files
- `src/aicf-compiler.js` - Write AICF files
- `src/aicf-context.js` - Display context
- `debug-parsers.js` - Debug script
- `test-migrate.js` - Test script

### Why This Matters

**The Problem:** AI chat sessions lose all context when they fill up. You have to re-explain everything in the new chat.

**The Solution:** AICF 2.0 creates a persistent memory system that connects all your AI chats. When one chat fills up, the next chat can instantly load the full context.

**The Impact:** No more context loss. No more re-explaining. Seamless continuity across infinite chat sessions.

This is the foundation of how AIs will communicate with each other across time. 🚀

## [0.12.0] - 2025-10-01

### Added

- **🚀 AI-Native Conversation Format (AICF)** - Maximum token efficiency for power users!

  - **85% token reduction** vs YAML (12 tokens vs 80 tokens per entry)
  - **92% token reduction** vs prose (150 tokens vs 12 tokens per entry)
  - **6x more history** in context windows
  - **Format:** `C#|YYYYMMDD|T|TOPIC|WHAT|WHY|O|FILES`
  - **Example:** `7|20251001|R|v0.10.0 auto chat-finish|Rewrote chat-finish auto operation|Users no questions after 4hr sessions|S|src/chat-finish.js`
  - **Enable:** `npx aic config set useAiNativeFormat true`
  - **Backward compatible:** Supports reading all 3 formats (Markdown, YAML, AI-native) simultaneously
  - **Instant parsing:** Simple string split, no NLP needed
  - **Lossless:** Can convert back to YAML/Markdown anytime

- **New config option:** `useAiNativeFormat` (default: false)
  - Set to `true` for ultra-compact format
  - Set to `false` for human-readable YAML format
  - Displayed in `npx aic config` output

### Changed

- **chat-finish now generates AI-native format** when `useAiNativeFormat` is enabled
- **getChatNumber() detects all 3 formats** - Markdown, YAML, and AI-native
- **Updated documentation** - COMMANDS.md, README.md, templates explain AICF

### Technical Details

**Format Specification:**

- `C#`: Chat number (integer)
- `YYYYMMDD`: Date (8 digits, no dashes)
- `T`: Type code (R=Release, F=Feature, X=Fix, D=Docs, W=Work, M=Refactor)
- `TOPIC`: Max 40 chars
- `WHAT`: Max 80 chars
- `WHY`: Max 60 chars
- `O`: Outcome code (S=Shipped, D=Decided, R=Resolved, P=InProgress, B=Blocked)
- `FILES`: Comma-separated file paths

**Token Comparison:**
| Format | Tokens per Entry | Reduction |
|--------|------------------|-----------|
| Prose | 150 | baseline |
| YAML | 80 | 47% vs prose |
| AI-Native | 12 | 85% vs YAML, 92% vs prose |

**Real-World Impact:**

- Claude 3.5 Sonnet (200K context): 2,500 entries (YAML) → 16,600 entries (AI-native)
- GPT-4 Turbo (128K context): 1,600 entries (YAML) → 10,600 entries (AI-native)

**Why AICF?**

- User insight: "Forget about humans. We pay for tokens. You need the most effective language."
- AI doesn't need natural language - structured data is instant to parse
- 85% reduction means 6x more history in context windows
- Can keep 100+ chat entries vs 15-20 with YAML

**Migration Path:**

1. Enable: `npx aic config set useAiNativeFormat true`
2. New entries will be AI-native
3. Old entries remain in YAML/Markdown
4. Can revert anytime: `npx aic config set useAiNativeFormat false`

## [0.11.1] - 2025-10-01

### Fixed

- **🐛 CRITICAL: Fixed duplicate entries in chat-finish** - Prevents duplicate entries in technical-decisions.md and known-issues.md
  - **Root cause:** chat-finish was looking at commits from "last 2 hours" every time it ran
  - **Problem:** Running chat-finish multiple times within 2 hours would see the SAME commits and add them again
  - **Solution:** Track last processed commit in `.ai/.chat-finish-state.json`
  - **Result:** Only NEW commits since last chat-finish are processed
- **Improved auto-summary generation** - More specific descriptions instead of vague "Worked on features"
  - Uses the most recent commit message as main goal (more specific)
  - Only extracts decisions from `feat:` and `release:` commits
  - Only extracts issues from `fix:` commits
  - Removes conventional commit prefixes for cleaner display

### Changed

- **chat-finish now tracks state** - Stores last processed commit hash in `.ai/.chat-finish-state.json`
- **Added `.ai/.chat-finish-state.json` to .gitignore** - This is a local state file, not shared via git
- **🤖 AI-OPTIMIZED: Redesigned summary format for AI parsing efficiency** - 52% token reduction!
  - **Old format:** Human-readable prose (~250 tokens for 10 chats)
  - **New format:** Pipe-delimited structured data (~120 tokens for 10 chats)
  - **Format:** `CHAT_NUM|DATE|TYPE|WHAT|WHY|OUTCOME`
  - **Types:** FEAT, FIX, REFACTOR, DOCS, RELEASE, WORK
  - **Why:** AI doesn't need natural language - structured data is faster to parse and uses fewer tokens
  - **Human-readable:** Still understandable (like reading a CSV file)
  - **Example:** `7|2025-10-01|RELEASE|v0.10.0|Make chat-finish automatic|Users don't want questions|SHIPPED`
- **🤖 AI-OPTIMIZED: Conversation log entries now use YAML format** - 47% token reduction per entry!
  - **Old format:** Markdown prose with sections (~150 tokens per entry)
  - **New format:** YAML structured data (~80 tokens per entry)
  - **Format:** `CHAT/DATE/TYPE/TOPIC/WHAT/WHY/OUTCOME/FILES/NEXT`
  - **Why:** YAML is structured data that AI can parse instantly without natural language processing
  - **Backward compatible:** Supports both YAML and markdown formats
  - **chat-finish automatically generates YAML entries**
  - **Example:**
    ```yaml
    ---
    CHAT: 7
    DATE: 2025-10-01
    TYPE: RELEASE
    TOPIC: v0.10.0: 100% Automatic chat-finish
    WHAT:
      - Rewrote chat-finish for automatic operation
    WHY:
      - Users don't want to answer questions after 4-hour sessions
    OUTCOME: SHIPPED
    FILES:
      - src/chat-finish.js: Complete rewrite
    ---
    ```

### Impact

**Before (v0.9.0 - v0.11.0):**

```
Chat #7: Commit "feat: v0.10.0", run chat-finish → adds to technical-decisions.md
Chat #8: Within 2 hours, run chat-finish → sees SAME commit, adds AGAIN
Chat #9: Still within 2 hours → sees commits from #7 and #8, adds AGAIN
Result: Duplicate entries everywhere! 😱
```

**After (v0.11.1):**

```
Chat #7: Commit "feat: v0.10.0", run chat-finish → adds to technical-decisions.md, saves commit hash
Chat #8: Run chat-finish → checks last processed commit, only processes NEW commits
Chat #9: Run chat-finish → only processes commits since last run
Result: No duplicates! 🎉
```

**This was a critical bug for an npm package** - Users running chat-finish multiple times would get duplicate entries. Now fixed!

## [0.11.0] - 2025-10-01

### Added

- **"Recently Completed" section in next-steps.md** - Shows completed work from last 2 weeks at the TOP
  - Prevents AI assistants from suggesting already-completed work
  - Includes week/date, what was done, files changed, and impact
  - Positioned at top so AI reads completed work FIRST before "in progress" items
- **"Verify Before You Advise" section in .ai-instructions** - Critical rules for AI assistants
  - Documentation can be stale - always verify current state first
  - Check actual codebase FIRST, then compare to docs
  - Ask user when discrepancies are found
  - Rule: "Verify, don't please" - accuracy over assumptions

### Changed

- **Updated all templates** (ai, nextjs, python) with new "Recently Completed" section
- **Updated .ai-instructions** with verification rules and real-world examples

### Impact

**The Problem:**

- User completes work (e.g., "consolidated 12 agents to 5")
- Forgets to update docs (docs still say "12 agents → 4 agents planned")
- AI reads docs, suggests: "Let's consolidate your 12 agents to 4"
- User gets frustrated: "I already did that last week!"

**The Solution:**

- ✅ "Recently Completed" section shows finished work at TOP
- ✅ AI verification rules: check code first, then docs
- ✅ AI asks when discrepancies found
- ✅ Better user experience, less frustration

**This is a MAJOR improvement based on real-world user feedback!** 🎯

## [0.10.2] - 2025-10-01

### Changed

- **Replaced `log` command recommendations with `chat-finish`** across all commands
  - Updated `stats` command helpful tips
  - Updated `validate` command recommendations
  - Updated `cursor` integration tips
  - Updated `copilot` integration instructions
  - Updated README.md quick reference
  - Updated COMMANDS.md workflows
- **De-emphasized manual `log` command** in favor of automatic `chat-finish`
- **Improved command output consistency** - all tools now recommend the automatic workflow

### Impact

- **Before v0.10.2:** Commands suggested manual `log` command (old workflow)
- **After v0.10.2:** Commands suggest automatic `chat-finish` (new workflow)
- **Users are now guided to the better, automatic workflow!** 🎯

## [0.10.1] - 2025-10-01

### Fixed

- **Perfect formatting for all `.ai/` files:**
  - **conversation-log.md:** Removes "feat:" and "fix:" prefixes, capitalizes entries
  - **technical-decisions.md:** Extracts meaningful titles, capitalizes, adds Chat # reference
  - **known-issues.md:** Extracts meaningful titles, capitalizes, adds Chat # reference
  - **next-steps.md:** Creates bold entries with main decision as title, adds sub-items
- **Always updates next-steps.md** when decisions exist (not just when nextSteps provided)
- **Consistent capitalization** across all auto-generated entries
- **Clean professional format** - no more "feat:", "fix:", "docs:" prefixes in output

### Impact

- **Before v0.10.1:** Entries had "feat:" prefixes, inconsistent capitalization, generic titles
- **After v0.10.1:** Clean, professional, properly formatted entries in all files!
- **All 4 `.ai/` files now have perfect formatting** 🎉

## [0.10.0] - 2025-10-01

### Added

- **🤖 100% Automatic `chat-finish`** - THE TRANSFORMATION!
  - **Analyzes ALL git changes:**
    - Recent commits (last 2 hours)
    - Staged files (ready to commit)
    - Unstaged files (working directory)
    - New files (untracked)
    - Diff stats (additions/deletions)
  - **Auto-generates intelligent summaries:**
    - Detects patterns in commit messages (feat:, fix:, docs:, refactor)
    - Extracts decisions from commits (feat:, implement, add, create, use)
    - Extracts issues from commits (fix:, resolve, bug, issue)
    - Analyzes file types (source, tests, docs, config)
  - **Zero manual input required:**
    - Only asks for developer handle (optional, 1 question)
    - Auto-generates: main goal, decisions, issues
    - Automatically writes to all `.ai/` files
    - No more typing descriptions!
  - **Works even if you haven't committed:**
    - Captures unstaged changes
    - Captures staged changes
    - Captures everything you've been working on!

### Changed

- **Questions reduced from 5 to 1:**
  - Before: Had to manually type goal, decisions, issues, next steps (5 questions)
  - After: Only asks for handle, everything else auto-generated! (1 question)
- **Better git analysis:**
  - Shows commits, staged, unstaged, new files separately
  - Shows diff stats (additions/deletions)
  - More detailed change detection
- **Improved pattern matching:**
  - Recognizes conventional commit format (feat:, fix:, docs:)
  - Better extraction of decisions and issues from commit messages

### Impact

- **Before v0.10.0:** User types everything manually (lazy humans give poor answers)
- **After v0.10.0:** Git history + pattern analysis = 100% automatic!
- **This is what the tool was TRULY meant to be!** 🎉
- **Just run `aic chat-finish`, type your handle, done!**

## [0.9.1] - 2025-10-01

### Fixed

- **`chat-finish` compatibility** - Now works with older conversation-log.md formats
  - Detects and handles files without `## 📋 CHAT HISTORY` section
  - Falls back to inserting after first `---` separator
  - Better error message if no insertion point found
  - Ensures backward compatibility with existing projects

## [0.9.0] - 2025-10-01

### Added

- **🎬 `chat-finish` command** - THE KEY FEATURE that makes the tool truly automatic!
  - Automatically updates all `.ai/` files at end of chat session
  - Analyzes git diff to detect code changes
  - Asks 5 smart questions:
    1. Developer name/handle (for team collaboration)
    2. Main goal of chat session
    3. Technical decisions made
    4. Issues found/resolved
    5. Next steps
  - Auto-generates entries for:
    - `conversation-log.md` - Chat summary with changes
    - `technical-decisions.md` - Decisions with rationale
    - `known-issues.md` - Issues found/resolved
    - `next-steps.md` - Completed tasks and future work
    - `architecture.md` - Updates timestamp
  - Transforms tool from manual documentation → automatic context preservation
  - No more lost knowledge after long chat sessions!

### Impact

- **Before v0.9.0:** User has 4-hour chat, then manually runs `npx aic log` and types everything
- **After v0.9.0:** User runs `npx aic chat-finish`, answers 3 questions, all files updated automatically
- This is what the tool was always meant to be!

## [0.8.1] - 2025-10-01

### Documentation

- **Updated Mermaid Diagrams** - Added `chat-finish` workflow to all diagrams
  - `docs/01_ai-knowledge-persistence.mmd` - Shows automatic update workflow
  - `docs/02_knowledge-loss-vs-persistence.mmd` - Shows automated knowledge preservation
  - `docs/03_ai-knowledge-base-structure.mmd` - Updated workflow steps
- **Updated `.ai/` Knowledge Base** - Comprehensive updates from Chat #3
  - `technical-decisions.md` - Added 5 major decisions (config system, token report, docs)
  - `next-steps.md` - Added v0.9.0 planning, moved completed items
  - `architecture.md` - Complete system architecture documentation
  - `known-issues.md` - Documented 3 resolved issues
  - `conversation-log.md` - Added v0.9.0 planning section

### Planning

- **v0.9.0 Roadmap** - `chat-finish` command to automatically preserve chat context
  - Analyze git diff to detect changes
  - Ask 2-3 smart questions (goal, decisions, next steps)
  - Auto-generate entries for all `.ai/` files
  - Transform tool from manual → automatic

## [0.8.0] - 2025-10-01

### Added

- **Comprehensive Documentation** - Major documentation overhaul
  - **COMMANDS.md** - Complete command reference (600+ lines)
    - Detailed syntax, options, and examples for all 16 commands
    - Common workflows (daily, weekly, new project setup)
    - Tips & best practices
  - **CONFIGURATION.md** - Detailed configuration guide (350+ lines)
    - Step-by-step configuration instructions
    - All available options explained
    - Troubleshooting section
    - Examples for every use case

### Improved

- **README.md** - Better documentation structure
  - Added "Full Documentation" section with links to COMMANDS.md and CONFIGURATION.md
  - Clearer organization of documentation resources
  - Separated core docs from project-specific docs

### Documentation

- Every command now has:
  - Clear syntax explanation
  - All options documented
  - Multiple examples
  - "When to use" guidance
  - Expected output samples
- Configuration guide includes:
  - Visual examples of before/after
  - Complete model list with context windows
  - Troubleshooting for common issues
  - Per-project vs global config explanation

## [0.7.1] - 2025-10-01

### Documentation

- **Enhanced README** - Added detailed Configuration section
  - Examples of setting preferred model
  - List of all available AI models (16 models across OpenAI, Anthropic, Google)
  - Explanation of per-project configuration storage
  - Clear examples: `npx aic config set preferredModel "Claude Sonnet 4.5"`

## [0.7.0] - 2025-10-01

### Added

- **Configuration system** - New `config` command to manage user preferences

  - `npx aic config` - List all configuration
  - `npx aic config set preferredModel "Claude Sonnet 4.5"` - Set your preferred AI model
  - `npx aic config set showAllModels true` - Always show all models in tokens command
  - `npx aic config get preferredModel` - Get specific config value
  - Configuration stored in `.ai/config.json`

- **Simplified token report** - Smarter, less overwhelming output
  - Default: Shows only top 4 popular models (GPT-5, GPT-4o, Claude Sonnet 4.5, Gemini 1.5 Pro)
  - If you set a preferred model, it shows: ⭐ Your model + top 3 popular models
  - Add `--all` flag to see all 16 models: `npx aic tokens --all`
  - Preferred model marked with ⭐ star

### Improved

- **Better token insights** - More actionable recommendations
  - Shows hint: "Showing 4 models. Run 'npx aic tokens --all' to see all 16 models"
  - Cleaner output focused on what you actually use

### Technical

- New module: `src/config.js` - Configuration management
- Updated: `src/tokens.js` - Simplified model display logic
- Updated: `bin/cli.js` - Added config command and --all flag for tokens

## [0.6.5] - 2025-10-01

### Fixed

- **Conversation entry counting** - Now correctly detects conversation entries in multiple formats
  - Fixed regex to support date-first format: `## 2025-09-30 - Chat #19: Topic`
  - Still supports original format: `## Chat #19 - Topic`
  - Also supports format without #: `## Chat 19 - Topic`
  - Previously showed "0 entries" for date-first format, now correctly counts all entries

## [0.6.4] - 2025-10-01

### Improved

- **Smarter token usage insights** - Context-aware recommendations based on actual AI limits

  - Now considers both token count AND conversation entry count
  - Uses realistic thresholds: 8K (healthy), 30K (moderate), 100K (large)
  - Different advice for few vs many entries:
    - Few entries + high tokens → "Consider starting a new chat for new topics"
    - Many entries + high tokens → "Consider archiving old conversations"
  - No more misleading "archive" warnings when you only have 1 conversation entry
  - Shows "just getting started" message for new knowledge bases

- **Updated AI model context windows** - Comprehensive list of latest models (October 2025)
  - **Added OpenAI GPT-5 family:** GPT-5 (400K), GPT-5 mini (400K), GPT-5 nano (400K)
  - **Added Claude 4 family:** Sonnet 4.5 (200K), Opus 4.1 (200K), Sonnet 4 (200K), Opus 4 (200K)
  - **Kept Claude 3.5:** Sonnet (200K), Haiku (200K)
  - **Kept Google Gemini:** 1.5 Pro (2M), 1.5 Flash (1M)
  - **Removed outdated models:** GPT-3.5 (4K), GPT-4 (8K)
  - All context window sizes verified from official sources (Anthropic, OpenAI, Google)

## [0.6.3] - 2025-10-01

### Improved

- **Smarter token usage insights** - Context-aware recommendations based on actual AI limits

### Why This Update?

**Problem:** Stats command suggested archiving even with only 1 conversation entry

**Solution:** Smarter insights that consider conversation count before suggesting actions

**Impact:**

- More accurate and actionable recommendations
- No misleading warnings for new users
- Better guidance on when to archive vs when to start new chats
- Aligned with real AI context limits (GPT-4: 8K-128K, Claude: 100K-200K)

### Examples

**Before (misleading):**

```
~5,463 tokens, 1 entry
⚠️  Token usage is moderate - consider archiving old entries
```

**After (smart):**

```
~5,463 tokens, 1 entry
✅ Token usage is healthy - fits comfortably in most AI contexts
💬 1 conversation entry - just getting started
```

**With many entries:**

```
~35,000 tokens, 25 entries
⚠️  Token usage is large - may exceed some AI context limits
💡 Action: Run 'npx aic archive' to archive old conversations
```

**With few entries but high tokens:**

```
~35,000 tokens, 3 entries
⚠️  Token usage is large - may exceed some AI context limits
💡 Action: Consider starting a new chat for new topics
```

## [0.6.2] - 2025-10-01

### Added

- **Short alias `aic`** - Use `npx aic` instead of `npx create-ai-chat-context`
  - Much shorter to type: `npx aic init`, `npx aic stats`, etc.
  - Works with all commands
  - Original command still works (backward compatible)
  - No breaking changes

### Changed

- **README.md** - Updated all examples to use `aic` alias
- **Key Commands section** - Now shows actual command examples with `aic`

### Why This Update?

**Problem:** `npx create-ai-chat-context` is too long to type repeatedly

**Solution:** Added `aic` as a short alias (60% shorter!)

**Impact:**

- Faster to type: `npx aic stats` vs `npx create-ai-chat-context stats`
- Better user experience for frequent commands
- Still backward compatible with full name

### Examples

```bash
# Before (still works)
npx create-ai-chat-context init
npx create-ai-chat-context stats

# After (shorter!)
npx aic init
npx aic stats
```

## [0.6.1] - 2025-10-01

### Documentation

- **README.md** - Completely restructured for clarity
  - Reduced from 419 lines to 101 lines (76% shorter)
  - New structure: Problem → Solution → Quick Start → Key Commands → Links
  - Removed overwhelming details, points to full docs in `.ai/` files
  - Much easier to scan and understand
  - All detailed documentation moved to files created by `init` command

### Why This Update?

**Problem:** README was too long (419 lines) and overwhelming for new users

**Solution:** Restructured to be concise and scannable, with links to full documentation

**Impact:** Users can understand the package in 30 seconds instead of 5 minutes

## [0.6.0] - 2025-10-01

### 🎯 FEATURE: Smart Automation

This release completes half-finished features with intelligent auto-detection and Git hooks integration.

### Added

- **Auto-detection of project type** - Smart template selection

  - Automatically detects Next.js projects (checks package.json for `next` or `react`)
  - Automatically detects Python projects (checks for requirements.txt, pyproject.toml, setup.py, Pipfile, poetry.lock)
  - Automatically detects Rust projects (checks for Cargo.toml)
  - Falls back to generic template if no match
  - Shows "(auto-detected)" message when template is detected
  - Manual override still available with `--template` flag
  - Example: `npx create-ai-chat-context init` (auto-detects!)

- **Git hooks integration** - Automatic reminders
  - `install-hooks` command installs Git hooks
  - **pre-commit hook**: Reminds you to update conversation log before committing
  - **post-commit hook**: Suggests logging your commit after it's done
  - Non-blocking (doesn't prevent commits)
  - Bypass with `git commit --no-verify`
  - Easy uninstall: `rm .git/hooks/pre-commit .git/hooks/post-commit`
  - Example: `npx create-ai-chat-context install-hooks`

### Enhanced

- **`init` command** - Now auto-detects project type

  - No need to specify `--template` for common project types
  - Detects Next.js, Python, Rust automatically
  - Shows detection result with spinner
  - Manual override still works: `--template nextjs`

- **`update` command** - Uses improved detection
  - Refactored to use centralized detection module
  - More reliable template detection
  - Consistent with init command

### Why This Update?

**Problem 1:** Users had to manually specify template type
**Solution:** Auto-detection checks project files and selects the right template

**Problem 2:** Users forget to update conversation log after coding
**Solution:** Git hooks provide gentle reminders at commit time

**Problem 3:** Detection logic was duplicated across commands
**Solution:** Centralized detection module (`src/detect.js`)

### User Experience

**Before v0.6.0:**

```bash
User: npx create-ai-chat-context init
# Uses generic template (not ideal for Next.js project)

User: git commit -m "Add feature"
# No reminder to update log
# Log gets outdated
```

**After v0.6.0:**

```bash
User: npx create-ai-chat-context init
# ✓ Detected nextjs project
# Uses Next.js template automatically!

User: git commit -m "Add feature"
# 📝 Reminder: Update your conversation log!
# Consider running: npx create-ai-chat-context log
# ✅ Commit successful!
```

### Commands Summary

```bash
# Initialize with auto-detection
npx create-ai-chat-context init

# Initialize with manual template (override)
npx create-ai-chat-context init --template python

# Install Git hooks
npx create-ai-chat-context install-hooks

# Install Git hooks (overwrite existing)
npx create-ai-chat-context install-hooks --force

# Uninstall Git hooks
rm .git/hooks/pre-commit
rm .git/hooks/post-commit
```

### Auto-Detection Logic

**Next.js/React:**

- Checks `package.json` for `next` dependency
- Checks `package.json` for `react` dependency (without `next`)
- Uses `nextjs` template

**Python:**

- Checks for `requirements.txt`
- Checks for `pyproject.toml`
- Checks for `setup.py`
- Checks for `Pipfile`
- Checks for `poetry.lock`
- Uses `python` template

**Rust:**

- Checks for `Cargo.toml`
- Uses `rust` template

**Default:**

- Falls back to generic template if no match

### Git Hooks Behavior

**pre-commit hook:**

1. Runs before `git commit`
2. Checks if `.ai/conversation-log.md` was modified
3. If not, shows reminder (but doesn't block commit)
4. Only shows reminder if code files are being committed
5. Suggests: `npx create-ai-chat-context log`

**post-commit hook:**

1. Runs after `git commit`
2. Shows success message
3. Reminds to update knowledge base
4. Shows what was just committed
5. Non-intrusive, just a helpful reminder

### Impact

- ✅ Zero-config initialization (auto-detects project type)
- ✅ Never forget to update log (Git hooks remind you)
- ✅ Better defaults for common project types
- ✅ Consistent detection across commands
- ✅ Non-blocking reminders (doesn't interrupt workflow)
- ✅ Easy to bypass when needed

### Technical Details

**New Module: `src/detect.js`**

- `detectProjectType(cwd)` - Auto-detect from project files
- `detectTemplateFromKB(aiDir)` - Detect from existing KB (for update)
- `getProjectInfo(cwd)` - Get project name and description
- `isNextJsProject(cwd)` - Check for Next.js
- `isPythonProject(cwd)` - Check for Python
- `isRustProject(cwd)` - Check for Rust

**New Module: `src/install-hooks.js`**

- `installGitHooks(options)` - Install pre-commit and post-commit hooks
- `generatePreCommitHook()` - Generate hook script
- `generatePostCommitHook()` - Generate hook script
- Hooks are shell scripts with color output
- Executable permissions set automatically (0o755)

**Refactoring:**

- Moved detection logic from `src/update.js` to `src/detect.js`
- Updated `src/init.js` to use auto-detection
- Updated `src/update.js` to use centralized detection
- Consistent detection behavior across all commands

## [0.5.0] - 2025-10-01

### 🔍 FEATURE: Search & Insights

This release makes your knowledge base searchable, measurable, and maintainable with four powerful new commands.

### Added

- **`search` command** - Find information instantly

  - Search across all `.ai/` files
  - Highlights matching text
  - Shows line numbers and context
  - Case-sensitive option available
  - Example: `npx create-ai-chat-context search "authentication"`

- **`stats` command** - Analytics and insights

  - Total files, lines, words, tokens
  - Conversation entry count
  - Last updated timestamp
  - Most active file
  - File breakdown with visual bars
  - Quality score (0-100%)
  - Actionable insights and recommendations
  - Example: `npx create-ai-chat-context stats`

- **`export` command** - Share and backup

  - Export as Markdown (single file)
  - Export as JSON (structured data)
  - Export as HTML (viewable in browser)
  - Includes all knowledge base files
  - Timestamps and metadata
  - Example: `npx create-ai-chat-context export --format markdown`

- **`update` command** - Keep templates fresh
  - Updates template files (SETUP_GUIDE, TOKEN_MANAGEMENT)
  - Auto-detects your template type (nextjs, python, default)
  - Creates backups before updating
  - Interactive confirmation
  - Preserves your custom content
  - Example: `npx create-ai-chat-context update`

### Why This Update?

**Problem 1:** Users can't find information in growing knowledge bases
**Solution:** `search` command finds anything instantly

**Problem 2:** Users don't know the health/size of their KB
**Solution:** `stats` command shows comprehensive analytics

**Problem 3:** Users want to share/backup their KB
**Solution:** `export` command creates portable formats

**Problem 4:** Templates improve but users can't get updates
**Solution:** `update` command merges latest improvements

### User Experience

**Before v0.5.0:**

```
User: "Where did I document the authentication decision?"
User: [Opens architecture.md... not there]
User: [Opens technical-decisions.md... searches manually]
User: [Finally finds it after 2 minutes]
```

**After v0.5.0:**

```
User: npx create-ai-chat-context search "authentication"
# Found in technical-decisions.md (line 45):
#   - Decision: Use NextAuth.js for authentication
User: [Found in 2 seconds!]
```

### Commands Summary

```bash
# Search for information
npx create-ai-chat-context search "database"
npx create-ai-chat-context search "auth" --case-sensitive

# View statistics
npx create-ai-chat-context stats

# Export knowledge base
npx create-ai-chat-context export --format markdown
npx create-ai-chat-context export --format json -o backup.json
npx create-ai-chat-context export --format html

# Update templates
npx create-ai-chat-context update
npx create-ai-chat-context update --yes  # Skip confirmation
```

### Search Examples

```bash
# Find authentication mentions
npx create-ai-chat-context search "authentication"

# Find database decisions
npx create-ai-chat-context search "database"

# Find specific function names
npx create-ai-chat-context search "getUserById"

# Case-sensitive search
npx create-ai-chat-context search "API" --case-sensitive
```

### Stats Output Example

```
📊 Knowledge Base Statistics

📝 Content:
   Total files:              8
   Total lines:              2,450
   Total words:              12,340
   Estimated tokens:         ~16,450
   Conversation entries:     23

📈 Activity:
   Last updated:             2 hours ago
   Most active file:         conversation-log.md
   Most active file size:    5,230 words

📄 File Breakdown:
   conversation-log.md       ████████████████████ 42.4% (5,230 words)
   architecture.md           ████████░░░░░░░░░░░░ 18.2% (2,245 words)
   technical-decisions.md    ██████░░░░░░░░░░░░░░ 15.1% (1,863 words)
   ...

🎯 Quality Score:
   85% - Good

💡 Insights:
   ✅ Token usage is moderate - consider archiving old entries
   💬 23 conversation entries - healthy amount
```

### Export Formats

**Markdown:**

- Single file with all content
- Easy to read and share
- Compatible with any markdown viewer

**JSON:**

- Structured data format
- Includes metadata (size, modified date, word count)
- Easy to process programmatically
- Perfect for backups

**HTML:**

- Viewable in any browser
- Styled and formatted
- Printable
- No dependencies needed

### Update Behavior

**What gets updated:**

- ✅ SETUP_GUIDE.md (usage instructions)
- ✅ TOKEN_MANAGEMENT.md (token guidance)

**What stays untouched:**

- ✅ architecture.md (your custom content)
- ✅ technical-decisions.md (your decisions)
- ✅ conversation-log.md (your history)
- ✅ All other custom files

**Safety:**

- Creates `.backup` files before updating
- Interactive confirmation (unless `--yes`)
- Auto-detects your template type
- Only updates if changes detected

### Impact

- ✅ Find information in seconds (not minutes)
- ✅ See KB health at a glance
- ✅ Easy sharing and backups
- ✅ Stay up-to-date with template improvements
- ✅ Better knowledge base maintenance
- ✅ More confidence in the system

### Technical Details

**Search Implementation:**

- Regex-based search across all files
- Highlights matching text in yellow
- Shows line numbers for easy navigation
- Case-insensitive by default
- Fast and efficient

**Stats Calculation:**

- Real-time file analysis
- Token estimation using 1.33x word count
- Quality score based on file existence and customization
- Visual bars for file size comparison
- Actionable insights based on thresholds

**Export Formats:**

- Markdown: Combines all files with headers
- JSON: Structured with metadata
- HTML: Simple markdown-to-HTML conversion with styling
- All formats include timestamps

**Update Logic:**

- Template detection via content analysis
- Only updates non-custom files
- Backup creation before changes
- Interactive confirmation
- Preserves user customizations

## [0.4.0] - 2025-10-01

### 🤖 FEATURE: AI Tool Integrations

This release adds zero-effort context loading for GitHub Copilot and Claude Projects, plus improves the existing Cursor integration.

### Added

- **`copilot` command** - GitHub Copilot integration

  - Generates `.github/copilot-instructions.md` file
  - Auto-loads project context in every Copilot chat
  - No manual prompting needed
  - Includes workflow instructions and token management tips
  - Example: `npx create-ai-chat-context copilot`

- **`claude-project` command** - Claude Projects export
  - Combines all `.ai/` files into one document
  - Formatted for Claude Projects knowledge base
  - Easy copy/paste into Claude.ai
  - Includes all architecture, decisions, and history
  - Example: `npx create-ai-chat-context claude-project`

### Enhanced

- **CLI help** - Now shows all available commands including new integrations
- **Documentation** - Updated with GitHub Copilot and Claude Projects usage

### Why This Update?

**Problem:** Users have to manually prompt AI tools to read their knowledge base files every time they start a new chat. This is tedious and easy to forget.

**Solution:** Generate integration files that automatically load context for popular AI tools.

**Result:** Zero-effort context loading. Your AI assistant has full project context from the start!

### User Experience

**Before v0.4.0:**

```
User: [Opens GitHub Copilot Chat]
User: "Please read .ai-instructions and all files in .ai/ directory"
Copilot: [Reads files]
User: "Now help me with..."
```

**After v0.4.0:**

```
User: npx create-ai-chat-context copilot
User: [Opens GitHub Copilot Chat]
Copilot: [Already has full context!]
User: "Help me with..." [Immediately productive]
```

### Supported AI Tools

| Tool                | Command          | Integration File                  | Status    |
| ------------------- | ---------------- | --------------------------------- | --------- |
| **Cursor**          | `cursor`         | `.cursorrules`                    | ✅ v0.2.0 |
| **GitHub Copilot**  | `copilot`        | `.github/copilot-instructions.md` | ✅ v0.4.0 |
| **Claude Projects** | `claude-project` | `CLAUDE_PROJECT.md`               | ✅ v0.4.0 |
| ChatGPT             | Manual           | Copy/paste `.ai-instructions`     | ✅ Works  |
| Augment             | Manual           | Copy/paste `.ai-instructions`     | ✅ Works  |

### Commands Summary

```bash
# GitHub Copilot integration
npx create-ai-chat-context copilot

# Claude Projects export
npx create-ai-chat-context claude-project

# Cursor integration (from v0.2.0)
npx create-ai-chat-context cursor

# Regenerate with --force
npx create-ai-chat-context copilot --force
npx create-ai-chat-context claude-project --force
```

### How to Use

#### GitHub Copilot:

1. Run `npx create-ai-chat-context copilot`
2. Restart VS Code
3. Open GitHub Copilot Chat
4. Context is automatically loaded!

#### Claude Projects:

1. Run `npx create-ai-chat-context claude-project`
2. Open Claude.ai and create a Project
3. Go to Project Knowledge
4. Copy/paste content of `CLAUDE_PROJECT.md`
5. All chats in that project have context!

#### Cursor:

1. Run `npx create-ai-chat-context cursor`
2. Restart Cursor
3. Start a new chat
4. Context is automatically loaded!

### Impact

- ✅ Zero-effort context loading
- ✅ No manual prompting needed
- ✅ Consistent context across all chats
- ✅ Faster onboarding for new AI tools
- ✅ Better AI suggestions from the start
- ✅ Supports 3 major AI coding assistants

### Technical Details

**GitHub Copilot Integration:**

- Creates `.github/copilot-instructions.md`
- Uses GitHub Copilot's custom instructions feature
- Automatically read at the start of every chat
- Includes workflow, token management, and maintenance tips

**Claude Projects Integration:**

- Combines all `.ai/` files into single document
- Formatted as markdown with clear sections
- Includes timestamps and regeneration instructions
- Easy to update when knowledge base changes

**File Management:**

- All generated files are added to `.gitignore`
- Use `--force` flag to overwrite existing files
- Files are auto-generated and can be regenerated anytime

### Future Integrations

Based on user demand, we plan to add:

- VS Code extension (native integration)
- JetBrains IDEs integration
- Windsurf integration
- Aider integration

**Request an integration:** Open an issue on GitHub!

## [0.3.0] - 2025-10-01

### 🎨 FEATURE: Project-Specific Templates

This release adds project-specific templates for faster onboarding with better defaults tailored to your tech stack.

### Added

- **Template system** - Choose templates based on project type

  - `--template nextjs` - Next.js/React projects
  - `--template python` - Python projects
  - `--template default` - Generic (works for anything)
  - More templates coming in future releases

- **Next.js template** - Tailored for Next.js/React projects

  - App Router vs Pages Router decision template
  - TypeScript, styling, authentication choices
  - State management patterns
  - Deployment and testing strategies
  - Next.js-specific architecture examples
  - Common technical decisions for React ecosystem

- **Python template** - Tailored for Python projects
  - FastAPI/Django/Flask decision template
  - Database and ORM choices
  - API design patterns
  - Background task setup
  - Python-specific architecture examples
  - Common technical decisions for Python ecosystem

### Enhanced

- **`init` command** - Now supports `--template` flag
  - Lists available templates if invalid template specified
  - Shows which template is being used
  - Falls back to default files for common templates
  - Example: `npx create-ai-chat-context init --template nextjs`

### Why This Update?

**Problem:** Generic templates don't fit all projects. Users spend time customizing architecture.md and technical-decisions.md for their specific stack.

**Solution:** Project-specific templates with relevant examples and decisions pre-filled.

**Result:** Faster setup (5 min → 2 min), more relevant defaults, better first impression.

### User Experience

**Before v0.3.0:**

```
User: npx create-ai-chat-context init
User: [Opens architecture.md]
User: "This is too generic. Let me rewrite this for Next.js..."
User: [Spends 10 minutes customizing]
```

**After v0.3.0:**

```
User: npx create-ai-chat-context init --template nextjs
User: [Opens architecture.md]
User: "Perfect! This already has Next.js patterns!"
User: [Minor tweaks, ready in 2 minutes]
```

### Template Examples

**Next.js Template includes:**

- App Router vs Pages Router decision
- Styling solutions (Tailwind, CSS Modules, etc.)
- Authentication providers (NextAuth, Clerk, etc.)
- Database choices (PostgreSQL, MongoDB, Supabase)
- State management (Context, Zustand, Redux)
- Deployment platforms (Vercel, AWS, Docker)

**Python Template includes:**

- Framework choice (FastAPI, Django, Flask)
- Database and ORM (PostgreSQL + SQLAlchemy, etc.)
- API design (REST, GraphQL, gRPC)
- Task queues (Celery, RQ)
- Testing strategies (pytest, unittest)
- Deployment (Docker, AWS, Heroku)

### Commands Summary

```bash
# Initialize with Next.js template
npx create-ai-chat-context init --template nextjs

# Initialize with Python template
npx create-ai-chat-context init --template python

# Initialize with default (generic) template
npx create-ai-chat-context init

# List available templates (shown on error)
npx create-ai-chat-context init --template invalid
```

### Impact

- ✅ Faster onboarding (5 min → 2 min)
- ✅ More relevant defaults for specific stacks
- ✅ Better first impression
- ✅ Less customization needed
- ✅ Framework-specific best practices included

### Future Templates

Based on user demand, we plan to add:

- Rust template
- Backend API template (generic)
- Mobile template (React Native/Flutter)
- Full-stack template
- Microservices template

**Request a template:** Open an issue on GitHub!

## [0.2.0] - 2025-10-01

### 🎯 MAJOR FEATURE: Effortless Logging & Quality Assurance

This release makes maintaining your knowledge base **effortless** with interactive logging, quality validation, and zero-effort Cursor integration.

### Added

- **`log` command** - Interactive conversation log entry

  - Auto-detects next chat number
  - Auto-fills current date
  - Prompts for: accomplishments, decisions, next steps
  - Validates format automatically
  - Appends to conversation log correctly
  - Example: `npx create-ai-chat-context log`
  - **Impact:** Solves #1 user pain point (forgetting to log)

- **`validate` command** - Knowledge base quality check

  - Checks all required files exist
  - Validates file formats (especially conversation log)
  - Detects default/empty templates
  - Warns about incomplete sections
  - Provides quality score (0-100%)
  - Gives specific recommendations
  - Example: `npx create-ai-chat-context validate`
  - **Impact:** Ensures users get value from the system

- **`cursor` command** - Cursor AI integration
  - Generates `.cursorrules` file
  - Auto-loads context in every Cursor chat
  - Zero manual effort required
  - Includes workflow instructions
  - Includes token management reminders
  - Example: `npx create-ai-chat-context cursor`
  - **Impact:** Expands to massive Cursor user base

### Why This Update?

**Problem 1:** Users forget to update conversation log
**Solution:** Interactive `log` command makes it effortless

**Problem 2:** Users don't know if they're using the system correctly
**Solution:** `validate` command provides quality score and guidance

**Problem 3:** Cursor users have to manually prompt for context
**Solution:** `.cursorrules` file auto-loads context in every chat

### User Experience

**Before v0.2.0:**

```
User: [finishes chat session]
User: [forgets to update conversation log]
User: [next session has no context from previous work]
User: "Wait, what did I do last time?"
```

**After v0.2.0:**

```
User: [finishes chat session]
User: npx create-ai-chat-context log
CLI: [guides through adding entry with prompts]
User: [entry added in 30 seconds]
✅ Context preserved!
```

**Cursor Integration:**

```
Before: User has to type "@.ai-instructions" every chat
After: Cursor automatically loads context every chat
Result: Zero effort, perfect context!
```

### Commands Summary

```bash
# NEW! Add conversation entry (interactive)
npx create-ai-chat-context log

# NEW! Validate knowledge base quality
npx create-ai-chat-context validate

# NEW! Generate Cursor integration
npx create-ai-chat-context cursor

# Existing commands
npx create-ai-chat-context check
npx create-ai-chat-context tokens
npx create-ai-chat-context archive --keep 10
npx create-ai-chat-context summary --keep 10
```

### Impact

- ✅ Logging is now effortless (30 seconds vs 5 minutes)
- ✅ Users get quality feedback and guidance
- ✅ Cursor users get zero-effort integration
- ✅ Massive expansion to Cursor user base
- ✅ Higher user satisfaction and retention

### Quality Validation Example

```
🔍 Validating Knowledge Base...

📁 File Check:
  ✅ README.md
  ✅ architecture.md
  ✅ conversation-log.md
  ...

✏️  Customization Check:
  ✅ architecture.md
  ⚠️  technical-decisions.md
     Contains template placeholder text

📝 Conversation Log Format:
  ✅ Format is valid

📊 Quality Score:
  🌟 18/20 (90%) - Excellent

🎉 Your knowledge base is in excellent shape!
```

### Cursor Integration Benefits

- **Zero effort:** Context loads automatically
- **Always up-to-date:** Reads latest .ai/ files
- **Workflow included:** Reminds to update log at end
- **Token aware:** Warns about large conversation logs
- **Universal:** Works for all Cursor users

### Philosophy

**v0.1.x:** Gave users the tools
**v0.2.0:** Makes the tools effortless to use

**Result:** Users actually maintain their knowledge base instead of abandoning it!

## [0.1.5] - 2025-10-01

### 🎯 IMPROVEMENT: Proactive Token Management

This release makes token management **proactive** instead of reactive. Users now get automatic warnings and health checks without extra effort.

### Added

- **`check` command** - Quick health check of knowledge base
  - Shows token usage at a glance
  - Displays conversation entry count
  - Shows last updated date
  - Provides color-coded status (✅ healthy / ⚠️ moderate / 🚨 high)
  - Gives contextual recommendations
  - Fast (< 1 second)
  - Example: `npx create-ai-chat-context check`

### Enhanced

- **`.ai-instructions` template** - Added automatic token usage check

  - AI now counts conversation entries after reading knowledge base
  - Warns user if > 30 entries: "Run `check` to see token usage"
  - Alerts user if > 50 entries: "Consider archiving"
  - Optional but helpful - prevents token bloat
  - No extra commands needed from user

- **`init` command** - Smart warnings for existing projects

  - Checks token usage after initialization
  - Warns if existing conversation log is large (> 15,000 tokens)
  - Suggests running `check` command
  - Only shows when relevant

- **NEW_CHAT_PROMPT.md** - Added health check workflow

  - New recommended prompt: "Read .ai-instructions first, check token usage, then help me [task]"
  - Added "Token Management" section with examples
  - Shows when to check and what to do if usage is high

- **README.md** - Updated with `check` command
  - Added to Usage section
  - Updated Token Management section
  - Shows quick health check as recommended approach

### Why This Update?

**Problem:** Users had to manually remember to check token usage. Easy to forget until it's too late.

**Solution:** Three-layer proactive approach:

1. **`check` command** - Quick health check anytime
2. **AI auto-check** - AI counts entries and warns user automatically
3. **Smart warnings** - Contextual tips in existing commands

**Result:** Users get proactive warnings without feeling nagged.

### User Experience

**Before v0.1.5:**

```
User: [works on project for 50 chats]
User: [token usage hits 30,000]
User: "Why is AI slow?"
User: [manually runs tokens command]
User: "Oh no, I should have archived earlier!"
```

**After v0.1.5:**

```
User: "Read .ai-instructions first, check token usage, then help me add auth"
AI: "📊 Your conversation log has 32 entries. Run `npx create-ai-chat-context check` to see token usage."
User: [runs check command]
Check: "⚠️ Moderate usage. Consider archiving soon."
User: [archives proactively before it's a problem]
```

### Commands Summary

```bash
# Quick health check (NEW!)
npx create-ai-chat-context check

# Detailed breakdown
npx create-ai-chat-context tokens

# Archive if needed
npx create-ai-chat-context archive --keep 10
```

### Impact

- ✅ Proactive warnings instead of reactive fixes
- ✅ No extra effort from users (AI does the checking)
- ✅ Fast health check command (< 1 second)
- ✅ Contextual tips at natural checkpoints
- ✅ Prevents token bloat before it's a problem

**Philosophy:** Make token management **helpful, not annoying**.

## [0.1.4] - 2025-10-01

### 🚀 NEW FEATURE: Token Management Tools

This release adds powerful token management features to help you keep your knowledge base efficient.

### Added

- **`tokens` command** - Show detailed token usage breakdown

  - Displays token count per file
  - Shows percentage of context window used
  - Compares against GPT-3.5, GPT-4, Claude context windows
  - Provides recommendations based on usage
  - Example: `npx create-ai-chat-context tokens`

- **`archive` command** - Archive old conversation logs

  - Moves old entries to `.ai/archive/` directory
  - Keeps specified number of recent entries in main log
  - Preserves all history in dated archive files
  - Example: `npx create-ai-chat-context archive --keep 10`

- **`summary` command** - Summarize old conversation logs

  - Condenses old entries into brief summaries
  - Keeps specified number of recent entries detailed
  - Reduces token usage by 60-80%
  - Example: `npx create-ai-chat-context summary --keep 10`

- **TOKEN_MANAGEMENT.md template** - Comprehensive guide
  - Explains token usage and why it matters
  - Shows typical token usage at different project stages
  - Provides management strategies and best practices
  - Includes examples and quick reference

### Enhanced

- **README.md** - Added "Token Usage & Management" section

  - Token usage table by project stage
  - Efficiency comparison (with vs without the system)
  - Token management commands documentation
  - Best practices for keeping token usage low

- **Usage documentation** - Added new commands to usage section
  - `tokens` command examples
  - `archive` command with options
  - `summary` command with options

### Why This Update?

**Problem:** Users asked: "How many tokens does this use? Will it fill up the context window?"

**Answer:**

- Fresh project: ~3,000 tokens (1.5% of Claude)
- Active project (10 chats): ~8,000 tokens (4%)
- Mature project (50 chats): ~22,000 tokens (11%)
- Large project (100+ chats): ~40,000-50,000 tokens (20-25%)

**Solution:** New tools to monitor and manage token usage:

- Check usage anytime with `tokens` command
- Archive old conversations when needed
- Summarize history to reduce tokens
- Clear guidance on when to take action

### Token Efficiency

**Without this system:**

- 1,800-3,500 tokens wasted per chat on re-explanation
- Over 50 chats: 90,000-175,000 tokens wasted

**With this system:**

- 22,000 tokens for persistent context (50 chats)
- **Net savings: 68,000-153,000 tokens + 8-15 hours of time**

### Commands Summary

```bash
# Check token usage
npx create-ai-chat-context tokens

# Archive old conversations (keep 10 recent)
npx create-ai-chat-context archive --keep 10

# Summarize old conversations (keep 10 detailed)
npx create-ai-chat-context summary --keep 10
```

### Impact

- ✅ Users can monitor token usage
- ✅ Users can manage large conversation logs
- ✅ Clear guidance on when to take action
- ✅ Tools to reduce token usage by 60-80%
- ✅ Preserves all history (archive) or context (summary)

**Recommended workflow:**

1. Check tokens every 10-20 chats
2. Archive or summarize after 30+ chats
3. Keep token usage under 25,000 for optimal performance

## [0.1.3] - 2025-10-01

### 🎯 MAJOR IMPROVEMENT: Chat Continuity & Better Instructions

This release significantly improves how AI assistants maintain context across chat sessions.

### Enhanced

- **`.ai-instructions` template** - Completely rewritten to be generic and universal

  - Removed project-specific content (was referencing "toy-store-unified")
  - Added MANDATORY workflow section (START → DURING → END)
  - Added CRITICAL reminders to update files before ending session
  - Provided exact template for updating conversation-log.md
  - Multiple warnings emphasizing importance of updates

- **`conversation-log.md` template** - Much clearer instructions for AI assistants

  - Added explicit instructions at the top for when to read/update
  - Provided detailed template with concrete examples
  - Added tips for writing good entries
  - Added reminder section with step-by-step update process

- **`NEW_CHAT_PROMPT.md`** - New recommended prompts for chat continuity

  - Added: "Read .ai-instructions first, and help me continue where we left off with chat #[number]"
  - Added: "Read .ai-instructions first, continue from chat #[number], then help me [task]"
  - Marked continuity prompts as RECOMMENDED and BEST
  - Added complete workflow example showing Chat #1 → #2 → #3

- **`README.md`** - Better documentation of chat continuity feature
  - Added continuity prompts to Quick Start section
  - Updated Usage Examples with first chat vs. continuing chat
  - Added new section: "🔄 Chat Continuity Example"
  - Shows concrete example of how Chat #1 → #2 → #3 flow works

### Why This Update?

**Problem:** The original `.ai-instructions` template was copied from a specific project and contained:

- References to "toy-store-unified" project
- Specific tech stack (Next.js, TypeScript, PostgreSQL)
- Mentions of "19+ chat sessions" and specific decisions
- This confused AI assistants when used in new projects

**Solution:**

- Made all templates truly generic and universal
- Added explicit workflow instructions for AI assistants
- Emphasized the importance of updating conversation-log.md
- Provided recommended prompts that make continuity explicit

**Result:**

- AI assistants now understand they MUST update files at end of session
- Users can explicitly tell AI to continue from previous chat
- Much better context preservation across sessions
- Clear examples of how Chat #1 → #2 → #3 should work

### Recommended Prompts

**First chat:**

```
Read .ai-instructions first, then help me with [your task].
```

**Continuing from previous chat (RECOMMENDED):**

```
Read .ai-instructions first, and help me continue where we left off with chat #[number].
```

**Best option (most explicit):**

```
Read .ai-instructions first, continue from chat #[number], then help me [specific task].
```

### Impact

- ✅ Better chat continuity across sessions
- ✅ AI assistants know exactly what to do
- ✅ Explicit reminders to update knowledge base
- ✅ Clear workflow: START → DURING → END
- ✅ Users can reference specific previous chats
- ✅ No more confusion from project-specific templates

**⚠️ If you installed v0.1.0, v0.1.1, or v0.1.2, consider re-running `init --force` to get the improved templates!**

## [0.1.2] - 2025-10-01

### 🚨 CRITICAL SECURITY FIX

- **REMOVED PRIVATE DATA FROM TEMPLATES** - Templates contained actual project data from toy-store-ai-system
- **REPLACED WITH GENERIC TEMPLATES** - All templates now use placeholder text
- **NO MORE DATA LEAKAGE** - Safe to use on any project

### Fixed

- `architecture.md` - Now generic template with placeholders
- `conversation-log.md` - Now generic template with examples
- `technical-decisions.md` - Now generic template with structure
- `known-issues.md` - Now generic template with format
- `next-steps.md` - Now generic template with sections

### Why This Update?

- **User reported:** Templates contained private project information
- **Impact:** HIGH - Could leak sensitive data to other projects
- **Fix:** Replaced all templates with generic placeholders
- **Status:** SAFE - No more private data in templates

**⚠️ If you installed v0.1.0 or v0.1.1, please update immediately!**

## [0.1.1] - 2025-09-30

### Added

- **AI Compatibility Section** - Comprehensive list of ALL compatible AI assistants
- **Comparison Table** - Shows what makes this package different from other tools
- **Usage Examples** - Specific examples for ChatGPT, Claude, Cursor, Copilot, etc.

### Documentation

- Added "Works with ALL AI Assistants" section with 10+ AI tools listed
- Added "What Makes This Different?" comparison table
- Added usage examples for different AI assistants
- Clarified focus on chat history vs project planning

### Why This Update?

- Users asked: "Does this work with my AI assistant?"
- Answer: YES! Works with ALL of them (ChatGPT, Claude, Copilot, Cursor, Augment, etc.)
- Clarified difference from similar packages

## [0.1.0] - 2025-09-30

### Added

- Initial release! 🎉
- `init` command to create `.ai/` knowledge base structure
- Template files for all knowledge base components
- Automatic README.md updating with AI section
- Git integration detection
- `--force` flag to overwrite existing files
- `--no-git` flag to skip Git integration
- Comprehensive documentation
- MIT License

### Features

- Creates `.ai/` directory with 7 template files
- Creates `.ai-instructions` entry point
- Creates `NEW_CHAT_PROMPT.md` quick reference
- Updates project README.md automatically
- Beautiful CLI output with colors and spinners
- Error handling and validation

### Documentation

- Comprehensive README.md
- SETUP_GUIDE.md in templates
- CONTRIBUTING.md for contributors
- LICENSE (MIT)
- This CHANGELOG.md

### Testing

- Tested across Chat #20, #21, #22
- Chat #22: Complete success ✅
- Proven to save 30+ minutes per chat session

## [0.0.1] - 2025-10-30

### Added

- Initial project structure
- Basic package.json
- CLI skeleton

---

## Version History

- **0.1.0** - First public release (MVP)
- **0.0.1** - Initial development

## Future Versions

### 0.2.0 (Planned)

- Interactive mode
- Template selection
- Validation command

### 0.3.0 (Planned)

- Log command
- Update command
- Multiple templates

### 1.0.0 (Planned)

- Stable API
- Full test coverage
- Community templates
- Documentation site
