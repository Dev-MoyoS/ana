import { spawn } from "node:child_process";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

if (!projectId) {
  console.error("");
  console.error("Sanity Studio is not configured yet.");
  console.error("Add this to .env.local then rerun:");
  console.error("  NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId");
  console.error("  NEXT_PUBLIC_SANITY_DATASET=production");
  console.error("");
  process.exit(1);
}

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["sanity", "dev", "--port", "3333"],
  {
    stdio: "inherit",
    env: { ...process.env, SANITY_STUDIO_PROJECT_ID: projectId, SANITY_STUDIO_DATASET: dataset },
  }
);

child.on("exit", (code) => process.exit(code ?? 1));

