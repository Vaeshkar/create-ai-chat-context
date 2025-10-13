# Modernization Plan - create-ai-chat-context v2.0.0

## 🎯 Goal
Rebuild with October 2025 standards - TypeScript, ESM, modern tooling.
**"Small things, with love"** - Focus on 4 core commands done properly.

## 📦 What We're Keeping

### Core Commands (4)
1. **init** - Initialize .ai/ and .aicf/ folders
2. **migrate** - Upgrade existing installations
3. **tokens** - Show token usage analysis
4. **stats** - Show knowledge base statistics

### Templates (1)
- **ai** - Generic template only (the one currently in `templates/ai/`)

## 🗑️ What We're Benching

### Commands (Moved to experimental/future)
- chatgpt, claude, copilot, cursor, gemini, warp (AI-specific)
- search, log, validate, check, config (nice-to-have)

### Templates (31)
- All language-specific templates (can add back later incrementally)

## 🏗️ New Structure

```
create-ai-chat-context/
├── src/
│   ├── commands/
│   │   ├── init.ts           # Initialize project
│   │   ├── migrate.ts        # Migrate existing
│   │   ├── tokens.ts         # Token analysis
│   │   └── stats.ts          # Statistics
│   ├── core/
│   │   ├── filesystem.ts     # File operations
│   │   ├── templates.ts      # Template handling
│   │   └── detect.ts         # Project detection
│   ├── types/
│   │   ├── index.ts          # Shared types
│   │   ├── commands.ts       # Command types
│   │   └── errors.ts         # Error types
│   ├── utils/
│   │   ├── logger.ts         # Console output
│   │   └── spinner.ts        # Progress indicators
│   ├── cli.ts                # CLI entry point
│   └── index.ts              # Public API
├── templates/
│   └── ai/                   # Single generic template
│       ├── README.md
│       ├── conversation-log.md
│       ├── technical-decisions.md
│       ├── next-steps.md
│       ├── design-system.md
│       ├── code-style.md
│       └── project-overview.md
├── tests/
│   ├── commands/
│   │   ├── init.test.ts
│   │   ├── migrate.test.ts
│   │   ├── tokens.test.ts
│   │   └── stats.test.ts
│   └── core/
│       ├── filesystem.test.ts
│       └── templates.test.ts
├── dist/                     # Build output (gitignored)
│   ├── esm/                  # ESM build
│   └── cjs/                  # CJS build (for compatibility)
├── package.json              # "type": "module"
├── tsconfig.json             # Strict TypeScript
├── tsconfig.cjs.json         # CJS build config
├── vitest.config.ts          # Testing
├── eslint.config.js          # Linting
└── README.md
```

## 🔧 Technology Stack

### Core
- **TypeScript 5.0+** with strict mode
- **ESM modules** (`"type": "module"`)
- **Node.js 20+** (LTS)

### Build
- **tsup** - Fast TypeScript bundler (ESM + CJS)
- Dual exports (ESM primary, CJS for compatibility)

### Testing
- **Vitest** - Fast, modern test runner
- Unit tests for all functions
- Integration tests for commands

### CLI
- **commander** - Keep it (modern, well-maintained)
- **chalk** - Keep it (but import ESM version)
- **ora** - Keep it (but import ESM version)

### Linting/Formatting
- **ESLint 9** with TypeScript support
- **Prettier** for formatting

## 📝 Implementation Steps

### Phase 1: Foundation (Day 1)
1. ✅ Create new branch `v2-modernization`
2. ✅ Set up TypeScript config (strict mode)
3. ✅ Set up build system (tsup)
4. ✅ Set up testing (Vitest)
5. ✅ Create type definitions

### Phase 2: Core Utilities (Day 1-2)
1. ✅ `src/types/` - All TypeScript types
2. ✅ `src/utils/logger.ts` - Console output
3. ✅ `src/core/filesystem.ts` - File operations
4. ✅ `src/core/templates.ts` - Template handling
5. ✅ Write tests for each

### Phase 3: Commands (Day 2-3)
1. ✅ `src/commands/init.ts` - Rewrite with types
2. ✅ `src/commands/tokens.ts` - Rewrite with types
3. ✅ `src/commands/stats.ts` - Rewrite with types
4. ✅ `src/commands/migrate.ts` - Rewrite with types
5. ✅ Write tests for each command

### Phase 4: CLI (Day 3)
1. ✅ `src/cli.ts` - Modern CLI with commander
2. ✅ Test CLI integration
3. ✅ Update bin/cli.js to point to dist

### Phase 5: Documentation & Release (Day 4)
1. ✅ Update README.md
2. ✅ Update CHANGELOG.md
3. ✅ Test npm pack
4. ✅ Release v2.0.0

## 🎯 Success Criteria

### Code Quality
- ✅ 100% TypeScript (no .js files in src/)
- ✅ No `any` types (strict mode)
- ✅ All functions under 50 lines
- ✅ All functions have tests
- ✅ ESLint passes with no warnings

### Functionality
- ✅ `aic init` creates .ai/ and .aicf/ folders
- ✅ `aic migrate` upgrades existing installations
- ✅ `aic tokens` shows accurate token counts
- ✅ `aic stats` shows knowledge base statistics
- ✅ Works on Node 20+
- ✅ Dual ESM/CJS exports work

### User Experience
- ✅ Clear error messages
- ✅ Progress indicators for long operations
- ✅ Helpful output formatting
- ✅ Fast execution (< 1s for most commands)

## 📊 Comparison

### Before (v1.0.7)
- 18 source files (CommonJS)
- 14 commands
- 32 templates
- No tests
- No types
- 521KB package size

### After (v2.0.0)
- ~15 source files (TypeScript/ESM)
- 4 commands (focused)
- 1 template (expandable)
- Full test coverage
- Strict types
- ~150KB package size (estimated)

## 🚀 Future Additions (v2.1+)

Once core is solid, add back incrementally:
- v2.1: Add `search` command
- v2.2: Add `log` command  
- v2.3: Add language-specific templates (one at a time)
- v2.4: Add AI-specific commands (if needed)

**Each addition:**
- Must have tests
- Must maintain type safety
- Must be documented
- Must be reviewed

## 💡 Key Principles

1. **Small things with love** - Do 4 commands perfectly, not 14 poorly
2. **Type safety** - No `any`, proper error types
3. **Testability** - Every function is testable
4. **Modern standards** - October 2025 best practices
5. **Incremental growth** - Add features one at a time

---

**Ready to start?** Let's begin with Phase 1: Foundation.

