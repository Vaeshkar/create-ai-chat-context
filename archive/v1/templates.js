const path = require("path");

/**
 * Available project templates
 */
const TEMPLATES = {
  // Core/Generic
  default: {
    name: "Generic/Universal",
    description: "Works for any project type",
    dir: "ai",
  },
  api: {
    name: "Backend API",
    description: "Generic backend API projects",
    dir: "api",
  },
  fullstack: {
    name: "Full-Stack",
    description: "Full-stack projects with frontend + backend",
    dir: "fullstack",
  },
  mobile: {
    name: "Mobile Development",
    description: "React Native, Flutter, Swift, Kotlin",
    dir: "mobile",
  },

  // JavaScript/TypeScript Ecosystem
  nextjs: {
    name: "Next.js/React",
    description: "Next.js, React, TypeScript projects",
    dir: "nextjs",
  },
  react: {
    name: "React",
    description: "React, Create React App, Vite projects",
    dir: "react",
  },
  vue: {
    name: "Vue.js",
    description: "Vue.js, Nuxt.js, Vite projects",
    dir: "vue",
  },
  angular: {
    name: "Angular",
    description: "Angular projects with TypeScript",
    dir: "angular",
  },
  node: {
    name: "Node.js",
    description: "Node.js backend projects, Express, NestJS",
    dir: "node",
  },
  
  // Python Ecosystem
  python: {
    name: "Python",
    description: "General Python projects",
    dir: "python",
  },
  django: {
    name: "Django",
    description: "Django web framework projects",
    dir: "django",
  },
  fastapi: {
    name: "FastAPI",
    description: "FastAPI backend projects",
    dir: "fastapi",
  },
  flask: {
    name: "Flask",
    description: "Flask web framework projects",
    dir: "flask",
  },

  // Systems Programming
  rust: {
    name: "Rust",
    description: "Rust systems programming projects",
    dir: "rust",
  },
  go: {
    name: "Go",
    description: "Go backend and systems projects",
    dir: "go",
  },
  cpp: {
    name: "C++",
    description: "C++ systems and application projects",
    dir: "cpp",
  },

  // Enterprise/JVM
  java: {
    name: "Java",
    description: "Java projects, Spring Boot, Maven/Gradle",
    dir: "java",
  },
  spring: {
    name: "Spring Boot",
    description: "Spring Boot, Spring Framework projects",
    dir: "spring",
  },
  kotlin: {
    name: "Kotlin",
    description: "Kotlin projects, Android, multiplatform",
    dir: "kotlin",
  },

  // .NET Ecosystem
  csharp: {
    name: "C#",
    description: "C# .NET projects",
    dir: "csharp",
  },
  dotnet: {
    name: ".NET",
    description: ".NET Core, ASP.NET Core projects",
    dir: "dotnet",
  },

  // Web Technologies
  php: {
    name: "PHP",
    description: "PHP projects, Laravel, Symfony",
    dir: "php",
  },
  laravel: {
    name: "Laravel",
    description: "Laravel PHP framework projects",
    dir: "laravel",
  },
  ruby: {
    name: "Ruby",
    description: "Ruby projects, Ruby on Rails",
    dir: "ruby",
  },
  rails: {
    name: "Ruby on Rails",
    description: "Ruby on Rails web framework projects",
    dir: "rails",
  },

  // Database & DevOps
  database: {
    name: "Database Projects",
    description: "Database design, migrations, stored procedures",
    dir: "database",
  },
  devops: {
    name: "DevOps/Infrastructure",
    description: "Docker, Kubernetes, CI/CD, Infrastructure",
    dir: "devops",
  },
  terraform: {
    name: "Terraform",
    description: "Infrastructure as Code with Terraform",
    dir: "terraform",
  },

  // Specialized
  ai_ml: {
    name: "AI/ML Projects",
    description: "Machine Learning, Deep Learning, Data Science",
    dir: "ai_ml",
  },
  blockchain: {
    name: "Blockchain/Web3",
    description: "Smart contracts, DApps, cryptocurrency",
    dir: "blockchain",
  },
  gamedev: {
    name: "Game Development",
    description: "Unity, Unreal, indie games, mobile games",
    dir: "gamedev",
  },
};

/**
 * Get template configuration
 */
function getTemplate(templateName) {
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(
      `Unknown template: ${templateName}. Available: ${Object.keys(TEMPLATES).join(", ")}`
    );
  }
  return template;
}

/**
 * Get all available templates
 */
function listTemplates() {
  return Object.entries(TEMPLATES).map(([key, value]) => ({
    key,
    ...value,
  }));
}

/**
 * Get template directory path
 */
function getTemplateDir(templateName) {
  const template = getTemplate(templateName);
  return path.join(__dirname, "../templates", template.dir);
}

/**
 * Check if template exists
 */
function templateExists(templateName) {
  return templateName in TEMPLATES;
}

module.exports = {
  TEMPLATES,
  getTemplate,
  listTemplates,
  getTemplateDir,
  templateExists,
};

