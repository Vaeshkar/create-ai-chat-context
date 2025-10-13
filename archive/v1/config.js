const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const CONFIG_FILE = ".ai/config.json";

/**
 * Default configuration
 */
const DEFAULT_CONFIG = {
  preferredModel: null, // User's preferred AI model
  showAllModels: false, // Show all models by default in tokens command
  useAiNativeFormat: false, // Use AI-native format (85% token reduction) instead of YAML
};

/**
 * Get configuration file path
 */
function getConfigPath(cwd = process.cwd()) {
  return path.join(cwd, CONFIG_FILE);
}

/**
 * Load configuration
 */
async function loadConfig(cwd = process.cwd()) {
  const configPath = getConfigPath(cwd);

  try {
    if (await fs.pathExists(configPath)) {
      const config = await fs.readJson(configPath);
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch (error) {
    // If config is corrupted, return defaults
    console.warn(chalk.yellow("⚠️  Config file corrupted, using defaults"));
  }

  return { ...DEFAULT_CONFIG };
}

/**
 * Save configuration
 */
async function saveConfig(config, cwd = process.cwd()) {
  const configPath = getConfigPath(cwd);
  const aiDir = path.dirname(configPath);

  // Ensure .ai directory exists
  await fs.ensureDir(aiDir);

  // Merge with existing config
  const existingConfig = await loadConfig(cwd);
  const newConfig = { ...existingConfig, ...config };

  await fs.writeJson(configPath, newConfig, { spaces: 2 });
  return newConfig;
}

/**
 * Get a specific config value
 */
async function getConfigValue(key, cwd = process.cwd()) {
  const config = await loadConfig(cwd);
  return config[key];
}

/**
 * Set a specific config value
 */
async function setConfigValue(key, value, cwd = process.cwd()) {
  const config = await loadConfig(cwd);
  config[key] = value;
  await saveConfig(config, cwd);
  return config;
}

/**
 * List all configuration
 */
async function listConfig(cwd = process.cwd()) {
  const config = await loadConfig(cwd);

  console.log(chalk.bold.cyan("\n⚙️  Configuration\n"));

  if (config.preferredModel) {
    console.log(
      `${chalk.bold("Preferred Model:")} ${chalk.cyan(config.preferredModel)}`
    );
  } else {
    console.log(`${chalk.bold("Preferred Model:")} ${chalk.gray("(not set)")}`);
  }

  console.log(
    `${chalk.bold("Show All Models:")} ${
      config.showAllModels ? chalk.green("Yes") : chalk.gray("No")
    }`
  );

  console.log(
    `${chalk.bold("AI-Native Format:")} ${
      config.useAiNativeFormat
        ? chalk.green("Enabled") + chalk.gray(" (85% token reduction!)")
        : chalk.gray("Disabled") + chalk.gray(" (using YAML)")
    }`
  );

  console.log();
  console.log(
    chalk.gray(
      "💡 Tip: Use 'npx aic config set <key> <value>' to change settings"
    )
  );
  console.log();
}

/**
 * Handle config command
 */
async function handleConfigCommand(action, key, value) {
  const cwd = process.cwd();

  try {
    // Check if .ai directory exists
    const aiDir = path.join(cwd, ".ai");
    if (!(await fs.pathExists(aiDir))) {
      console.log(
        chalk.yellow(
          "\n⚠️  No .ai/ directory found. Run 'npx aic init' first.\n"
        )
      );
      return;
    }

    if (!action || action === "list") {
      // List all config
      await listConfig(cwd);
      return;
    }

    if (action === "get") {
      // Get specific value
      if (!key) {
        console.log(chalk.red("\n❌ Error: Please specify a config key\n"));
        console.log(chalk.gray("Usage: npx aic config get <key>\n"));
        return;
      }

      const configValue = await getConfigValue(key, cwd);
      console.log(chalk.cyan(configValue || "(not set)"));
      return;
    }

    if (action === "set") {
      // Set specific value
      if (!key || value === undefined) {
        console.log(
          chalk.red("\n❌ Error: Please specify both key and value\n")
        );
        console.log(chalk.gray("Usage: npx aic config set <key> <value>\n"));
        return;
      }

      // Validate known keys
      if (key === "preferredModel") {
        // Validate model name (basic check)
        await setConfigValue("preferredModel", value, cwd);
        console.log(
          chalk.green(`\n✅ Preferred model set to: ${chalk.cyan(value)}\n`)
        );
        console.log(
          chalk.gray(
            "💡 Run 'npx aic tokens' to see how your context fits in this model\n"
          )
        );
      } else if (key === "showAllModels") {
        // Convert to boolean
        const boolValue = value === "true" || value === "1" || value === "yes";
        await setConfigValue("showAllModels", boolValue, cwd);
        console.log(
          chalk.green(`\n✅ Show all models set to: ${chalk.cyan(boolValue)}\n`)
        );
      } else if (key === "useAiNativeFormat") {
        // Convert to boolean
        const boolValue = value === "true" || value === "1" || value === "yes";
        await setConfigValue("useAiNativeFormat", boolValue, cwd);
        console.log(
          chalk.green(
            `\n✅ AI-native format set to: ${chalk.cyan(boolValue)}\n`
          )
        );
        console.log(
          chalk.gray(
            boolValue
              ? "💡 chat-finish will now generate ultra-compact format (85% token reduction!)"
              : "💡 chat-finish will use YAML format (human-readable)"
          )
        );
        console.log(chalk.gray("\n"));
      } else {
        console.log(chalk.yellow(`\n⚠️  Unknown config key: ${key}\n`));
        console.log(chalk.gray("Available keys:"));
        console.log(chalk.gray("  - preferredModel"));
        console.log(chalk.gray("  - showAllModels"));
        console.log(chalk.gray("  - useAiNativeFormat\n"));
      }
      return;
    }

    // Unknown action
    console.log(chalk.red(`\n❌ Unknown action: ${action}\n`));
    console.log(chalk.gray("Available actions:"));
    console.log(chalk.gray("  - list (default)"));
    console.log(chalk.gray("  - get <key>"));
    console.log(chalk.gray("  - set <key> <value>\n"));
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error.message);
    console.log();
  }
}

module.exports = {
  loadConfig,
  saveConfig,
  getConfigValue,
  setConfigValue,
  listConfig,
  handleConfigCommand,
};
