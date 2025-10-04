/**
 * AICF Migration Tool
 * Converts .ai/ directory to .aicf/ format
 */

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { writeAICF } = require("./aicf-compiler");

/**
 * Convert conversation-log.md to conversations.aicf
 */
async function convertConversationLog(aiDir) {
  const logPath = path.join(aiDir, "conversation-log.md");
  if (!(await fs.pathExists(logPath))) return null;

  const content = await fs.readFile(logPath, "utf8");
  const entries = [];

  // Parse entries (supports AICF 1.0, YAML, and structured Markdown)
  const lines = content.split("\n");
  let chatNumber = 0;

  // Handle structured markdown format
  const sections = content.split(/^## Chat #/m).filter(s => s.trim());
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    const lines = section.split("\n");
    let chatNum = "";
    let date = "";
    let topic = "";
    let what = "";
    let why = "";
    let outcome = "";
    
    // Extract chat number from first line
    const firstLine = lines[0].trim();
    const chatMatch = firstLine.match(/^(\d+)/);
    if (chatMatch) {
      chatNum = chatMatch[1];
      chatNumber = parseInt(chatNum);
    } else {
      chatNumber++;
      chatNum = chatNumber.toString();
    }
    
    // Parse structured content
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("**Date:**")) {
        date = trimmed.replace("**Date:**", "").trim();
      } else if (trimmed.startsWith("**Topic:**")) {
        topic = trimmed.replace("**Topic:**", "").trim();
      } else if (trimmed.startsWith("**What:**")) {
        what = trimmed.replace("**What:**", "").trim();
      } else if (trimmed.startsWith("**Why:**")) {
        why = trimmed.replace("**Why:**", "").trim();
      } else if (trimmed.startsWith("**Outcome:**")) {
        outcome = trimmed.replace("**Outcome:**", "").trim();
      }
    }
    
    // Only add if we have meaningful content and avoid duplicates
    if (topic || what || why || outcome) {
      const timestamp = date ? date.replace(/-/g, "") + "T120000Z" : new Date().toISOString().replace(/\.\d{3}/, "");
      
      // Check for duplicates by topic + what combination
      const isDuplicate = entries.some(entry => 
        entry.TOPIC === topic.substring(0, 80) && 
        entry.WHAT === what.substring(0, 100)
      );
      
      if (!isDuplicate) {
        // Calculate confidence and impact based on content richness
        const contentLength = (topic + what + why + outcome).length;
        const confidence = contentLength > 200 ? "9" : contentLength > 100 ? "8" : "7";
        const impact = topic.toLowerCase().includes("aicf") || topic.toLowerCase().includes("schema") ? "8" : "6";
        
        entries.push({
          "C#": chatNum,
          TIMESTAMP: timestamp,
          TYPE: "W", // Work session
          TOPIC: topic.substring(0, 80),
          WHAT: what.substring(0, 100),
          WHY: why.substring(0, 100),
          OUTCOME: outcome.substring(0, 120),
          FILES: "", // Could be enhanced to extract file references
          CONTEXT_REFS: "", // Could be enhanced to find cross-references
          CONFIDENCE: confidence,
          IMPACT_SCORE: impact,
        });
      } else {
        console.log(chalk.gray(`    [SKIP] Duplicate conversation: ${topic.substring(0, 30)}...`));
      }
    }
  }
  
  // Fallback: Handle AICF 1.0 pipe-separated format if no structured content found
  if (entries.length === 0) {
    for (const line of lines) {
      if (/^\d+\|/.test(line)) {
        const parts = line.split("|");
        if (parts.length >= 7) {
          chatNumber = parseInt(parts[0]);
          const timestamp = parts[1].includes("T")
            ? parts[1]
            : parts[1] + "T120000Z";
          entries.push({
            "C#": parts[0],
            TIMESTAMP: timestamp,
            TYPE: parts[2] || "W",
            TOPIC: (parts[3] || "").substring(0, 80),
            WHAT: (parts[4] || "").substring(0, 100),
            WHY: (parts[5] || "").substring(0, 100),
            OUTCOME: (parts[6] || "").substring(0, 120),
            FILES: parts[7] || "",
            CONTEXT_REFS: parts[8] || "",
            CONFIDENCE: parts[9] || "8",
            IMPACT_SCORE: parts[10] || "5",
          });
        }
      }
    }
  }

  return {
    schema: [
      "C#",
      "TIMESTAMP",
      "TYPE",
      "TOPIC", // 80 chars - Enhanced for complex topics
      "WHAT", // 100 chars - Actions and changes
      "WHY", // 100 chars - Reasoning and context
      "OUTCOME", // 120 chars - Enhanced for detailed results
      "FILES", // File references
      "CONTEXT_REFS", // Links to related conversations/decisions
      "CONFIDENCE", // Information certainty (1-10)
      "IMPACT_SCORE", // Relative importance (1-10)
    ],
    entries,
    links: [],
  };
}

