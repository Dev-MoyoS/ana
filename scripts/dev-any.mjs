import { spawn } from "node:child_process";
import net from "node:net";

async function findFreePort(start = 3000, end = 3999) {
  for (let port = start; port <= end; port++) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await new Promise((resolve) => {
      const server = net
        .createServer()
        .once("error", () => resolve(false))
        .once("listening", () => {
          server.close(() => resolve(true));
        })
        // Next binds to IPv6 (`::`) by default; test that.
        .listen({ port, host: "::" });
    });
    if (ok) return port;
  }
  throw new Error(`No free port found in range ${start}-${end}`);
}

const port = await findFreePort();
console.log(`Starting Next dev on port ${port}...`);

const cmd =
  process.platform === "win32"
    ? `npx next dev --port ${port}`
    : `npx next dev --port ${port}`;

const child = spawn(cmd, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 1));

