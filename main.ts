// Worst Superpower — one line, at most 140 characters.
// Scores 3 candidate superpowers against the judge's 5 published criteria
// (in their published order) and writes the winner to /output/entry.txt
// (OUTPUT_PATH override for local testing).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

type Candidate = { text: string; scores: number[] }; // scores: useless, joke, unexpected, tight, clear (each 0-5)

const candidates: Candidate[] = [
  {
    text: "I can hear what my houseplants are thinking, but only on Tuesdays, and all they ever think about is water.",
    scores: [5, 5, 5, 5, 5], // 25 — useless (plants think only of water), vivid picture, fresh angle, concrete Tuesdays/water detail, one clear read
  },
  {
    text: "I can make any traffic light turn green, but only for pedestrians walking the other way.",
    scores: [4, 4, 4, 4, 5], // 21 — useless to me, but it still helps strangers; the turn is good, the angle less fresh
  },
  {
    text: "I can instantly know the exact time anywhere on Earth, but only while holding my breath.",
    scores: [5, 4, 3, 4, 5], // 21 — genuinely useless, but knowing-the-time is a familiar gag family
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((a, b) => a + b, 0);
}

const winner = [...candidates].sort((a, b) => total(b) - total(a))[0];
const entry = winner.text;

if (entry.length < 1 || entry.length > 140 || entry.includes("\n")) {
  throw new Error(`entry fails the 1-140 char single-line gate: ${entry.length} chars`);
}

const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
console.log(`winner ${total(winner)}/25, ${entry.length} chars written to ${out}`);