/**
 * Convert technical-decisions.md to decisions.aicf
 */
async function convertTechnicalDecisions(aiDir) {
  const filePath = path.join(aiDir, "technical-decisions.md");
  if (!(await fs.pathExists(filePath))) {
    console.log(chalk.gray(`    [DEBUG] File not found: ${filePath}`));
    return null;
  }

  const content = await fs.readFile(filePath, "utf8");
  const entries = [];
  const sections = content.split(/^## /m).filter((s) => s.trim());
  console.log(
    chalk.gray(
      `    [DEBUG] Found ${sections.length} sections in technical-decisions.md`
    )
  );

  let id = 1;
  for (const section of sections) {
    if (
      section.startsWith("#") ||
      section.includes("IMPORTANT FOR AI") ||
      section.includes("Template")
    )
      continue;

    const lines = section.split("\n");
    const title = lines[0].trim().substring(0, 60);
    console.log(
      chalk.gray(`    [DEBUG] Processing section: ${title.substring(0, 30)}...`)
    );

    let decision = "";
    let rationale = "";
    let impact = "";
    let status = "ACTIVE";
    let timestamp = new Date().toISOString().replace(/\.\d{3}/, "");

    // Parse the section
    let inDecisionSection = false;
    let inRationaleSection = false;
    let inImpactSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Extract date
      if (line.includes("**Date:**")) {
        const dateStr = line.split("**Date:**")[1].trim();
        timestamp = dateStr.replace(/-/g, "") + "T120000Z";
      }

      // Extract status
      if (line.includes("**Status:**")) {
        const statusStr = line.split("**Status:**")[1].trim();
        if (statusStr.includes("Implemented")) {
          status = "IMPLEMENTED";
        }
      }

      // Track sections
      if (line === "### Decision") {
        inDecisionSection = true;
        inRationaleSection = false;
        inImpactSection = false;
        continue;
      } else if (line === "### Rationale") {
        inDecisionSection = false;
        inRationaleSection = true;
        inImpactSection = false;
        continue;
      } else if (line === "### Impact") {
        inDecisionSection = false;
        inRationaleSection = false;
        inImpactSection = true;
        continue;
      } else if (line.startsWith("###")) {
        inDecisionSection = false;
        inRationaleSection = false;
        inImpactSection = false;
        continue;
      }

      // Collect content
      if (inDecisionSection && line && !line.startsWith("#")) {
        decision += (decision ? " " : "") + line;
      } else if (
        inRationaleSection &&
        line &&
        !line.startsWith("#") &&
        !line.startsWith("-")
      ) {
        rationale += (rationale ? " " : "") + line;
      } else if (
        inImpactSection &&
        line &&
        !line.startsWith("#") &&
        !line.startsWith("-")
      ) {
        impact += (impact ? " " : "") + line;
      }
    }

    if (title && decision) {
      console.log(
        chalk.gray(`    [DEBUG] ✓ Added decision: ${title.substring(0, 30)}`)
      );
      entries.push({
        "D#": id.toString(),
        TIMESTAMP: timestamp,
        TITLE: title.substring(0, 80), // Enhanced from 60
        DECISION: decision.substring(0, 120), // Enhanced from 100
        RATIONALE: rationale.substring(0, 120), // Enhanced from 100
        IMPACT: impact.substring(0, 100), // Enhanced from 80
        STATUS: status,
        CONTEXT_REFS: "", // Links to related conversations/tasks
        CONFIDENCE: "9", // Decisions are usually high confidence
        IMPACT_SCORE: impact.length > 50 ? "8" : "6", // Score based on impact detail
      });
      id++;
    } else {
      console.log(
        chalk.gray(
          `    [DEBUG] ✗ Skipped (no decision): ${title.substring(0, 30)}`
        )
      );
    }
  }

  console.log(
    chalk.gray(`    [DEBUG] Total decisions extracted: ${entries.length}`)
  );
  return {
    schema: [
      "D#",
      "TIMESTAMP",
      "TITLE", // 80 chars - Enhanced for complex decision names
      "DECISION", // 120 chars - Enhanced for detailed decisions
      "RATIONALE", // 120 chars - Enhanced for comprehensive reasoning
      "IMPACT", // 100 chars - Enhanced for impact details
      "STATUS",
      "CONTEXT_REFS", // Links to related conversations/tasks
      "CONFIDENCE", // Decision certainty (1-10)
      "IMPACT_SCORE", // Relative importance (1-10)
    ],
    entries,
    links: [],
  };
}

