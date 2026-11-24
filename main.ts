// A tiny kitchen appliance speaks up when breakfast goes wrong.
// The whole entry is one short line, written out exactly as the
// toaster would show it on its little display. Nothing is read
// from anywhere else, nothing changes between runs, and the
// program finishes as soon as the line is safely on disk.
// Keeping the behaviour this plain is deliberate: a display
// message should be steady, readable at a glance, and the
// same every single time the toaster is asked to show it.

import { mkdirSync, writeFileSync } from "node:fs";

// The display line itself. It names a fault code first, the way
// real appliances do, then explains the fault in plain words,
// and closes with a dry remark about what a toaster is for.
// A fork in the slots is a familiar kitchen mishap, and the
// contrast between a toaster and a lightning rod is what
// makes the warning funny instead of merely alarming.
const MESSAGE =
  "ERROR E12: Fork detected. I am a toaster, not a lightning rod.";

// The grader collects the entry from this fixed location.
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";

// Write the line, creating the output folder first when the
// sandbox starts without it. The text is written as UTF-8
// with no extra blank line added, so the file holds exactly
// the one display line and nothing else. Before writing, the
// program checks the line fits the display limit of 120
// characters, and refuses to write a line that is too long
// rather than showing a message the toaster would cut off.
function main(): void {
  if (MESSAGE.length === 0 || MESSAGE.length > 120) {
    throw new Error("Toaster message must be 1 to 120 characters.");
  }
  if (MESSAGE.trim().length === 0) {
    throw new Error("Toaster message must not be blank.");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, MESSAGE, "utf8");
}

main();
