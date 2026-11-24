import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// A kitchen toaster, speaking for itself, in the flat tone of a real
// appliance display. The joke is the toaster refusing a second job:
// a fork in the slot is a shock hazard, and the toaster would rather
// stay a toaster than become a lightning rod. One line, no setup,
// no second sentence needed, and every word has to earn its place.
// The surprise is not a toast pun; it is the appliance drawing a
// boundary, like a tired worker who knows exactly what it is not.
// That is what keeps the voice deadpan from the first word to the
// last, instead of starting as an error code and ending as a joke
// told by someone else.
const ENTRY = "ERROR E12: Fork detected. I am a toaster, not a lightning rod.";

// The gate allows 1 to 120 characters of UTF-8 text, not only white
// space, on a single line. Fail loudly instead of writing a line
// that could never be judged, and refuse padding that would make
// the display look less like a real message.
const MAX_LENGTH = 120;
if (
  ENTRY.length === 0 ||
  ENTRY.length > MAX_LENGTH ||
  ENTRY.includes("\n") ||
  ENTRY.trim() !== ENTRY
) {
  throw new Error(`Entry must be 1 to 120 characters on one line, got ${ENTRY.length}.`);
}

// Write exactly the line, byte for byte, with no trailing newline
// and no extra file: the scorer reads this one file alone, so the
// program does nothing else, reads nothing else, and never touches
// the network. The destination is the harness output directory
// when one is given, and the standard output directory otherwise.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
