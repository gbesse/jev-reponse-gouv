# jev-reponse-gouv — contrôle d’adoption · adoption check · comprobación de adopción

## Français

Point de départ local, après la préparation indiquée dans le README :

```sh
npm run demo:parcours
```

Une réponse qui annonce un calendrier mais omet le budget peut n’être que partielle. Comparez les motifs du parcours et les passages de la question source.

## English

Local starting point, after the setup described in the README:

```sh
npm run demo:parcours
```

An answer that supplies a schedule but omits the budget may be only partial. Compare walkthrough reasons with the source question passages.

## Español

Punto de partida local, después de la preparación descrita en el README:

```sh
npm run demo:parcours
```

Una respuesta que indica un calendario pero omite el presupuesto puede ser solo parcial. Compare los motivos del recorrido con los pasajes de la pregunta original.
## Variante synthétique · Synthetic variation · Variante sintética

```text
question_fields=[schedule,budget]; answer_fields=[schedule]
```

FR : adaptez une copie de la fixture locale à cette situation, puis vérifiez le comportement décrit ci-dessus. Les valeurs sont illustratives, pas des résultats Jev mesurés.

EN: adapt a copy of the local fixture to this situation, then check the behavior described above. Values are illustrative, not measured Jev output.

ES: adapte una copia de la fixture local a esta situación y compruebe el comportamiento descrito arriba. Los valores son ilustrativos, no resultados Jev medidos.
