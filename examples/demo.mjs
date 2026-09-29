// Objectif : démontrer la frontière de décision sans appel réseau.
import assert from "node:assert/strict";
import { assessResponse } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const p = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: {
    answerType: {
      type: "choice",
      choice: "partial",
      probabilities: {
        direct: 0.15,
        partial: 0.72,
        procedural: 0.06,
        evasive: 0.05,
        off_topic: 0.02,
      },
      confidence: 0.72,
    },
  },
  usage: {},
}));
const resultat = await assessResponse(
  {
    id: "QE-42",
    text: "Quel calendrier et quel budget sont prévus ?",
    publishedAt: "2026-01-10",
    ministry: "Transition écologique",
    sourceUrl: "https://senat.fr",
  },
  {
    text: "Une concertation est engagée et un calendrier sera publié. Le budget n'est pas précisé.",
    publishedAt: "2026-03-10",
    ministry: "Transition écologique",
    sourceUrl: "https://senat.fr",
  },
  p,
);
assert.equal(resultat.answerType, "partial");
console.log(JSON.stringify(resultat, null, 2));
