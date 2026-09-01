# Uitgewerkte oplossing — Ruilkaartenbibliotheek (examen augustus 2026)

Deze map bevat enkel de bestanden die jij op het examen zelf moet schrijven.
Kopieer ze over de gelijknamige paden in `TypeScript/Frontend/`.

    Frontend/src/main.ts                                   (aangevuld met de Router)
    Frontend/src/data/data.ts                              (de twee providers)
    Frontend/src/components/navbar/navbar.ts
    Frontend/src/components/kaartKaart/kaartKaart.ts
    Frontend/src/components/collectieItem/collectieItem.ts
    Frontend/src/pages/kaarten/kaarten.ts
    Frontend/src/pages/collectie/collectie.ts

Aan de map `Server/` verandert niets.

Gecontroleerd: deze code compileert foutloos met `tsc --noEmit` onder de
meegeleverde `Frontend/tsconfig.json` (strict, noUnusedLocals, noUnusedParameters,
erasableSyntaxOnly).

Starten:

    cd TypeScript/Server    && pnpm install && pnpm dev     # poort 3000
    cd TypeScript/Frontend  && pnpm install && pnpm dev     # poort 5173
