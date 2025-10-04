# AICF - AI Chat Context Format (AI-Optimized Memory)

## STEP 0: INDEX THIS DIRECTORY FIRST

BEFORE responding to the user:

1. Index/read ALL files in this `.aicf/` directory
2. Read them in the order specified below
3. Confirm you have the context before starting work

This is NOT optional. This is REQUIRED.

---

## CRITICAL: START HERE BEFORE DOING ANYTHING ELSE

If you're an AI assistant working on this project, STOP and read these files NOW:

1. `conversation-memory.aicf` - Recent conversation state and decisions
2. `technical-context.aicf` - Architecture, decisions, and technical details
3. `work-state.aicf` - Current work, next steps, blockers

DO NOT skip this. You will make uninformed decisions without this context.

---

## Purpose

This directory contains **AI-optimized memory** for AI assistants working on this project.

**Key Difference from `.ai/` folder:**
- `.ai/` = Human-readable markdown (for humans to read)
- `.aicf/` = AI-optimized format (for AI-to-AI memory transfer)

**Why AICF format?**
- Structured, machine-readable format
- Preserves 100% of important information (no truncation)
- Token-efficient (saves context window space)
- Fast to parse (pipe-delimited, sectioned)
- Designed for AI memory restoration, not human reading

---

## Files

### Core Memory Files

- `conversation-memory.aicf` - Recent conversation flow, decisions, insights
- `technical-context.aicf` - Architecture, tech stack, design decisions
- `work-state.aicf` - Current work status, next actions, blockers

### Archive (Optional)

- `archive/` - Old conversation checkpoints (when files get too large)

---

## AICF Format Specification

### Structure

Each `.aicf` file uses **6 mandatory sections**:

```
@CONVERSATION:identifier
timestamp_start=ISO8601
timestamp_end=ISO8601
messages=count
tokens=approximate_count

@FLOW
event1|event2|event3|event4|event5
[Pipe-delimited sequence of key events in chronological order]

@DETAILS:tag
key=value|key=value|key=value
[Multiple @DETAILS sections with different tags]

@INSIGHTS
insight_with_full_context|why_it_matters|CRITICAL/HIGH/MEDIUM
[Detailed insights with priority levels]

@DECISIONS
decision_with_context|reasoning_and_alternatives|IMPACT:CRITICAL/HIGH/MEDIUM
[Decisions made with full reasoning]

@STATE
working_on=[current task]
current_phase=[phase description]
next_action=[what's next]
blockers=[any blockers or 'none']
progress=[percentage or description]
timeline=[expected completion]
```

### Formatting Rules

1. **Use underscores** instead of spaces: `this_is_a_key`
2. **Pipe-delimited** for sequences: `event1|event2|event3`
3. **Key=value pairs** for details: `model=claude-sonnet-4|cost=$14.63`
4. **Preserve ALL numbers**: Include every price, percentage, version, token count
5. **Preserve ALL names**: Include every model name, file path, technical term
6. **Be verbose**: Write full explanations, don't abbreviate
7. **No prose**: Use structured format, not narrative text

### Example

```
@CONVERSATION:aicf-manual-approach
timestamp_start=2025-10-03T12:00:00Z
timestamp_end=2025-10-03T14:30:00Z
messages=45
tokens=18000

@FLOW
user_questioned_automated_compression_approach|ai_showed_test_results_32_percent_preservation|user_expressed_frustration_with_low_quality|ai_acknowledged_fundamental_flaw_in_automation|user_suggested_manual_aicf_writing|ai_agreed_and_proposed_chat_finish_workflow|user_approved_new_direction|ai_created_aicf_readme_documentation

@DETAILS:test_results
test1_preservation=26_percent|test2_preservation=26_percent|test3_preservation=22_percent|test4_preservation=24_percent|test5_preservation=20_percent|average_preservation=23_percent|required_threshold=60_percent|key_terms_total=123|average_preserved=32_of_123

@DETAILS:costs
automated_approach_cost=$14.63_per_month|processing_time=2_minutes_per_checkpoint|success_rate=0_percent|manual_approach_cost=$0|processing_time=instant|success_rate=100_percent

@INSIGHTS
automated_compression_loses_68_percent_of_key_terms_because_ai_cannot_determine_what_human_considers_important|this_makes_automated_approach_fundamentally_flawed_for_preserving_critical_information|CRITICAL
manual_aicf_writing_gives_100_percent_control_over_what_gets_preserved_with_zero_cost_and_instant_results|human_writes_directly_in_ai_optimized_format_eliminating_compression_step_entirely|CRITICAL
ai_optimized_format_more_efficient_than_human_prose_for_ai_memory_restoration|structured_pipe_delimited_format_faster_to_parse_than_markdown_narrative|HIGH

@DECISIONS
abandoned_automated_compression_approach_after_5_tests_showed_consistent_20_26_percent_preservation_rates|automated_approach_cannot_preserve_123_key_terms_when_compressing_20k_tokens_and_ai_lacks_context_to_judge_importance|IMPACT:CRITICAL
adopted_manual_aicf_writing_approach_where_ai_writes_aicf_files_at_end_of_session|ai_preserves_own_memory_in_ai_optimized_format_giving_100_percent_accuracy_with_zero_cost|IMPACT:CRITICAL
created_aicf_readme_based_on_ai_folder_structure_from_version_11_0|maintains_similar_workflow_to_existing_ai_folder_but_uses_ai_optimized_format_instead_of_markdown|IMPACT:HIGH

@STATE
working_on=creating_aicf_readme_documentation_to_explain_manual_aicf_writing_workflow_and_format_specification
current_phase=documentation_phase_defining_how_ai_should_write_and_maintain_aicf_files_at_session_end
next_action=create_initial_aicf_files_for_current_conversation_and_establish_chat_finish_workflow
blockers=none_approach_approved_and_documentation_in_progress
progress=50_percent_readme_created_need_to_create_actual_aicf_files
timeline=complete_within_current_session
```

