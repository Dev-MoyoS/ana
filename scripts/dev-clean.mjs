import { rmSync } from "node:fs";
import { spawn } from "node:child_process";

try {
  rmSync(".next", { recursive: true, force: true });
} catch {
  // ignore
}

const port = process.env.PORT || "3000";
console.log(`Starting clean Next.js dev server on http://localhost:${port}`);

const child = spawn(`npx next dev --port ${port}`, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 1));
