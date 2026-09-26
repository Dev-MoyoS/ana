import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const logoPath = path.join(root, "public", "Logo.png");
const appDir = path.join(root, "src", "app");

const cream = { r: 247, g: 242, b: 238, alpha: 1 };

async function makeSquare(size, outName) {
  const out = path.join(appDir, outName);
  await sharp(logoPath)
    .resize(size, size, {
      fit: "contain",
      background: cream,
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`Wrote ${outName} (${size}x${size})`);
}

await mkdir(appDir, { recursive: true });
await makeSquare(512, "icon.png");
await makeSquare(180, "apple-icon.png");
console.log("App Router will serve src/app/icon.png and apple-icon.png as favicon + Apple touch icon.");