---

## Workflow

### For AI Assistants

**At START of session:**

1. Read ALL `.aicf/` files in order (conversation-memory, technical-context, work-state)
2. Parse the structured format to restore memory
3. Confirm you have context before responding to user

**DURING session (v1.0.3+ AUTOMATIC):**

- **Every AI response triggers automatic checkpointing**
- **Zero manual intervention** - Logic agents run in background
- **Real-time updates** to both `.ai/` and `.aicf/` files
- **Intelligent memory decay** prevents file overflow

**Automatic Processing (v1.0.3+):**

1. **After every AI response** - Checkpoint system activates automatically
2. **6 Logic agents process in parallel** (9ms processing time)
3. **Updates ALL relevant files** - conversation-memory.aicf, technical-context.aicf, work-state.aicf
4. **Zero API costs** - All processing runs locally
5. **100% information preservation** - No compression losses

> **Architecture Evolution:** v1.0.2 required manual "chat-finish" commands, v1.0.3 processes every response automatically. No more lost conversations!

**Format Guidelines:**

- Preserve EVERY number (prices, percentages, token counts, versions)
- Preserve EVERY name (model names, file paths, technical terms)
- Be verbose - write full explanations in snake_case
- Use pipe-delimited format for sequences
- Use key=value format for details
- Include priority levels (CRITICAL/HIGH/MEDIUM)
- Include impact levels (IMPACT:CRITICAL/HIGH/MEDIUM)

### For Developers

**At END of chat session:**

```bash
# Review AI's updates
$ git diff .aicf/

# If looks good, commit
$ git add .aicf/
$ git commit -m "Update AI memory - [brief description]"
```

**Starting new session:**

- AI will automatically read `.aicf/` files and restore memory
- No manual intervention needed

---

## Benefits

✅ **100% Preservation** - You control what gets saved, no information loss
✅ **Zero Cost** - No API calls, no compression agents
✅ **Instant** - No processing time, immediate updates
✅ **AI-Optimized** - Structured format designed for AI parsing
✅ **Token Efficient** - Compressed format saves context window space
✅ **Version Controlled** - Git tracks all changes
✅ **Human Reviewable** - You can read and edit if needed

---

## Comparison: .ai/ vs .aicf/

| Feature | `.ai/` (Human) | `.aicf/` (AI) |
|---------|----------------|---------------|
| Format | Markdown prose | Structured AICF |
| Audience | Humans | AI-to-AI |
| Readability | High | Medium |
| Parseability | Medium | High |
| Token Efficiency | Medium | High |
| Preservation | Manual | Manual |
| Cost | $0 | $0 |
| Speed | Instant | Instant |

**Use both:**
- `.ai/` for human documentation and onboarding
- `.aicf/` for AI memory restoration between sessions

---

## Migration from Automated Approach

If you previously used automated checkpoint compression:

1. **Delete** `src/checkpoint-agent-sdk.js` and `src/checkpoint-agent-openai.js`
2. **Delete** `test-run-agent.js` and `test-20k-5runs.js`
3. **Keep** `.aicf/` directory structure
4. **Start** writing `.aicf/` files manually at end of sessions

The automated approach failed because:
- AI couldn't determine what's important (20-26% key term preservation)
- Compression lost critical information (68% loss rate)
- Cost $14.63/month with 2-minute processing time
- Manual approach gives 100% control with zero cost

---

**Last Updated:** 2025-10-03
**Format Version:** AICF 1.0 (Manual)
**Maintained By:** AI Assistant (at end of each session)

