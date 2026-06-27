import { cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, "..");
const builtPublicDir = path.join(
  repoRoot,
  "artifacts",
  "export-hub",
  "dist",
  "public",
);
const outputDir = path.join(repoRoot, "public");

await rm(outputDir, { force: true, recursive: true });
await cp(builtPublicDir, outputDir, { recursive: true });

console.log(`Copied Vercel output to ${outputDir}`);
