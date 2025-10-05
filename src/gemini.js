const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

/**
 * Generate Gemini AI integration instructions
 */
async function generateGeminiInstructions(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const geminiInstructionsPath = path.join(cwd, "GEMINI_INSTRUCTIONS.md");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  const spinner = ora("Generating Gemini AI integration instructions...").start();

  try {
    // Check if instructions already exist
    if ((await fs.pathExists(geminiInstructionsPath)) && !options.force) {
      spinner.fail("GEMINI_INSTRUCTIONS.md already exists");
      console.log(
        chalk.yellow(
          "\n⚠️  GEMINI_INSTRUCTIONS.md file already exists. Use --force to overwrite.\n"
        )
      );
      return;
    }

    // Generate the instructions content
    const instructionsContent = generateInstructionsContent();

    // Write the file
    await fs.writeFile(geminiInstructionsPath, instructionsContent, "utf-8");

    spinner.succeed("GEMINI_INSTRUCTIONS.md file created");

    console.log(chalk.green("\n✅ Gemini AI integration configured!\n"));
    console.log(chalk.bold("📝 What this does:\n"));
    console.log("  • Creates a perfect prompt for Google Gemini with your project context");
    console.log("  • Optimized for Gemini's long context window (1M tokens)");
    console.log("  • Provides workflow tips for productive Gemini sessions");
    console.log();

    console.log(chalk.bold("🚀 Next steps:\n"));
    console.log("1. Open Google Gemini (gemini.google.com) in your browser");
    console.log("2. Copy-paste the prompt from GEMINI_INSTRUCTIONS.md");
    console.log("3. Gemini will understand your entire project context!");
    console.log();

    console.log(chalk.bold("💡 Tips:\n"));
    console.log("  • Gemini excels at large context - perfect for big projects");
    console.log("  • Great for code analysis and architectural discussions");
    console.log("  • Use 'npx aic tokens' to see how much context you're using");
    console.log();

    // Add to .gitignore if it exists
    await addToGitignore(cwd, "GEMINI_INSTRUCTIONS.md");
  } catch (error) {
    spinner.fail("Failed to generate Gemini AI instructions");
    throw error;
  }
}

/**
 * Generate the content for Gemini instructions file
 */
