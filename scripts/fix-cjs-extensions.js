#!/usr/bin/env node
/**
 * Fix CJS build - rename .js to .cjs and update imports
 * This ensures proper dual ESM/CJS exports
 */

import { readdir, rename, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const CJS_DIR = './dist/cjs';

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}

async function fixCjsExtensions() {
  console.log('🔧 Fixing CJS extensions...');
  
  // Step 1: Update all .js imports to .cjs in files
  for await (const file of walk(CJS_DIR)) {
    if (extname(file) === '.js') {
      const content = await readFile(file, 'utf-8');
      const fixed = content.replace(/require\("(\..+?)\.js"\)/g, 'require("$1.cjs")');
      
      if (content !== fixed) {
        await writeFile(file, fixed, 'utf-8');
        console.log(`  ✓ Fixed imports in ${file}`);
      }
    }
  }
  
  // Step 2: Rename all .js files to .cjs
  for await (const file of walk(CJS_DIR)) {
    if (extname(file) === '.js') {
      const newPath = file.replace(/\.js$/, '.cjs');
      await rename(file, newPath);
      console.log(`  ✓ Renamed ${file} → ${newPath}`);
    }
  }
  
  console.log('✅ CJS extensions fixed!');
}

fixCjsExtensions().catch((error) => {
  console.error('❌ Error fixing CJS extensions:', error);
  process.exit(1);
});

