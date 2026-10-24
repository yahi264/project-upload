// Builds the website for the Cenuta (cPanel) hosting at https://hieron.com.tr
// and packs it into dist/hieron-cenuta.zip, ready to extract into public_html.
// Usage: npm run build:cenuta
import { execFileSync, execSync } from "node:child_process";
import { join } from "node:path";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";

const OUT = ".next-pages";
execSync("node scripts/deploy-pages.mjs --build-only", {
  stdio: "inherit",
  env: { ...process.env, PAGES_BASE: "", NEXT_PUBLIC_REQUEST_ENDPOINT: "/api/request.php" },
});
// The PHP request handler and the Apache settings
cpSync("server", OUT, { recursive: true });
rmSync(`${OUT}/.git`, { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
if (existsSync("dist/hieron-cenuta.zip")) rmSync("dist/hieron-cenuta.zip");
// Windows' own tar (bsdtar) writes a real compressed .zip; Git Bash's tar would not.
const tar = process.platform === "win32" ? join(process.env.SystemRoot ?? "C:/Windows", "System32", "tar.exe") : "bsdtar";
execFileSync(tar, ["-a", "-c", "-f", "../dist/hieron-cenuta.zip", ...readdirSync(OUT)], { cwd: OUT, stdio: "inherit" });
console.log("\nReady: dist/hieron-cenuta.zip — extract it into public_html on the hosting.");