/**
 * Convert next-steps.md to tasks.aicf
 */
async function convertNextSteps(aiDir) {
  // Try backup first (in case file was already converted)
  let filePath = path.join(aiDir, "next-steps.md.backup");
  if (!(await fs.pathExists(filePath))) {
    filePath = path.join(aiDir, "next-steps.md");
  }
  if (!(await fs.pathExists(filePath))) return null;

  const content = await fs.readFile(filePath, "utf8");
  const entries = [];
  const sections = content.split(/^## /m).filter((s) => s.trim());

  let id = 1;
  const timestamp = new Date().toISOString().replace(/\.\d{3}/, "");

  for (const section of sections) {
    if (section.startsWith("#") || section.includes("IMPORTANT FOR AI"))
      continue;

    const lines = section.split("\n");
    const sectionTitle = lines[0].trim();

    let priority = "M";
    if (
      sectionTitle.includes("Immediate") ||
      sectionTitle.includes("🔥") ||
      sectionTitle.includes("High")
    ) {
      priority = "H";
    } else if (
      sectionTitle.includes("Long-term") ||
      sectionTitle.includes("Backlog") ||
      sectionTitle.includes("Low")
    ) {
      priority = "L";
    }

    let defaultStatus = "TODO";
    if (
      sectionTitle.includes("Completed") ||
      sectionTitle.includes("✅") ||
      sectionTitle.includes("Done")
    ) {
      defaultStatus = "DONE";
    }

    for (const line of lines.slice(1)) {
      const trimmed = line.trim();

      if (
        trimmed.startsWith("- [ ]") ||
        trimmed.startsWith("- [x]") ||
        trimmed.startsWith("- [/]") ||
        (trimmed.startsWith("-") && !trimmed.startsWith("---"))
      ) {
        const isCompleted = trimmed.startsWith("- [x]");
        const isInProgress = trimmed.startsWith("- [/]");
        const status = isCompleted
          ? "DONE"
          : isInProgress
          ? "DOING"
          : defaultStatus;

        let task = trimmed
          .replace(/^- \[[ x\/]\] /, "")
          .replace(/^- /, "")
          .trim();
        task = task.replace(/\*\*/g, "").substring(0, 140); // Enhanced from 100

        if (task) {
          let effort = "M";
          if (
            task.length < 30 ||
            task.toLowerCase().includes("add") ||
            task.toLowerCase().includes("fix")
          ) {
            effort = "S";
          } else if (
            task.length > 60 ||
            task.toLowerCase().includes("implement") ||
            task.toLowerCase().includes("create")
          ) {
            effort = "L";
          }

          // Calculate task importance based on priority and effort
          let taskScore = "5"; // default
          if (priority === "H" && effort === "L") taskScore = "9";
          else if (priority === "H" && effort === "M") taskScore = "8";
          else if (priority === "H" && effort === "S") taskScore = "7";
          else if (priority === "M" && effort === "L") taskScore = "6";
          else if (priority === "L") taskScore = "3";
          
          entries.push({
            "T#": id.toString(),
            PRIORITY: priority,
            EFFORT: effort,
            STATUS: status,
            TASK: task,
            DEPENDENCIES: "None",
            ASSIGNED: "",
            CREATED: timestamp,
            COMPLETED: isCompleted ? timestamp : "",
            CONTEXT_REFS: "", // Links to related conversations/decisions
            CONFIDENCE: isCompleted ? "10" : "7", // Completed tasks are certain
            IMPACT_SCORE: taskScore, // Based on priority/effort matrix
          });
          id++;
        }
      }
    }
  }

  return {
    schema: [
      "T#",
      "PRIORITY",
      "EFFORT",
      "STATUS",
      "TASK", // 140 chars - Enhanced for detailed task descriptions
      "DEPENDENCIES",
      "ASSIGNED",
      "CREATED",
      "COMPLETED",
      "CONTEXT_REFS", // Links to related conversations/decisions
      "CONFIDENCE", // Task clarity/certainty (1-10)
      "IMPACT_SCORE", // Task importance (1-10)
    ],
    entries,
    links: [],
  };
}

/**
 * Convert known-issues.md to issues.aicf
 */
async function convertKnownIssues(aiDir) {
  const filePath = path.join(aiDir, "known-issues.md");
  if (!(await fs.pathExists(filePath))) return null;

  const content = await fs.readFile(filePath, "utf8");
  const entries = [];

  // Split by ### (subsections)
  const subsections = content.split(/^### /m).filter((s) => s.trim());

  let id = 1;

  for (const section of subsections) {
    if (
      section.startsWith("#") ||
      section.includes("Template") ||
      section.includes("None Currently")
    )
      continue;

    const lines = section.split("\n");
    const title = lines[0].trim().substring(0, 80); // Enhanced from 60

    let issue = "";
    let impact = "";
    let workaround = "";
    let status = "OPEN";
    let severity = "MEDIUM";
    let timestamp = new Date().toISOString().replace(/\.\d{3}/, "");

    // Track sections
    let inProblemSection = false;
    let inSolutionSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Extract metadata
      if (line.includes("**Date Discovered:**")) {
        const dateStr = line.split("**Date Discovered:**")[1].trim();
        timestamp = dateStr.replace(/-/g, "") + "T120000Z";
      }

      if (line.includes("**Date Resolved:**")) {
        status = "RESOLVED";
      }

      if (line.includes("**Severity:**")) {
        const sevStr = line.split("**Severity:**")[1].trim();
        if (sevStr.includes("🔴") || sevStr.includes("High")) {
          severity = "HIGH";
        } else if (sevStr.includes("🟡") || sevStr.includes("Medium")) {
          severity = "MEDIUM";
        } else if (sevStr.includes("🟢") || sevStr.includes("Low")) {
          severity = "LOW";
        }
      }

      // Track sections
      if (line === "**Problem:**") {
        inProblemSection = true;
        inSolutionSection = false;
        continue;
      } else if (
        line === "**Solution:**" ||
        line === "**Solution/Workaround:**"
      ) {
        inProblemSection = false;
        inSolutionSection = true;
        continue;
      } else if (line.startsWith("**") && line.endsWith(":**")) {
        inProblemSection = false;
        inSolutionSection = false;
        continue;
      }

      // Collect content
      if (
        inProblemSection &&
        line &&
        !line.startsWith("#") &&
        !line.startsWith("-")
      ) {
        issue += (issue ? " " : "") + line;
      } else if (
        inSolutionSection &&
        line &&
        !line.startsWith("#") &&
        !line.startsWith("-")
      ) {
        workaround += (workaround ? " " : "") + line;
      }
    }

    if (title && issue) {
      // Calculate confidence based on status and workaround availability
      const confidence = status === "RESOLVED" ? "10" : (workaround ? "8" : "6");
      
      // Calculate impact score based on severity
      const impactScore = severity === "HIGH" ? "9" : 
                         severity === "MEDIUM" ? "6" : "3";
      
      entries.push({
        "I#": id.toString(),
        TIMESTAMP: timestamp,
        SEVERITY: severity,
        TITLE: title.substring(0, 80), // Enhanced from 60
        ISSUE: issue.substring(0, 120), // Enhanced from 100
        IMPACT: (impact || "See description").substring(0, 100),
        WORKAROUND: workaround.substring(0, 120), // Enhanced from 100
        STATUS: status,
        CONTEXT_REFS: "", // Links to related conversations/decisions
        CONFIDENCE: confidence, // Based on resolution status
        IMPACT_SCORE: impactScore, // Based on severity
      });
      id++;
    }
  }

  return {
    schema: [
      "I#",
      "TIMESTAMP",
      "SEVERITY",
      "TITLE", // 80 chars - Enhanced for detailed issue titles
      "ISSUE", // 120 chars - Enhanced for comprehensive problem descriptions
      "IMPACT", // 100 chars - Impact details
      "WORKAROUND", // 120 chars - Enhanced for detailed solutions
      "STATUS",
      "CONTEXT_REFS", // Links to related conversations/decisions
      "CONFIDENCE", // Information certainty (1-10)
      "IMPACT_SCORE", // Issue severity impact (1-10)
    ],
    entries,
    links: [],
  };
}

/**
 * Generate index from converted data
 */
function generateIndex(packageJson, conversations, decisions, tasks, issues) {
  const timestamp = new Date().toISOString().replace(/\.\d{3}/, "");

  return {
    version: "3.0.0",
    project: {
      name: packageJson.name || "unknown",
      version: packageJson.version || "0.0.0",
      language: "javascript",
      repo: packageJson.repository?.url || "",
      last_update: timestamp,
    },
    counts: {
      conversations: conversations?.entries.length || 0,
      decisions: decisions?.entries.length || 0,
      tasks: tasks?.entries.length || 0,
      issues: issues?.entries.length || 0,
      components: 0,
    },
    state: {
      status: "active_development",
      phase: "migrated_to_aicf_3_0",
      last_chat: conversations?.entries.length || 0,
      last_commit: "",
    },
    context: packageJson.description || "No description available",
    currentWork: {
      task: "Migrated to AICF 3.0 format with enhanced AI continuity",
      priority: "HIGH",
      started: timestamp,
      blockers: "none",
    },
    recentActivity: [
      {
        timestamp,
        type: "MIGRATION",
        description: "Converted .ai/ to .aicf/ 3.0 format with enhanced AI continuity",
      },
    ],
  };
}

/**
 * Main migration function
 */

async function migrateToAICF(aiDir = ".ai", aicfDir = ".aicf") {
  console.log(chalk.bold("\n🚀 Migrating to AICF 3.0\n"));

  // Check if .ai/ exists
  if (!(await fs.pathExists(aiDir))) {
    throw new Error(`.ai/ directory not found at ${aiDir}`);
  }
  
  // Check for existing .aicf/ directory to avoid duplication
  if (await fs.pathExists(aicfDir)) {
    console.log(chalk.yellow("⚠️  .aicf/ directory already exists!"));
    console.log(chalk.gray("   Backing up existing .aicf/ to .aicf.backup"));
    await fs.copy(aicfDir, aicfDir + ".backup");
  }

  // Convert all files
  console.log(chalk.cyan("Converting files..."));
  const conversations = await convertConversationLog(aiDir);
  console.log(
    chalk.gray(`  - Conversations: ${conversations?.entries?.length || 0}`)
  );

  const decisions = await convertTechnicalDecisions(aiDir);
  console.log(chalk.gray(`  - Decisions: ${decisions?.entries?.length || 0}`));

  const tasks = await convertNextSteps(aiDir);
  console.log(chalk.gray(`  - Tasks: ${tasks?.entries?.length || 0}`));

  const issues = await convertKnownIssues(aiDir);
  console.log(chalk.gray(`  - Issues: ${issues?.entries?.length || 0}`));

  // Load package.json for metadata
  let packageJson = {};
  const packagePath = path.join(process.cwd(), "package.json");
  if (await fs.pathExists(packagePath)) {
    packageJson = await fs.readJSON(packagePath);
  }

  // Generate index
  const index = generateIndex(
    packageJson,
    conversations,
    decisions,
    tasks,
    issues
  );

  // Generate .meta
  const meta = {
    aicf_version: "3.0.0",
    project: index.project,
    created: index.project.last_update,
    last_update: index.project.last_update,
    stats: index.counts,
    tools: {
      generator: "create-ai-chat-context",
      generator_version: packageJson.version || "0.12.0",
    },
  };

  // Build context object
  const context = {
    index,
    conversations,
    decisions,
    tasks,
    issues,
    meta,
  };

  // Write AICF directory
  await writeAICF(context, aicfDir);


  console.log(chalk.green("✔ Migration complete!\n"));
  console.log(chalk.bold("📊 Results:"));
  console.log(
    chalk.cyan(`   Conversations: ${conversations?.entries.length || 0}`)
  );
  console.log(chalk.cyan(`   Decisions: ${decisions?.entries.length || 0}`));
  console.log(chalk.cyan(`   Tasks: ${tasks?.entries.length || 0}`));
  console.log(chalk.cyan(`   Issues: ${issues?.entries.length || 0}\n`));

  return context;
}

module.exports = {
  migrateToAICF,
};
