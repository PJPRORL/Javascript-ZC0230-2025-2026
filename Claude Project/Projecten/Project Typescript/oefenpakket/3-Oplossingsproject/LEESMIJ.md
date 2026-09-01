# Ruilkaartenbibliotheek — uitgewerkte oplossing

Het examenproject van augustus 2026 met de oplossing erin verwerkt.

    Server/          onveranderd — daar raak je niets aan
    Frontend/        de werkende oplossing
    _examenversie/   dezelfde oplossing, in de eenvoudigste vorm
    opgave.md        de originele opdracht
    screenshots/     de verwachte weergave

## Starten

```bash
cd Server    && pnpm install && pnpm dev    # http://localhost:3000
cd Frontend  && pnpm install && pnpm dev    # http://localhost:5173
```

Twee terminals, allebei open laten.

## Twee versies van dezelfde oplossing

In `Frontend/src/` staat de **uitgebreide versie**: die gebruikt een klein
DOM-hulpbestand in plaats van het uitroepteken na `querySelector`, laat de DOM via
`declare global` weten dat `kaart-kaart` en het event `kaart-toggle` bestaan, en versmalt
de zeldzaamheid terug naar de vier toegestane woorden met een type predicate.

In `_examenversie/src/` staan dezelfde zeven bestanden zonder die extra's: rechttoe
rechtaan, zoals je ze op het examen zou schrijven.

**Functioneel zijn ze identiek.** Op het examen levert de uitgebreide versie geen extra
punt op — je wordt op functionaliteit beoordeeld. De eenvoudige versie is daar zelfs de
verstandigere keuze: minder te typen onder tijdsdruk. De uitgebreide versie is er om te
leren wat je opgeeft door het niet te doen, en als voorbeeld voor je eigen projecten.

Wil je de eenvoudige versie draaien: kopieer de inhoud van `_examenversie/src/` over
`Frontend/src/` heen (het bestand `Frontend/src/dom.ts` mag dan weg, en
`Frontend/src/models/tradingCard.ts` keert terug naar de originele interface).

Hoofdstuk 8 van het stappenplan legt de vier verschillen uit, met de reden erbij.

## Gecontroleerd

Beide versies compileren foutloos met `tsc --noEmit` onder de meegeleverde
`Frontend/tsconfig.json` (strict, noUnusedLocals, noUnusedParameters, erasableSyntaxOnly).
De vijf endpoints van de server zijn getest tegen `kaarten.json`; de data staat daarna
weer zoals ze was.
