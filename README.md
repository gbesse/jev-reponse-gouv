# Jev Réponse Gouv

**Évalue si une réponse gouvernementale répond réellement à une question parlementaire sourcée.**

[![Tests](https://github.com/gbesse/jev-reponse-gouv/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-reponse-gouv/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · v0.1.4 · Documentation française

Le dépôt calcule les délais et distingue les questions sans réponse. Lorsqu’une réponse existe, Jev la classe comme directe, partielle, procédurale, évasive ou hors sujet.

## Démarrage rapide

```sh
git clone https://github.com/gbesse/jev-reponse-gouv.git
cd jev-reponse-gouv
npm install
npm run demo
```

La démonstration utilise uniquement des données et probabilités synthétiques. Elle n’effectue aucun appel réseau et ne constitue pas une mesure de qualité de Jev.

## Exemple exécutable

Cet exemple mesure si une réponse gouvernementale couvre calendrier et budget. Il utilise un fournisseur Jev simulé : aucune clé API ni connexion réseau n’est nécessaire. L’assertion intégrée fait échouer la commande si le comportement attendu change.

Le code complet de [`examples/demo.mjs`](examples/demo.mjs) est directement copiable :

```js
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
```

Lancez-le avec :

```sh
npm run demo:principal
```

Résultat à repérer : `answerType: partial`.

### Cas limite à tester

L’absence de réponse produit localement un compteur de jours d’attente. Le code se trouve dans [`examples/cas-limite.mjs`](examples/cas-limite.mjs).

```sh
npm run demo:limite
```

Résultat à repérer : `answerType: unanswered · daysWaiting: 10`. La commande `npm run demo` exécute les deux exemples.

## Utilisation de la bibliothèque

Importez les fonctions métier depuis `@gbesse/jev-reponse-gouv`. Fournissez soit `createJevClient()` depuis l’export `./jev`, soit `createFakeProvider()` pour les tests hors ligne.

Les noms de l’API JavaScript restent stables pour préserver la compatibilité avec les versions précédentes. La documentation, les exemples et les explications destinées aux utilisateurs sont en français.

## Frontière de décision

Les identifiants, ministères, dates, absences de réponse et délais sont calculés par le code. Jev évalue uniquement la relation entre les deux textes, sans juger leur vérité ni leur valeur politique.

La question exacte envoyée à Jev est versionnée dans [`src/index.mjs`](src/index.mjs). Les identifiants, dates, calculs, filtres, seuils et transitions d’état restent gérés par du code ordinaire.

## Sources

- [https://data.senat.fr/aide/notice-explicative-questions/](https://data.senat.fr/aide/notice-explicative-questions/)
- [https://www.data.gouv.fr/datasets/questions-ecrites](https://www.data.gouv.fr/datasets/questions-ecrites)

Conservez l’attribution amont, les identifiants d’origine, les URL de source et les dates de récupération avec chaque enregistrement dérivé.

## Appels Jev réels

Les appels réels sont facultatifs et payants. Le client fixe le modèle `jev-1.13.0`, valide l’identité du modèle et toutes les probabilités, refuse les redirections, ne retente que les erreurs réseau et les réponses HTTP 429/529, puis bloque les requêtes dépassant une estimation prudente de 24 000 jetons.

```sh
TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
```

N’envoyez jamais de secret, de donnée personnelle ni de dossier sensible non expurgé. Évaluez le comportement sur un jeu représentatif de cas français avant tout usage opérationnel.

## Parcours comparatif

`npm run demo:parcours` produit un rapport JSON partageable pour **jev-reponse-gouv** : le scénario principal et la frontière déterministe. Chaque scénario garde sa sortie propre et échoue si son assertion ne passe plus. Les données et probabilités sont synthétiques ; aucun appel Jev n’est effectué.

Cette vue permet de comparer rapidement les chemins de décision et de choisir quel exemple adapter à vos propres données sourcées.

## Validation

```sh
npm run check
npm run typecheck
npm test
npm run demo
```

La CI exécute ces vérifications sous Node.js 22 et 24.

Projet indépendant, sans affiliation avec TypeSafe AI ni avec l’administration française. Consultez la [documentation de l’API Jev](https://docs.typesafe.ai/api) et les [limites du modèle](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
