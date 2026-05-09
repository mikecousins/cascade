import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "cascade/public");

const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

let sha = "";
try {
  sha = execSync("git rev-parse --short HEAD", { cwd: root }).toString().trim();
} catch {
  // not a git repo or git not installed; skip
}

const versionString = sha ? `${pkg.version}+${sha}` : pkg.version;
await writeFile(path.join(outDir, "version.txt"), `${versionString}\n`, "utf8");

console.log(`postbuild: wrote cascade/public/version.txt (${versionString})`);
