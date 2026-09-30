// Cas limite : une réponse absente ne doit pas être inventée par le modèle.
import assert from "node:assert/strict";
import { assessResponse } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";

const jev = createFakeProvider(() => {
  throw new Error("Jev ne doit pas être appelé");
});
const resultat = await assessResponse(
  {
    id: "QE-43",
    text: "Quel calendrier est prévu ?",
    publishedAt: "2026-09-20",
    ministry: "Transition écologique",
    sourceUrl: "https://senat.fr",
  },
  null,
  jev,
  { at: "2026-09-30" },
);
assert.equal(resultat.answerType, "unanswered");
assert.equal(resultat.daysWaiting, 10);
assert.equal(jev.calls, 0);
console.log(JSON.stringify(resultat, null, 2));
