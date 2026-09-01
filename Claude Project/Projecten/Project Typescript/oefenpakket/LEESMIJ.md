# Oefenpakket — Ruilkaartenbibliotheek

Drie mappen, bedoeld om in deze volgorde te gebruiken. Ze horen bij de cursus
*Het examen aanpakken, begrijpen en maken*.

    1-Beginproject-kaal/         exact de startbestanden van het examen
    2-Beginproject-met-steigers/ dezelfde bestanden, met genummerde TODO's
    3-Oplossingsproject/         de volledig uitgewerkte oplossing

## Hoe je hiermee werkt

**Ronde 1 — leren.** Open `2-Beginproject-met-steigers`. Elk bestand dat jij moet
schrijven bestaat al, met TODO's erin die genummerd zijn per les: `TODO 4.1` hoort bij
les 4, `TODO 6.3` bij les 6. Lees de les, vul de TODO's van die les in, test, en ga pas
dan verder. Loop je vast, kijk in `3-Oplossingsproject`.

**Ronde 2 — testen.** Kopieer `1-Beginproject-kaal` naar een nieuwe map en maak het
examen opnieuw, van nul, met alleen `opgave.md` ernaast. Zet een timer. Dit is de
enige manier om te weten of je het écht kan.

**Nakijken.** In `3-Oplossingsproject` staan twee versies van dezelfde oplossing:
`Frontend/src/` is de uitgebreide versie, `_examenversie/src/` de eenvoudigste vorm.
Vergelijk met de eenvoudige — dat is wat je op het examen zou schrijven.

## Elk project starten

Elke map is een volwaardig project. Je installeert per map, en je hebt twee terminals nodig.

```bash
cd <map>/Server    && pnpm install && pnpm dev    # http://localhost:3000
cd <map>/Frontend  && pnpm install && pnpm dev    # http://localhost:5173
```

De steigerversie start meteen: je krijgt een lege pagina, want de router is nog niet
gekoppeld. Dat is het beginpunt van les 4.

> **Data terugzetten.** Heb je met POST of DELETE de kaarten vervuild, kopieer dan
> `Server/src/data/backupKaarten.json` over `kaarten.json`. Zit je collectie in de war,
> verwijder dan de localStorage-sleutel `collectie` via DevTools → Application.

## Overzicht van de TODO's

| TODO | Bestand | Les |
|---|---|---|
| 4.1 – 4.2 | `data/data.ts` | 4 — de data managers |
| 4.3 – 4.5 | de drie componenten | 4 — elementen registreren |
| 4.6a / 4.6b | de twee pagina's | 4 — componenten importeren |
| 4.7 | `main.ts` | 4 — de router opstarten |
| 5.1 – 5.2 | `kaartKaart.ts` | 5 — kaarten tonen |
| 5.3 – 5.4 | `kaarten.ts` | 5 — kaarten tonen |
| 6.1 – 6.2 | `kaartKaart.ts` | 6 — toevoegen aan de collectie |
| 6.3 – 6.4 | `kaarten.ts` | 6 — toevoegen aan de collectie |
| 7.1 – 7.3 | `collectieItem.ts` | 7 — collectie tonen en verwijderen |
| 7.4 – 7.5 | `collectie.ts` | 7 — collectie tonen en verwijderen |

Aan de map `Server/` verander je in geen van de drie projecten iets.
