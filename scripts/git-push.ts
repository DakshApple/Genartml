import fs from "node:fs";
import path from "node:path";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

const dir = process.cwd();
const remoteUrl = "https://github.com/DakshApple/Genartml.git";

async function main() {
  const tokenArg = process.argv[2];
  const pat = tokenArg || process.env.GITHUB_PAT || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

  console.log("🚀 Preparing Git repository...");

  // 1. Initialize git repo if .git doesn't exist
  if (!fs.existsSync(path.join(dir, ".git"))) {
    await git.init({ fs, dir, defaultBranch: "main" });
    console.log("✓ Initialized Git repository (main branch)");
  }

  // 2. Add remote origin if not present
  try {
    const remotes = await git.listRemotes({ fs, dir });
    const origin = remotes.find((r) => r.remote === "origin");
    if (!origin) {
      await git.addRemote({ fs, dir, remote: "origin", url: remoteUrl });
      console.log(`✓ Added remote origin -> ${remoteUrl}`);
    } else if (origin.url !== remoteUrl) {
      await git.deleteRemote({ fs, dir, remote: "origin" });
      await git.addRemote({ fs, dir, remote: "origin", url: remoteUrl });
      console.log(`✓ Updated remote origin -> ${remoteUrl}`);
    }
  } catch (err) {
    console.error("Error setting remote:", err);
  }

  // 3. Stage all non-ignored files recursively
  const ignoredPatterns = [
    "node_modules",
    ".git",
    ".output",
    ".nitro",
    ".tanstack",
    ".cache",
    ".DS_Store",
    "data/leads.json",
    "data/waitlist.json",
  ];

  function shouldIgnore(relPath: string): boolean {
    const parts = relPath.split("/");
    return parts.some((p) => ignoredPatterns.includes(p));
  }

  async function getFiles(currentDir: string, baseDir: string): Promise<string[]> {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, "/");

      if (shouldIgnore(relPath)) continue;

      if (entry.isDirectory()) {
        const subFiles = await getFiles(fullPath, baseDir);
        files = files.concat(subFiles);
      } else if (entry.isFile()) {
        files.push(relPath);
      }
    }
    return files;
  }

  console.log("📦 Staging project files...");
  const filesToStage = await getFiles(dir, dir);

  for (const file of filesToStage) {
    await git.add({ fs, dir, filepath: file });
  }
  console.log(`✓ Staged ${filesToStage.length} files.`);

  // 4. Commit changes
  try {
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: "Daksh Apple",
        email: "daksh@genartml.com",
      },
      message: "Initial Genartml website codebase with form backend integration",
    });
    console.log(`✓ Created commit: ${sha.substring(0, 7)}`);
  } catch (err) {
    if (err instanceof Error && err.message.includes("No change")) {
      console.log("ℹ No new changes to commit.");
    } else {
      console.log("Commit status:", err);
    }
  }

  if (!pat) {
    console.log("\n🔑 GitHub Authentication Needed:");
    console.log("To push to https://github.com/DakshApple/Genartml.git, provide your GitHub Personal Access Token (PAT).");
    console.log("Usage: bun scripts/git-push.ts <YOUR_GITHUB_PAT_TOKEN>");
    return;
  }

  console.log("⬆ Pushing to GitHub...");
  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: "origin",
      ref: "main",
      force: true,
      onAuth: () => ({ username: pat }),
    });
    console.log("🎉 Successfully pushed to https://github.com/DakshApple/Genartml.git!");
    console.log(pushResult);
  } catch (pushErr) {
    console.error("Push failed:", pushErr instanceof Error ? pushErr.message : pushErr);
  }
}

main().catch((err) => console.error("Fatal Git script error:", err));
