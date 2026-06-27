import { spawn } from "node:child_process";
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

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      shell: process.platform === "win32",
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code ?? "unknown"}`));
    });
  });
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

if (process.env.VERCEL) {
  await runCommand("pnpm", ["--dir", "artifacts/export-hub", "build"]);
} else {
  await runCommand(npmCommand, [
    "exec",
    "--package",
    "pnpm@10.28.0",
    "--",
    "pnpm",
    "--dir",
    "artifacts/export-hub",
    "build",
  ]);
}

await rm(outputDir, { force: true, recursive: true });
await cp(builtPublicDir, outputDir, { recursive: true });

console.log(`Copied Vercel output to ${outputDir}`);
