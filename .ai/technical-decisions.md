# Technical Decisions

Document WHY you made specific technical choices.

---

## v2.0.1 Patch Release - CLI Version Detection Fix

**Date:** 2025-10-13
**Status:** ✅ Shipped

### Decision

Publish immediate patch release (v2.0.1) to fix CLI version detection path issue discovered in v2.0.0.

### Problem

After publishing v2.0.0, the CLI `--version` command was broken. The code was looking for package.json at the wrong path:

- Built file location: `dist/esm/cli.js`
- Old path: `join(__dirname, '..', 'package.json')` → `dist/package.json` ❌
- Correct path: `join(__dirname, '..', '..', 'package.json')` → `package.json` ✅

### Solution

1. **Fixed the path resolution** in `src/cli.ts`
2. **Rebuilt the package** with `npm run build`
3. **Bumped version** to 2.0.1 using `npm version patch`
4. **Published immediately** with `npm publish`
5. **Tagged and pushed** to GitHub

### Rationale

**Why immediate patch release:**

- Version detection is a core CLI feature
- Users expect `--version` to work correctly
- Quick response shows quality and responsiveness
- Follows semantic versioning best practices (patch = bugfix)

**Why not wait:**

- ❌ Waiting for next feature release is too slow for critical bugs
- ❌ Republishing v2.0.0 breaks semantic versioning
- ✅ Patch release is the correct approach

### Result

- v2.0.1 published successfully to npm
- CLI version detection works correctly
- Git tagged (v2.0.0, v2.0.1) and pushed to GitHub
- Package verified on npm registry
- Issue documented in known-issues.md

### Lessons Learned

1. **Test CLI commands after build changes** - Especially path-dependent features
2. **Verify built artifacts** - Don't assume paths work the same in source vs built
3. **Quick patches are good** - Don't be afraid to ship small fixes immediately

---

## Repository Split: Stable (v1.x) vs Experimental (v2.0.0)

