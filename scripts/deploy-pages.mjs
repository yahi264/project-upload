// Builds a static copy of the site and publishes it to GitHub Pages (branch "gh-pages").
// Usage: npm run deploy:pages
// The admin dashboard and request saving need a server, so they are left out of this copy;
// on Pages the quote form sends the request by WhatsApp or email instead.
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPO = "https://github.com/yahi264/project-upload.git";
// PAGES_BASE="" builds a copy that runs from the site root (the offline copy used by Open-Website.bat).
const BASE = process.env.PAGES_BASE ?? "/project-upload";
const serverOnly = ["proxy.ts", "app/api", "app/admin", "app/[locale]/[...rest]"];
const stash = ".pages-stash";
// With a custom distDir, Next.js writes the exported site there.
const OUT = ".next-pages";
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

rmSync(stash, { recursive: true, force: true });
mkdirSync(stash);
const moved = [];
try {
  for (const p of serverOnly) {
    if (!existsSync(p)) continue;
    const dest = join(stash, p.replace(/[\/[\]. ]/g, "_"));
    renameSync(p, dest);
    moved.push([p, dest]);
  }
  rmSync(OUT, { recursive: true, force: true });
  run("npx next build", {
    env: { ...process.env, GITHUB_PAGES: "true", NEXT_PUBLIC_BASE_PATH: BASE, NEXT_PUBLIC_STATIC: "1" },
  });
} finally {
  for (const [p, dest] of moved.reverse()) renameSync(dest, p);
  rmSync(stash, { recursive: true, force: true });
}

// Home address: send visitors to their browser's language.
writeFileSync(
  `${OUT}/index.html`,
  `<!doctype html><html><head><meta charset="utf-8"><title>Hieron</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>
var l=["en","fr","tr","ar","ru"],w=(navigator.languages||[navigator.language||"en"]).map(function(x){return x.slice(0,2).toLowerCase()});
var p="en";for(var i=0;i<w.length;i++){if(l.indexOf(w[i])>-1){p=w[i];break}}
location.replace("${BASE}/"+p+"/");
</script><noscript><meta http-equiv="refresh" content="0;url=${BASE}/en/"></noscript>
</head><body style="background:#0e151d"></body></html>`,
);
writeFileSync(`${OUT}/.nojekyll`, "");

// The browser asks for page data as flat names ("__next.$d$locale.__PAGE__.txt") but the export
// stores them in folders ("__next.$d$locale/__PAGE__.txt"); add flat copies so GitHub Pages finds them.
function flatten(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      const walk = (d, prefix) => {
        for (const n of readdirSync(d)) {
          const f = join(d, n);
          if (statSync(f).isDirectory()) walk(f, `${prefix}.${n}`);
          else copyFileSync(f, join(dir, `${prefix}.${n}`));
        }
      };
      walk(full, name);
    } else flatten(full);
  }
}
flatten(OUT);

if (process.argv.includes("--build-only")) process.exit(0);

run("git init -q -b gh-pages", { cwd: OUT });
run("git add -A", { cwd: OUT });
run('git -c core.autocrlf=false commit -q -m "Publish website to GitHub Pages"', { cwd: OUT });
run(`git push -f ${REPO} gh-pages`, { cwd: OUT });
console.log(`\nPublished: https://yahi264.github.io${BASE}/`);
