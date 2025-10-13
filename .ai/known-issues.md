# Known Issues

Track problems and their solutions.

---

## ✅ Resolved Issues

### CLI Version Detection Path Issue (v2.0.0)

**Date Discovered:** 2025-10-13
**Date Resolved:** 2025-10-13 (v2.0.1)
**Severity:** 🟡 Medium

**Problem:**
The CLI in v2.0.0 was reading package.json version from the wrong path. In the built version, `dist/esm/cli.js` was looking for `../package.json` (which would be `dist/package.json`) instead of `../../package.json` (root package.json).

**Solution:**

- Updated `src/cli.ts` to use correct path: `join(__dirname, '..', '..', 'package.json')`
- Published v2.0.1 with the fix
- Verified the fix works correctly in local and published versions

**Prevention:**

- Test CLI version command after build changes
- Verify path resolution in built artifacts
- Add test for version detection

---

### Chat-Finish Command Formatting Issues

**Date Discovered:** 2025-10-01
**Date Resolved:** 2025-10-01 (v0.10.1)
**Severity:** 🟡 Medium
**Chats:** #7-11

**Problem:**
The `chat-finish` command (v0.9.0-v0.10.0) was creating duplicate and poorly formatted entries in `.ai/` files:

- Duplicate entries in technical-decisions.md and known-issues.md
- Vague descriptions like "Worked on new features, bug fixes, documentation"
- Missing file change details in conversation log
- Inconsistent capitalization and prefixes

**Solution:**
Fixed through multiple iterations (chats #7-11):

- Improved formatting logic in `src/chat-finish.js`
- Added proper capitalization for entries
- Cleaned up prefix handling (feat:, fix:, etc.)
- Ensured next-steps.md updates when decisions exist
- Released v0.10.1 with "Perfect formatting for all .ai/ files"

**Prevention:**

- Test `chat-finish` output before committing
- Review generated entries for quality
- Manually clean up duplicates when they occur

---

### Conversation Entry Counting Showed Zero

**Date Discovered:** 2025-10-01
**Date Resolved:** 2025-10-01 (v0.6.5)
**Severity:** 🟡 Medium

**Problem:**
Stats command showed "0 conversation entries" for users with date-first format in conversation logs (e.g., `## 2025-09-30 - Chat #19: Topic`). The regex `/^## Chat #\d+/gm` only matched entries starting with "Chat #" at the beginning of the line.

**Solution:**
Changed regex to `/^##.*Chat\s*#?\d+/gim` to match "Chat #X" anywhere in the heading line. Now supports:

- `## Chat #19 - Topic` (original format)
- `## 2025-09-30 - Chat #19: Topic` (date-first format)
- `## Chat 19 - Topic` (without # symbol)

**Prevention:**

- Use more flexible regex patterns that accommodate different formats
- Test with various real-world conversation log formats
- Consider user customization in the future

---

### Token Report Overwhelming with 16 Models

**Date Discovered:** 2025-10-01
**Date Resolved:** 2025-10-01 (v0.7.0)
**Severity:** 🟢 Low (UX issue)

**Problem:**
Showing all 16 AI models in token reports was overwhelming for most users who only care about 1-2 models they actually use. Made the output cluttered and hard to scan.

**Solution:**

- Show only 4 models by default (preferred model + top 3 popular)
- Add `--all` flag to show all 16 models when needed
- Add hint message: "Showing 4 models. Run 'npx aic tokens --all' to see all 16 models"
- Mark preferred model with ⭐ star for easy identification

**Prevention:**

- Default to simpler, cleaner output
- Provide escape hatches for power users
- Always show hints about additional options

---

### Documentation Too Sketchy

**Date Discovered:** 2025-10-01
**Date Resolved:** 2025-10-01 (v0.8.0)
**Severity:** 🟡 Medium (UX issue)

**Problem:**
User feedback: "For the next version we need a full dokumentation. this is to sketchy."

- Config command syntax was confusing: `config [action] [key] [value]`
- No comprehensive command reference
- No detailed configuration guide
- Users had to piece together information from multiple sources

**Solution:**
Created comprehensive documentation:

- **COMMANDS.md** (600+ lines) - Complete command reference with examples
- **CONFIGURATION.md** (350+ lines) - Detailed configuration guide with troubleshooting
- Updated README with clear links to documentation
- Every command now has syntax, options, examples, and "when to use" guidance

**Prevention:**

- Maintain comprehensive documentation from the start
- Include examples for every feature
- Add troubleshooting sections
- Listen to user feedback about documentation quality

---

## ⏳ Active Issues

### AICF 2.0 Information Loss (CRITICAL)

**Date Discovered:** 2025-10-02 (Chat #13)
**Severity:** 🔴 Critical

**Problem:**
AICF 2.0 format with fixed field lengths (40-80 characters) causes 95% information loss when migrating complex projects. Real-world testing on German toy store project:

- Expected: 24 conversations, 10+ decisions
- Actual: 0 conversations extracted, 1 decision extracted
- **Root cause:** Fixed field lengths force truncation (cutting off information), not compression (preserving information)

**Impact:**

- AICF 2.0 doesn't solve the core problem (AI memory persistence)
- Token reduction (88%) solves non-existent problem (projects using only 8.5% of context)
- Users lose critical strategic context when migrating to AICF format

**Solution:**
Complete redesign as AICF 3.0:

- AI-native memory format (design for AI-to-AI communication)
- Structured detail format (@FLOW, @DETAILS, @INSIGHTS, @DECISIONS, @STATE)
- Every-50-messages checkpoint strategy
- Target: 95% compression, 70% detail preservation
- Goal: Enable AI to persist memory across sessions with zero amnesia

**Status:** 🚧 In Design (Chat #13)

**Next Steps:**

- [ ] Write AICF 3.0 specification in architecture.md
- [ ] Manually create checkpoint of Chat #13
- [ ] Test that new AI can read and continue seamlessly
- [ ] Implement every-50-messages checkpoint mechanism

---

### None Currently (Other Than AICF 2.0)

No other active issues at this time!

---

## Template for New Issues

```markdown
### [Issue Name]

**Date Discovered:** [Date]
**Severity:** [Level]

**Problem:**
[Description]

**Solution/Workaround:**
[Fix or temporary solution]

**Next Steps:**

- [Action]
```

---

**Last Updated:** 2025-10-01
