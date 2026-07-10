// dump-context.js
const fs = require("fs");
const path = require("path");

// Ekstensi file yang ingin dikumpulkan
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".html", ".css", ".json"];

// Folder yang diabaikan
const IGNORE_DIRS = ["node_modules", ".git", ".next", "dist", "build", ".vercel"];

// File output
const OUTPUT_FILE = "context-dump.txt";

let output = "";

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.includes(entry.name)) {
        walk(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext)) {
        const relativePath = path.relative(process.cwd(), fullPath);
        const content = fs.readFileSync(fullPath, "utf-8");

        output += `\n${"=".repeat(60)}\n`;
        output += `FILE: ${relativePath}\n`;
        output += `${"=".repeat(60)}\n`;
        output += content + "\n";
      }
    }
  }
}

walk(process.cwd());

fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
console.log(`✅ Context berhasil di-dump ke: ${OUTPUT_FILE}`);
console.log(`📦 Total ukuran: ${(output.length / 1024).toFixed(2)} KB`);