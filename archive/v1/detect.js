const fs = require("fs-extra");
const path = require("path");

/**
 * Auto-detect project type based on project files
 */
async function detectProjectType(cwd) {
  // Check for Next.js
  if (await isNextJsProject(cwd)) {
    return "nextjs";
  }

  // Check for Python
  if (await isPythonProject(cwd)) {
    return "python";
  }

  // Check for Rust
  if (await isRustProject(cwd)) {
    return "rust";
  }

  // Default to generic
  return "default";
}

/**
 * Check if project is Next.js
 */
async function isNextJsProject(cwd) {
  const packageJsonPath = path.join(cwd, "package.json");

  if (!(await fs.pathExists(packageJsonPath))) {
    return false;
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath);
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Check for Next.js dependency
    if (deps.next) {
      return true;
    }

    // Check for React (might be React-only project, but we'll default to nextjs template for React)
    if (deps.react && !deps.next) {
      // Could be Create React App or Vite React
      // For now, use nextjs template as it's React-focused
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Check if project is Python
 */
async function isPythonProject(cwd) {
  // Check for requirements.txt
  if (await fs.pathExists(path.join(cwd, "requirements.txt"))) {
    return true;
  }

  // Check for pyproject.toml
  if (await fs.pathExists(path.join(cwd, "pyproject.toml"))) {
    return true;
  }

  // Check for setup.py
  if (await fs.pathExists(path.join(cwd, "setup.py"))) {
    return true;
  }

  // Check for Pipfile
  if (await fs.pathExists(path.join(cwd, "Pipfile"))) {
    return true;
  }

  // Check for poetry.lock
  if (await fs.pathExists(path.join(cwd, "poetry.lock"))) {
    return true;
  }

  return false;
}

/**
 * Check if project is Rust
 */
async function isRustProject(cwd) {
  // Check for Cargo.toml
  if (await fs.pathExists(path.join(cwd, "Cargo.toml"))) {
    return true;
  }

  return false;
}

/**
 * Detect template from existing knowledge base
 * (Used by update command)
 */
async function detectTemplateFromKB(aiDir) {
  const architecturePath = path.join(aiDir, "architecture.md");

  if (!(await fs.pathExists(architecturePath))) {
    return "default";
  }

  const content = await fs.readFile(architecturePath, "utf-8");

  // Check for template-specific markers
  if (content.includes("Next.js") || content.includes("App Router")) {
    return "nextjs";
  }
  if (
    content.includes("FastAPI") ||
    content.includes("Django") ||
    content.includes("Flask")
  ) {
    return "python";
  }
  if (content.includes("Cargo") || content.includes("Rust")) {
    return "rust";
  }

  return "default";
}

/**
 * Get project info for display
 */
async function getProjectInfo(cwd) {
  const type = await detectProjectType(cwd);
  const info = {
    type,
    name: "Unknown",
    description: "",
  };

  // Get project name from package.json or directory name
  const packageJsonPath = path.join(cwd, "package.json");
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      info.name = packageJson.name || path.basename(cwd);
      info.description = packageJson.description || "";
    } catch (error) {
      info.name = path.basename(cwd);
    }
  } else {
    info.name = path.basename(cwd);
  }

  return info;
}

module.exports = {
  detectProjectType,
  detectTemplateFromKB,
  getProjectInfo,
  isNextJsProject,
  isPythonProject,
  isRustProject,
};

