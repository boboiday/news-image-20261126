import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, "entry.png");

if (!fs.existsSync(source)) {
  console.error("entry.png is missing next to main.ts");
  process.exit(1);
}

const sourceStat = fs.statSync(source);
if (sourceStat.size === 0) {
  console.error("entry.png is empty");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const destination = path.join(outputDir, "entry.png");
fs.copyFileSync(source, destination);

const destinationStat = fs.statSync(destination);
if (destinationStat.size !== sourceStat.size) {
  console.error(
    `copied entry.png size mismatch: expected ${sourceStat.size} bytes, got ${destinationStat.size} bytes`,
  );
  process.exit(1);
}

console.log(
  `Done: entry.png (${sourceStat.size} bytes) written to ${destination}`,
);