**Date:** 2025-10-05
**Status:** ✅ Decided (Chat #19)

### Decision

Split project into two repositories:

- **Stable repo (this):** v1.0.5+ - Production-ready, 4,100+ users
- **Experimental repo:** v2.0.0+ - Advanced features, testing ground

### Rationale

**The core problem:**

- **4,100+ active users** depend on this package for daily work
- **Can't push unstable updates** to production users for testing
- **Innovation requires experimentation** but stability is critical

**The solution:**

- Maintain stable v1.x line here with only proven, tested features
- Develop v2.0.0 experimental version in separate repo
- Users choose: stability (v1.x) or cutting-edge (v2.0.0)

**User base context:**

- 4,100+ downloads/users actively using the tool
- Used in production environments
- Breaking changes or bugs would affect many developers
- Stability > features for this user base

### Implementation

**Stable repo (this):**

- Version: v1.0.5 (current)
- Focus: Reliability, stability, proven features only
- Commands: 14 focused, well-tested commands
- Release cycle: Conservative, thorough testing before publish
- Breaking changes: Avoided; maintain backward compatibility

**Experimental repo:**

- Version: v2.0.0
- Focus: Innovation, automation, advanced features
- Features: Multi-LLM detection, intelligent agents, automatic compression
- Release cycle: Rapid iteration, frequent updates
- Breaking changes: Acceptable; users opt-in knowing risks

### Alternatives Considered

**Option 1: Single repo with feature flags**

- **Pros:** Unified codebase, easier to maintain
- **Cons:** Complex flag management, still risks breaking stable users
- **Rejected:** Too risky for production users

**Option 2: Beta/alpha tags on same package**

- **Pros:** Single npm package, users choose via version
- **Cons:** Confusion about which version to use, accidental installs of beta
- **Rejected:** Too easy for users to accidentally get unstable version

**Option 3: Separate repos (CHOSEN)**

- **Pros:** Clear separation, safe testing ground, no risk to production
- **Cons:** Duplicate maintenance, need to sync proven features back
- **Chosen:** Best way to protect 4.1k users while innovating

### Trade-offs

**Pros:**

- ✅ Production users protected from breaking changes
- ✅ Free to experiment in v2.0.0 without consequences
- ✅ Clear messaging: "stable" vs "experimental"
- ✅ Users consciously opt-in to experimental features
- ✅ Can iterate rapidly on v2.0.0 without affecting v1.x users

**Cons:**

- ❌ Maintain two codebases
- ❌ Need to port proven v2.0.0 features back to v1.x
- ❌ Marketing/documentation complexity (two versions to explain)

### Impact

**For stable users (4,100+):**

- Guaranteed stability and reliability
- No breaking changes without major version bump
- Proven features only
- Safe for production use

**For experimental users:**

- Access to cutting-edge features
- Faster iteration and updates
- Can provide feedback on new features
- Understand they're opting into experimental software

**For the project:**

- Safe space to innovate without risk
- Clear value proposition for each version
- Build trust with production users
- Attract early adopters for v2.0.0 testing

---

## Stable Version Policy: Recommend v1.0.2; keep v1.1.0 published

**Date:** 2025-10-05
**Status:** ✅ Decided (Chat #18)

### Decision

Present v1.0.2 as the recommended stable version in documentation and badges while v1.1.0 remains published as the latest.

### Rationale

- Stability-first messaging for users
- v1.1.0 contains changes not yet fully validated for all users/workflows

### Implementation

- Pinned README badges to v1.0.2 (commit `effe92e`)
- Left `package.json` version at 1.1.0; no new publish performed
- Consider adding npm dist-tag `stable` → `v1.0.2` to align npm tooling with docs

### Alternatives Considered

- Use dynamic badges (npm latest / GitHub tag) — Rejected for now to keep messaging consistent with stability goal
- Unpublish v1.1.0 — Rejected; not advisable once published

---

## v1.0.0 Release Strategy: Dual-Format Coexistence (.ai + .aicf)

**Date:** 2025-10-03
**Status:** ✅ Decided (Chat #17)

### Decision

Released v1.0.0 with simplified 7-file .ai approach, then immediately restored .aicf files for continued parallel development. Both formats will coexist.

### Rationale

**"JSON had to coexist with XML before gaining acceptance"** - User insight on format evolution.

**v1.0.0 Simplification was necessary:**

- ✅ Provides stable, simple foundation for users
- ✅ Removes complexity barriers to adoption
- ✅ 7 essential files: README.md, conversation-log.md, technical-decisions.md, next-steps.md, project-overview.md, design-system.md, code-style.md
- ✅ Manual workflow: "ask AI to update .ai files"

**Restoring .aicf was strategic:**

- ✅ Innovation requires experimentation space
- ✅ Format evolution happens through parallel development
- ✅ Users get stability (.ai) while we iterate on optimization (.aicf)
- ✅ No need to choose - both can coexist

### Implementation

**v1.0.0 Release:**

- Updated all documentation to reflect 7-file approach
- Removed chat-finish command (replaced with manual workflow)
- Published to npm successfully
- Comprehensive CHANGELOG.md entry

**Dual-Format Restoration:**

- Brought back .aicf files alongside .ai files
- Both formats maintained in parallel
- Users can choose their preferred approach
- Continued innovation without breaking stability

### Alternatives Considered

**Option 1: Abandon .aicf entirely**

- **Rejected:** Would halt format innovation
- **Problem:** Premature optimization abandonment

**Option 2: Keep only .aicf, abandon .ai**

- **Rejected:** Too complex for v1.0.0 users
- **Problem:** Adoption barrier too high

**Option 3: Dual-format coexistence** ✅ **CHOSEN**

- **Benefits:** Stability + Innovation
- **Precedent:** JSON/XML, Markdown/HTML, REST/GraphQL

---

## v1.0.0 Release: Abandon Automated Compression, Adopt Manual AICF Writing

**Date:** 2025-10-03
**Status:** ✅ Decided (Chat #15)

### Decision

Abandon the automated compression system (multi-agent architecture with Analysis/Quality/Format agents) and adopt a manual AICF writing approach where the AI writes `.aicf/` files directly at session end.

### Rationale

**Automated compression failed quality tests:**

- Tested on 20k token conversation with 123 key terms
- 5 consecutive test runs achieved only 19-26% key term preservation (average 23%)
- Required 60%+ preservation, got less than half
- The AI couldn't determine which terms were important vs mentioned in passing
- Fundamental problem: Compression AI lacked context to make preservation decisions

**Manual approach is superior:**

- ✅ 100% preservation (AI controls what to save)
- ✅ Zero cost (no API calls)
- ✅ Instant (no processing time)
- ✅ Simple (no complex agent orchestration)
- ✅ Reliable (AI knows what's important in real-time)

**Workflow:**

1. User runs `aic chat-finish @username`
2. AI writes/updates both `.ai/` (human-readable) and `.aicf/` (AI-optimized) files
3. User reviews changes with `git diff`
4. User commits if satisfied

### Alternatives Considered

**Option 1: Keep automated compression, improve prompts**

- **Tried:** Changed "compress" to "detailed summary", adjusted token targets
- **Result:** Only improved from 27% to 32% preservation (still failed)
- **Rejected:** Fundamental problem can't be solved with better prompts

**Option 2: Use better AI models**

- **Tried:** Tested 6 models (Claude Haiku, GPT-4o Mini, GPT-5 Mini, GPT-4.1, GPT-4o, Claude Sonnet 4)
- **Result:** All failed on 20k tokens (only GPT-4o worked on 12k tokens)
- **Rejected:** Even best models can't solve the context problem

**Option 3: Manual AICF writing (CHOSEN)**

- **Pros:** 100% preservation, zero cost, instant, simple, reliable
- **Cons:** Requires AI to write files (but AI is already doing this in conversation)
- **Chosen:** Best solution for the problem

### Impact

**Code removed:**

- `src/checkpoint-agent-sdk.js` (Anthropic agent)
- `src/checkpoint-agent-openai.js` (OpenAI agent)
- `src/checkpoint-agent.js` (original agent)
- `src/checkpoint-agent-cli.js` (CLI)
- `src/checkpoint-dump.js` (dump functionality)
- 11 test files
- 2 installation scripts

**Dependencies removed:**

- `@anthropic-ai/sdk` (heavy)
- `openai` (heavy)
- `@openai/agents` (heavy)
- `dotenv` (not needed)

**Package changes:**

- Version: 0.14.1 → 1.0.0
- Size: Reduced significantly (removed heavy dependencies)
- Commands: Removed `checkpoint-dump` and `checkpoint-agent`

**Documentation added:**

- `.ai/design-system.md` - Design patterns
- `.ai/code-style.md` - Coding standards
- `.ai/project-overview.md` - High-level description
- `.aicf/README.md` - AICF format specification
- `archive/abandoned-automated-compression/README.md` - Why approach was abandoned

### Lessons Learned

1. **Test early with real data** - Should have tested 20k tokens before building full system
2. **Quality over efficiency** - 88% token reduction means nothing if 95% information is lost
3. **AI knows best in real-time** - AI writing files during conversation has full context
4. **Simple is better** - Manual approach is simpler and more reliable than complex agents
5. **User feedback is critical** - User's insight "this is not better than .md files" was correct

---

## AICF 3.0: AI-Native Memory Format

**Date:** 2025-10-02
**Status:** 🚧 In Design (Chat #13)

### Decision

Design AICF 3.0 as an AI-native memory format optimized for AI-to-AI communication, not human readability. Focus on 1:1 compression (preserving information while reducing tokens) rather than truncation.

### Rationale

**The fundamental problem with AICF 2.0:**

- AICF 2.0 used fixed field lengths (40-80 characters per field)
- This forced **truncation** (cutting off information) not **compression** (preserving information in smaller format)
- Real-world testing showed **95% information loss** when migrating complex projects
- Token reduction (88%) was solving a non-existent problem (projects using only 8.5% of context window)

**The paradigm shift:**

- User insight: "You are asking me as a human. But the AICF is file YOU need to read. You should ask yourself what you need, not what I need."
- AI should design for AI, not for humans
- Goal: Enable AI to persist memory across sessions (solve the "amnesia problem")
- Test: Can new AI read AICF and continue conversation without asking user to repeat context?

**What AI needs to persist memory:**

1. **Conversation flow** - Who said what, in what order
2. **Causal chain** - Why decisions were made (not just what)
3. **State tracking** - What's done, in progress, blocked
4. **Semantic relationships** - What affects what (explicit links)
5. **Temporal context** - What came before/after, evolution over time
6. **Checkpoint markers** - Where to resume from

### Alternatives Considered

**Option 1: Keep AICF 2.0 with fixed fields**

- **Pros:** Already implemented, simple format
- **Cons:** 95% information loss, truncates instead of compresses
- **Rejected:** Doesn't solve the core problem

**Option 2: Three-tier system (SIMPLE/COMPLEX/STRATEGIC)**

- **Pros:** Flexible, adapts to content complexity
- **Cons:** Still human-focused thinking, adds complexity
- **Rejected:** User said "I don't see a tier. There is only 1:1 compression that works for you"

**Option 3: "Jist" format (ultra-compressed)**

- **Pros:** Very small (200 tokens for 50 messages)
- **Cons:** Too compressed (50% information loss), pointers to information not information itself
- **Rejected:** User had to scroll up to remember details, meaning AI would also be missing context

**Option 4: Structured detail format (CHOSEN)**

- **Pros:** 95% compression, 30% information loss, 70% detail preserved
- **Cons:** Larger than "jist" but still very efficient
- **Chosen:** Sweet spot where new AI can continue seamlessly without scrolling up

### Trade-offs

**Pros:**

- **Zero amnesia:** New AI knows everything previous AI knew
- **Efficient:** 95% compression (10,000 tokens → 500-600 tokens)
- **Semantic:** Preserves meaning, not just words
- **Scannable:** Jump to @INSIGHTS, @DECISIONS, @STATE sections
- **Universal:** Works with all AI assistants (ChatGPT, Claude, Cursor, etc.)
- **Causal:** Preserves WHY decisions were made, not just WHAT

**Cons:**

- **Not human-optimized:** Structured data, not prose (but that's intentional)
- **Requires parsing:** AI needs to understand @SECTION format (but simple pipe-delimited)
- **30% information loss:** Not perfect 1:1, but acceptable trade-off for 95% compression

### Impact

**For AI assistants:**

- Can persist memory across sessions (solve amnesia problem)
- Can read checkpoint and continue seamlessly
- Can understand causal chain (why decisions were made)
- Can track state (what's done, in progress, blocked)

**For developers:**

- Start new chat sessions without repeating context
- AI already knows project history
- Faster onboarding (AI reads AICF, not 10,000 tokens of Markdown)
- Can verify AICF is accurate (human-readable structured data)

**For the project:**

- Positions AICF as universal AI memory standard
- Compatible with Anthropic's Memory Tool (future integration)
- Solves real problem (context persistence) not fake problem (token reduction)

---

## Every-50-Messages Checkpoint Strategy

**Date:** 2025-10-02
**Status:** 🚧 In Design (Chat #13)

### Decision

Automatically save conversation checkpoint every 50 messages to `.aicf/conversations.aicf` using structured detail format.

### Rationale

**The 5-16 hour session problem:**

- Long work sessions fill context window (200K tokens)
- Conversation gets truncated (supervisor summary kicks in)
- Detailed back-and-forth is lost
- Next session starts fresh (new AI has no memory)

**Why every 50 messages:**

- Balances granularity with token efficiency
- Not too frequent (would create too many checkpoints)
- Not too infrequent (would lose too much between checkpoints)
- Natural breakpoint for analyzing conversation flow

**Why structured detail format:**

- Preserves 70% of information (30% loss acceptable)
- Compresses 10,000 tokens → 500-600 tokens (95% compression)
- New AI can continue seamlessly without asking user to repeat
- Human can verify checkpoint is accurate

### Alternatives Considered

**Option 1: Real-time continuous saves (every decision)**

- **Pros:** Never lose important insights
- **Cons:** Too granular, hard to distinguish valuable vs. noise, token explosion
- **Rejected:** Would save too much, defeating purpose of compression

**Option 2: Context window threshold (when 80% full)**

- **Pros:** Saves before truncation happens
- **Cons:** Might be too late, doesn't help with 16-hour sessions, large batch to analyze
- **Rejected:** Too infrequent, would lose context between saves

**Option 3: Semantic triggers (when key phrases detected)**

- **Pros:** Saves only valuable information
- **Cons:** Might miss implicit insights, requires pattern matching, unreliable
- **Rejected:** Too complex, could miss important context

**Option 4: Every 50 messages (CHOSEN)**

- **Pros:** Balanced, predictable, manageable batch size
- **Cons:** Arbitrary number (but based on testing)
- **Chosen:** Best balance of granularity and efficiency

### Trade-offs

**Pros:**

- **Automatic:** No manual intervention required
- **Balanced:** Not too frequent, not too infrequent
- **Predictable:** Always happens at message 50, 100, 150, etc.
- **Manageable:** 50 messages = ~10,000 tokens → 500-600 tokens checkpoint
- **Recoverable:** If session crashes, at most 50 messages lost

**Cons:**

- **Arbitrary:** Why 50 not 40 or 60? (but based on testing)
- **Fixed:** Doesn't account for conversation density (but simple to implement)
- **Batch delay:** Waits until 50 messages before saving (but acceptable)

### Impact

**For long sessions:**

- Every 50 messages, conversation is checkpointed
- If session crashes or context fills up, checkpoint preserves memory
- New session can resume from last checkpoint

**For implementation:**

- Need message counter in chat system
- Need automatic trigger at message 50, 100, 150, etc.
- Need conversation analyzer to extract flow, insights, decisions, state
- Need append-only write to `.aicf/conversations.aicf`

---

## Structured Detail Format (@FLOW + @DETAILS + @INSIGHTS + @DECISIONS + @STATE)

**Date:** 2025-10-02
**Status:** 🚧 In Design (Chat #13)

### Decision

Use sectioned format with @FLOW (conversation flow), @DETAILS (expanded context), @INSIGHTS (key realizations), @DECISIONS (what was decided and why), and @STATE (current status).

### Rationale

**Why sectioned format:**

- **Scannable:** AI can jump to @INSIGHTS without reading entire checkpoint
- **Structured:** Each section has semantic meaning
- **Parseable:** Simple pipe-delimited data, easy to parse
- **Extensible:** Can add new sections without breaking old checkpoints

**Why these specific sections:**

- **@FLOW:** Captures who said what, in what order (conversation flow)
- **@DETAILS:** Expands on flow with full context (prevents "jist" problem)
- **@INSIGHTS:** Key realizations and discoveries (CRITICAL information)
- **@DECISIONS:** What was decided and why (causal chain)
- **@STATE:** Current status (done, in progress, blocked, next actions)

**Why pipe-delimited:**

- Simple to parse (split on `|`)
- Universal (works in all programming languages)
- Compact (no JSON overhead)
- Human-readable (can verify accuracy)

### Alternatives Considered

**Option 1: JSON format**

- **Pros:** Structured, well-supported, easy to parse
- **Cons:** Verbose (lots of `{"key": "value"}` overhead), less human-readable
- **Rejected:** Too much overhead for simple data

**Option 2: YAML format**

- **Pros:** Human-readable, structured, less verbose than JSON
- **Cons:** Whitespace-sensitive, harder to parse, not as universal
- **Rejected:** Complexity not worth the benefits

**Option 3: Inline extended format (no sections)**

- **Pros:** Simpler, all data in one place
- **Cons:** Not scannable, AI has to read entire checkpoint to find insights
- **Rejected:** Loses scannability advantage

**Option 4: Sectioned pipe-delimited (CHOSEN)**

- **Pros:** Scannable, parseable, compact, human-readable
- **Cons:** Custom format (but very simple)
- **Chosen:** Best balance of all requirements

### Trade-offs

**Pros:**

- **Scannable:** Jump to relevant section (@INSIGHTS, @DECISIONS)
- **Structured:** Each field has semantic meaning
- **Compact:** Pipe-delimited is more compact than JSON/YAML
- **Parseable:** Simple split on `|` and newlines
- **Human-readable:** Can verify checkpoint is accurate
- **Extensible:** Add new sections without breaking old checkpoints

**Cons:**

- **Custom format:** Not standard like JSON (but very simple)
- **Pipe escaping:** Need to escape `|` in content (but rare)
- **Learning curve:** AI needs to understand format (but simple)

### Impact

**Example checkpoint:**

```
@CONVERSATION:C5-CP1
timestamp_start=20251002T201500Z
timestamp_end=20251002T203000Z
messages=1-50

@FLOW
user_asked|read_anthropic_docs
ai_read|4_documents|summarized_findings
user_said|like_hybrid_approach
ai_proposed|aicf_3.0_tiers
user_corrected|design_for_ai_not_humans
ai_reframed|ai_native_format

@DETAILS:user_corrected
quote="You are asking me as a human. But the AICF is file YOU need to read."
impact=CRITICAL|fundamental_shift_in_approach
reasoning=ai_should_design_for_ai_not_humans

@INSIGHTS
aicf_truncates_not_compresses|95_percent_information_loss|CRITICAL
design_for_ai_not_humans|ai_native_format_needed|CRITICAL

@DECISIONS
reject_tier_system|human_focused_not_ai_focused|IMPACT:HIGH
adopt_ai_native_format|structured_sectioned_piped|IMPACT:CRITICAL

@STATE
working_on=aicf_3.0_design
current_phase=architecture_discussion
next_action=write_architecture_spec
blockers=none
```

---

## Reject AICF 2.0 Fixed Field Lengths

**Date:** 2025-10-02
**Status:** ✅ Decided (Chat #13)

### Decision

Abandon AICF 2.0 format with fixed field lengths (40-80 characters per field).

### Rationale

**Real-world testing revealed fatal flaw:**

- Tested AICF migration on German toy store project (complex, 5-agent architecture)
- Expected: 24 conversations, 10+ decisions
- Actual: 0 conversations extracted, 1 decision extracted
- **Result: 95% information loss**

**Root cause:**

- Fixed field lengths forced truncation, not compression
- Example: 1,800-word strategic analysis → 80 characters = lost 99% of content
- We thought we were doing 1:1 conversion, but we were just cutting off information

**Token economics:**

- Project using only 8.5% of context (17,000 / 200,000 tokens)
- AICF reduction: 17,000 → 2,000 tokens (saved 15,000 tokens = 7.5% of context)
- **Cost: 95% information loss for 7.5% token savings**
- Solving non-existent problem (no token pressure) while creating real problem (information loss)

### Alternatives Considered

**Option 1: Keep AICF 2.0, increase field lengths**

- **Pros:** Simple fix, backward compatible
- **Cons:** Still truncation, just at higher threshold
- **Rejected:** Doesn't solve fundamental problem

**Option 2: Keep AICF 2.0, add overflow fields**

- **Pros:** Preserves existing format, adds capacity
- **Cons:** Complex, defeats purpose of fixed format
- **Rejected:** Band-aid on broken design

**Option 3: Complete redesign (CHOSEN)**

- **Pros:** Solves root cause, enables true compression
- **Cons:** Breaking change, need migration path
- **Chosen:** Only way to achieve 1:1 compression goal

### Trade-offs

**Pros:**

- **Honest assessment:** Admit AICF 2.0 doesn't work
- **Clean slate:** Design from first principles
- **Right goal:** Information fidelity over token reduction
- **Learn from mistakes:** Document what went wrong

**Cons:**

- **Breaking change:** Existing users need to migrate (but few users exist)
- **Wasted effort:** AICF 2.0 development was learning, not waste
- **Delayed release:** Need to redesign before v1.0

### Impact

- AICF 2.0 marked as deprecated
- Focus shifts to AICF 3.0 design
- Lesson learned: Test with real, complex data before claiming success
- Lesson learned: Token reduction ≠ Better memory

---

## Per-Project Configuration Storage

**Date:** 2025-10-01
**Status:** ✅ Implemented (v0.7.0)

### Decision

Store configuration in `.ai/config.json` (per-project) instead of global config in `~/.aic/config.json`.

### Rationale

- Different projects may use different AI models
- Configuration should be part of the project's knowledge base
- Allows team members to share configuration via Git
- Keeps all AI-related settings in one place (`.ai/` directory)

### Alternatives Considered

- **Global config in `~/.aic/config.json`:** Would apply to all projects, but doesn't allow per-project customization
- **Environment variables:** Less user-friendly, harder to discover and manage
- **Command-line flags:** Would require passing flags every time, not persistent

### Trade-offs

**Pros:**

- Per-project flexibility (different models for different projects)
- Configuration is version-controlled with the project
- Team members can share preferred settings
- All AI context in one place (`.ai/` directory)

**Cons:**

- Need to configure each project separately
- Configuration not shared across projects (but this is actually a feature)

### Impact

- Users can set different preferred models for different projects
- Configuration is stored in `.ai/config.json` alongside knowledge base
- Teams can commit configuration to Git for consistency

---

## Simplified Token Report (Show 4 Models by Default)

**Date:** 2025-10-01
**Status:** ✅ Implemented (v0.7.0)

### Decision

Show only 4 AI models by default in token reports (preferred model + top 3 popular), with `--all` flag to show all 16.

### Rationale

- Showing 16 models was overwhelming for most users
- Most users only care about 1-2 models they actually use
- Cleaner output improves user experience
- Power users can still see all models with `--all` flag

### Alternatives Considered

- **Show all 16 models always:** Too overwhelming, cluttered output
- **Show only 1 model (preferred):** Too limited, users want to compare a few options
- **Make it configurable (showAllModels setting):** Added this as well for flexibility

### Trade-offs

**Pros:**

- Cleaner, less overwhelming output
- Focuses on what users actually need
- Still accessible via `--all` flag
- Adapts to user's preferred model

**Cons:**

- Users need to know about `--all` flag to see all models
- Might miss discovering other models

### Impact

- Default `npx aic tokens` shows 4 models
- Preferred model always included and marked with ⭐
- Hint message tells users about `--all` flag
- Much better user experience

---

## Star (⭐) for Preferred Model

**Date:** 2025-10-01
**Status:** ✅ Implemented (v0.7.0)

### Decision

Mark preferred model with ⭐ star prefix in token reports.

### Rationale

- Visual indicator makes it easy to spot your model
- Works in all terminals (unlike color highlighting)
- Simple and universally understood symbol
- Doesn't interfere with existing formatting

### Alternatives Considered

- **Color highlighting:** Doesn't work well in all terminals, less accessible
- **Bold text:** Less visually distinct
- **Arrow (→):** Less intuitive than star
- **Checkmark (✓):** Could be confused with "completed" status

### Trade-offs

**Pros:**

- Clear visual indicator
- Works in all terminals
- Universally understood
- Simple to implement

**Cons:**

- Adds one extra character to line length
- None really - this was a clear win

### Impact

- Users can immediately spot their preferred model
- Makes token reports more personalized
- Improves user experience

---

## Conversation Entry Counting Regex

**Date:** 2025-10-01
**Status:** ✅ Implemented (v0.6.5)

### Decision

Changed regex from `/^## Chat #\d+/gm` to `/^##.*Chat\s*#?\d+/gim` for counting conversation entries.

### Rationale

- Original regex only matched "Chat #" at start of line
- Users have different formats: `## 2025-09-30 - Chat #19: Topic`
- Need to support multiple conversation log formats
- More flexible regex supports all common formats

### Alternatives Considered

- **Strict format enforcement:** Would require users to change their existing logs
- **Multiple regex patterns:** More complex, harder to maintain
- **Parse markdown AST:** Overkill for this simple task

### Trade-offs

**Pros:**

- Works with all common conversation log formats
- No breaking changes for existing users
- More flexible and forgiving

**Cons:**

- Slightly more complex regex
- Could match false positives (but unlikely in practice)

### Impact

- Stats command now correctly counts conversation entries
- Works with date-first format: `## 2025-09-30 - Chat #19`
- Works with original format: `## Chat #19`
- Works with format without #: `## Chat 19`

---

## Comprehensive Documentation Files

**Date:** 2025-10-01
**Status:** ✅ Implemented (v0.8.0)

### Decision

Create separate COMMANDS.md and CONFIGURATION.md files instead of putting everything in README.

### Rationale

- README was getting too long and overwhelming
- Users need detailed reference documentation
- Separate files allow deep-dive without cluttering README
- Better organization and discoverability

### Alternatives Considered

- **Put everything in README:** Would be 2000+ lines, overwhelming
- **Wiki pages:** Requires separate maintenance, not in repo
- **Separate docs/ directory:** Less discoverable than root-level files
- **Online documentation site:** More overhead, not version-controlled with code

### Trade-offs

**Pros:**

- Clear separation of concerns (overview vs reference)
- README stays concise and approachable
- Detailed docs available when needed
- All documentation version-controlled with code
- Easy to link to specific sections

**Cons:**

- More files to maintain
- Users need to know about these files (solved with links in README)

### Impact

- README.md: Quick start and overview (150 lines)
- COMMANDS.md: Complete command reference (600+ lines)
- CONFIGURATION.md: Detailed configuration guide (350+ lines)
- Total: 950+ lines of professional documentation
- Much better user experience

---

## Template for New Decisions

```markdown
## [Decision Name]

**Date:** [Date]
**Status:** [Status]

### Decision

[What you decided]

### Rationale

[Why]

### Alternatives Considered

- **[Alternative]:** [Why not]

### Trade-offs

**Pros:**

- [Pro]

**Cons:**

- [Con]

### Impact

- [Impact]
```

---

**Last Updated:** 2025-10-01
