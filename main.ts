import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A kitchen toaster, speaking for itself, in the flat tone of a real
// appliance display. The joke is the toaster refusing a second job:
// a fork in the slot is a shock hazard, and the toaster would rather
// stay a toaster than become a lightning rod. One line, no setup,
// no second sentence needed, and every word has to earn its place.
const ENTRY = "ERROR E12: Fork detected. I am a toaster, not a lightning rod.";

// The gate allows 1 to 120 characters. Fail loudly instead of
// writing a line that could never be judged.
if (ENTRY.length === 0 || ENTRY.length > 120 || ENTRY.includes("\n")) {
  throw new Error(`Entry must be 1 to 120 characters on one line, got ${ENTRY.length}.`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