function generateInstructionsContent() {
  return `# 💎 Google Gemini Integration Instructions

**Perfect setup for AI context in Google Gemini web interface**

## 🎯 Perfect Gemini Prompt

Copy and paste this prompt at the start of every Gemini session:

\`\`\`
I'm working on this project and need you to understand the full context before we start. Please read these files in order to get complete project understanding:

1. .ai-instructions (start here - contains workflow and setup info)
2. .ai/README.md (overview of this knowledge base system)  
3. .ai/project-overview.md (project context, tech stack, and architecture)
4. .ai/technical-decisions.md (important decisions and rationale)
5. .ai/conversation-log.md (chat history and recent progress)
6. .ai/known-issues.md (current problems and workarounds)
7. .ai/next-steps.md (planned work and priorities)

After reading these files, please confirm you understand the project context and let me know if you have any questions about the current state before we proceed with development.
\`\`\`

## 📁 Knowledge Base Files Reference

Your \`.ai/\` directory contains these essential files:

**📋 Core Documentation:**
- **README.md** - Overview and instructions for AI assistants
- **project-overview.md** - Project context, tech stack, architecture  
- **conversation-log.md** - Chat history and key decisions
- **technical-decisions.md** - Why we chose X over Y
- **known-issues.md** - Current problems and solutions
- **next-steps.md** - Roadmap and immediate priorities

**🎨 Standards & Guidelines:**
- **design-system.md** - UI/UX patterns and component guidelines
- **code-style.md** - Coding conventions and standards

**🔧 AI Helper Files:**
- **.ai-instructions** - Main entry point with setup instructions
- **.aicf/** directory - AI-optimized structured files

## 🔄 Gemini Workflow Tips

### Starting a New Session:
1. **Use the prompt above** - This loads your full project context
2. **Wait for confirmation** - Let Gemini confirm it has read everything
3. **Leverage long context** - Gemini can handle much larger contexts than other AIs!

### During Sessions:
- **Deep architectural discussions**: "Analyze our entire architecture from project-overview.md and suggest improvements"
- **Cross-reference decisions**: "Based on our technical-decisions.md, how should we approach..."
- **Complex code analysis**: "Review our entire codebase approach and identify potential issues"

### Ending Sessions:
- **Update conversation-log.md** manually with key decisions and insights
- **Add architectural insights** to technical-decisions.md if Gemini suggested improvements
- **Update known-issues.md** if complex problems were identified
- **Run \`npx aic validate\`** to check knowledge base quality

## 💡 Gemini-Specific Advantages

### Large Context Window:
- **Gemini Pro**: Up to 1M tokens (vs ChatGPT's 128K)
- **Perfect for large projects** with extensive documentation
- **Can analyze entire codebases** in one session
- **Great for architectural reviews** and system-wide analysis

### Google Integration:
- **Search capabilities** - Can find relevant information beyond your project
- **Code understanding** - Excellent at analyzing complex code relationships
- **Multi-modal** - Can work with images, diagrams, and code simultaneously

### Best Use Cases:
- **Large project analysis** - When you need to understand complex systems
- **Architecture discussions** - Planning and reviewing system design
- **Research and learning** - Understanding new technologies and patterns
- **Code reviews** - Analyzing code quality and suggesting improvements

## 📊 Managing Context with Gemini

Gemini's large context window means you can include much more:

\`\`\`bash
# Check current token usage across different AI models
npx aic tokens --all

# Gemini can handle much larger contexts
npx aic stats
\`\`\`

**Token capacity comparison:**
- ChatGPT: 128K tokens
- Claude: 200K tokens  
- **Gemini: 1M tokens** 🚀

This means you can include:
- Entire conversation history
- All documentation files
- Large code snippets
- Multiple examples and references

## 🎯 Benefits of Gemini Integration

✅ **Massive Context** - Handle large projects without context limits  
✅ **Deep Analysis** - Comprehensive code and architecture reviews  
✅ **Google Search** - Access to latest information and best practices  
✅ **Multi-modal** - Work with code, docs, and visual elements  
✅ **Free Tier** - Generous free usage for most development needs  

## 🔧 Maintenance Commands

Keep your knowledge base optimized for Gemini:

\`\`\`bash
# Initialize new project
npx aic init --template nextjs

# Add missing files to existing project  
npx aic migrate

# Check knowledge base quality
npx aic validate

# Quick health check
npx aic check

# Search for information
npx aic search "microservices architecture"

# Configure preferences for Gemini
npx aic config set preferredModel "Gemini Pro"
\`\`\`

## 💎 Pro Tips for Gemini

### Leverage Large Context:
- **Include everything** - Don't worry about token limits as much
- **Ask for comprehensive analysis** - "Review our entire system and suggest improvements"
- **Cross-reference extensively** - "How does this decision align with our technical-decisions.md?"

### Use Gemini's Strengths:
- **Research integration** - "What are the latest best practices for [technology]?"
- **Architecture planning** - "Design a scalable solution for our requirements"
- **Performance analysis** - "Identify bottlenecks in our current approach"

### Session Organization:
- **One major topic per session** - Even though context is large
- **Document insights thoroughly** - Gemini can provide very detailed analysis
- **Reference your knowledge base** - Always ground discussions in your project context

### Multi-modal Usage:
- **Upload diagrams** - Include architecture diagrams or UI mockups
- **Code screenshots** - Can analyze code from images if needed
- **Documentation images** - Include visual documentation

## 🔬 Advanced Gemini Features

### Code Analysis:
\`\`\`
"Analyze our codebase structure from project-overview.md and identify:
1. Potential security vulnerabilities
2. Performance optimization opportunities  
3. Code maintainability issues
4. Architecture improvement suggestions"
\`\`\`

### Research Integration:
\`\`\`
"Based on our tech stack in project-overview.md, research and summarize:
1. Latest industry best practices
2. Emerging tools we should consider
3. Potential migration paths for better performance"
\`\`\`

### Comprehensive Planning:
\`\`\`
"Using our next-steps.md and technical-decisions.md, create a detailed 
implementation plan for [feature] that considers our existing architecture 
and constraints."
\`\`\`

---

**Generated by create-ai-chat-context**

To regenerate this file:
\`\`\`bash
npx aic gemini --force
\`\`\`

To update your knowledge base:
\`\`\`bash
npx aic validate    # Check quality
npx aic check       # Check health  
npx aic tokens      # Check token usage
\`\`\`

---

**Questions?** [Open an issue on GitHub](https://github.com/Vaeshkar/create-ai-chat-context/issues)
`;
}

/**
 * Add entry to .gitignore if it doesn't exist
 */
async function addToGitignore(cwd, entry) {
  const gitignorePath = path.join(cwd, ".gitignore");

  if (!(await fs.pathExists(gitignorePath))) {
    return;
  }

  const content = await fs.readFile(gitignorePath, "utf-8");

  // Check if entry already exists
  if (content.includes(entry)) {
    return;
  }

  // Add entry
  const newContent = content.trim() + `\n\n# Gemini AI instructions\n${entry}\n`;
  await fs.writeFile(gitignorePath, newContent, "utf-8");
}

module.exports = {
  generateGeminiInstructions,
};