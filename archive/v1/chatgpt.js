const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

/**
 * Generate ChatGPT integration instructions
 */
async function generateChatGPTInstructions(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const chatgptInstructionsPath = path.join(cwd, "CHATGPT_INSTRUCTIONS.md");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  const spinner = ora("Generating ChatGPT integration instructions...").start();

  try {
    // Check if instructions already exist
    if ((await fs.pathExists(chatgptInstructionsPath)) && !options.force) {
      spinner.fail("CHATGPT_INSTRUCTIONS.md already exists");
      console.log(
        chalk.yellow(
          "\n⚠️  CHATGPT_INSTRUCTIONS.md file already exists. Use --force to overwrite.\n"
        )
      );
      return;
    }

    // Generate the instructions content
    const instructionsContent = generateInstructionsContent();

    // Write the file
    await fs.writeFile(chatgptInstructionsPath, instructionsContent, "utf-8");

    spinner.succeed("CHATGPT_INSTRUCTIONS.md file created");

    console.log(chalk.green("\n✅ ChatGPT integration configured!\n"));
    console.log(chalk.bold("📝 What this does:\n"));
    console.log("  • Creates a perfect prompt for ChatGPT with your project context");
    console.log("  • Lists all your knowledge base files for easy reference");
    console.log("  • Provides workflow tips for productive ChatGPT sessions");
    console.log();

    console.log(chalk.bold("🚀 Next steps:\n"));
    console.log("1. Open ChatGPT in your browser");
    console.log("2. Copy-paste the prompt from CHATGPT_INSTRUCTIONS.md");
    console.log("3. ChatGPT will understand your entire project context!");
    console.log();

    console.log(chalk.bold("💡 Tips:\n"));
    console.log("  • Keep CHATGPT_INSTRUCTIONS.md bookmarked for quick access");
    console.log("  • Update .ai/ files regularly for best results");
    console.log("  • Use 'npx aic check' to monitor token usage");
    console.log();

    // Add to .gitignore if it exists
    await addToGitignore(cwd, "CHATGPT_INSTRUCTIONS.md");
  } catch (error) {
    spinner.fail("Failed to generate ChatGPT instructions");
    throw error;
  }
}

/**
 * Generate the content for ChatGPT instructions file
 */
function generateInstructionsContent() {
  return `# 🤖 ChatGPT Integration Instructions

**Perfect setup for AI context in ChatGPT web interface**

## 🎯 Perfect ChatGPT Prompt

Copy and paste this prompt at the start of every ChatGPT session:

\`\`\`
I'm working on this project and need you to understand the full context before we start. Please read these files in order to get complete project understanding:

1. .ai-instructions (start here - contains workflow and setup info)
2. .ai/README.md (overview of this knowledge base system)  
3. .ai/project-overview.md (project context, tech stack, and architecture)
4. .ai/technical-decisions.md (important decisions and rationale)
5. .ai/conversation-log.md (chat history and recent progress)
6. .ai/known-issues.md (current problems and workarounds)
7. .ai/next-steps.md (planned work and priorities)

After reading these files, please confirm you understand the project context and let me know if you have any questions about the current state before we proceed with coding.
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

## 🔄 ChatGPT Workflow Tips

### Starting a New Session:
1. **Use the prompt above** - This loads your full project context
2. **Wait for confirmation** - Let ChatGPT confirm it has read everything
3. **Ask specific questions** - Now you can dive straight into your work!

### During Long Sessions:
- **Reference past decisions**: "Based on our technical-decisions.md, what's the best approach for..."
- **Check known issues**: "Are there any known issues in our knowledge base related to..."
- **Stay aligned**: "Does this approach fit with our project-overview.md architecture?"

### Ending Sessions:
- **Update conversation-log.md** manually with key decisions made
- **Add new issues** to known-issues.md if discovered
- **Update technical-decisions.md** if you made important architectural choices
- **Run \`npx aic validate\`** to check knowledge base quality

## 💡 ChatGPT-Specific Tips

### Token Management:
- **Check usage regularly**: Run \`npx aic tokens\` to see how much context you're using
- **ChatGPT models**: GPT-4 (8K/32K), GPT-4 Turbo (128K), GPT-4o (128K)
- **Stay within limits**: If conversation gets long, start new session with context prompt

### Effective Prompting:
- **Be specific**: "Help me implement user authentication" vs "Help me with auth"
- **Reference context**: "Based on our Next.js setup in project-overview.md..."
- **Ask for explanations**: "Why is this approach better given our technical constraints?"

### Code Quality:
- **Request code reviews**: "Does this code follow our code-style.md conventions?"
- **Architecture alignment**: "How does this fit with our overall architecture?"
- **Best practices**: ChatGPT knows your project context and can suggest improvements

## 📊 Managing Context Size

Keep an eye on token usage to ensure smooth ChatGPT sessions:

\`\`\`bash
# Check current token usage
npx aic check

# View detailed breakdown across AI models  
npx aic tokens

# See comprehensive statistics
npx aic stats
\`\`\`

**If your knowledge base gets large:**
- Consider manually archiving old conversation-log.md entries
- Or use the [experimental version](https://github.com/Vaeshkar/create-ai-chat-context-experimental) for automated management

## 🎯 Benefits of This Setup

✅ **Instant Context** - ChatGPT understands your project immediately  
✅ **Consistent Advice** - Recommendations align with your tech stack and decisions  
✅ **No Repetition** - Never explain your architecture again  
✅ **Better Code** - AI suggestions fit your existing codebase patterns  
✅ **Faster Development** - Jump straight into productive work  

## 🔧 Maintenance Commands

Keep your knowledge base healthy for ChatGPT:

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
npx aic search "authentication"

# Configure preferences
npx aic config set preferredModel "GPT-4"
\`\`\`

## 📱 Pro Tips for ChatGPT Web Interface

### Browser Bookmarks:
Create bookmarks for quick access:
- **ChatGPT + Context**: Bookmark with the context prompt ready
- **Knowledge Base**: Quick link to your project's .ai/ folder

### Copy-Paste Efficiency:
- Keep this file open in a second tab
- Use browser extensions for quick text expansion
- Consider creating a snippet/macro for the context prompt

### Session Organization:
- **Name your chats** descriptively in ChatGPT
- **One feature per chat** when possible
- **Reference chat history** in your conversation-log.md

---

**Generated by create-ai-chat-context**

To regenerate this file:
\`\`\`bash
npx aic chatgpt --force
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
  const newContent = content.trim() + `\n\n# ChatGPT instructions\n${entry}\n`;
  await fs.writeFile(gitignorePath, newContent, "utf-8");
}

module.exports = {
  generateChatGPTInstructions,
};