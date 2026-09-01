# Oefenversie — Ruilkaartenbibliotheek

Het examenproject met de zeven TypeScript-bestanden leeggemaakt. Alles wat je op het
examen kado krijgt staat er wel al in: de Server, de HTML, de CSS, de router en de
persistence providers.

## Starten

Twee terminals, allebei open laten:

```
cd Server    && pnpm install && pnpm dev    # http://localhost:3000
cd Frontend  && pnpm install && pnpm dev    # http://localhost:5173
```

Controleer in de output van de server dat er echt **3000** staat.

Bij de start zie je een witte pagina — dat klopt: `main.ts` maakt nog geen router aan.
Dat is vraag 1.

## Wat jij schrijft

| Bestand | Vraag | Punten |
|---|---|---|
| `Frontend/src/main.ts` | routetabel | 1 |
| `Frontend/src/components/navbar/navbar.ts` | 1 | |
| `Frontend/src/components/kaartKaart/kaartKaart.ts` | 1, 2, 3 | |
| `Frontend/src/components/collectieItem/collectieItem.ts` | 1, 4, 5 | |
| `Frontend/src/pages/kaarten/kaarten.ts` | 1, 2, 3 | 5 + 4 |
| `Frontend/src/pages/collectie/collectie.ts` | 1, 4 | 4 |
| `Frontend/src/data/data.ts` | providers | |

Elk van die bestanden begint met een blok TODO's in de volgorde waarin je ze het best
aanpakt. Aan `Server/` verander je niets.

## Volgorde die werkt

1. **Vraag 1 eerst, helemaal.** Navbar, beide pagina's en de router. Je ziet dan twee
   pagina's met werkende links en verder lege inhoud. Alles wat daarna komt bouwt hierop.
2. **`data.ts`** — zonder providers kan je niets ophalen.
3. **Vraag 2** — kaarten tonen. Eerst de getters en `connectedCallback` van `kaartKaart`,
   dan pas het observer-gedeelte in `kaarten.ts`.
4. **Vraag 4** — de collectiepagina. Die lijkt sterk op vraag 2 en is dus goedkoop
   te maken zodra vraag 2 lukt.
5. **Vraag 3 en 5** — de knoppen.

## Waar het meestal misgaat

- `super.connectedCallback()` of `super.render()` vergeten als eerste regel. Dan staat de
  HTML nog niet in de DOM en geeft `querySelector` `null`.
- Abonneren ná `getAll()`. Die methode verwittigt de observers meteen, dus dan mis je de
  eerste melding en blijft je scherm leeg.
- `unsubscribe` niet bijhouden. Bij elke navigatie komt er dan een observer bij, en gaan
  dingen dubbel of driedubbel gebeuren.
- Attributen in camelCase (`kaartId`) in plaats van kebab-case (`kaart-id`).
- `textContent` gebruiken voor `&check;` — dat toont de letterlijke tekst. Gebruik
  `innerHTML`.
- Een provider aanmaken in een pagina in plaats van in `data.ts`. Dan heeft elk onderdeel
  zijn eigen observerlijst.

## Vastgelopen?

De volledig uitgewerkte versie staat in
`Startbestanden/ruilkaartenbibliotheek-compleet/Ruilkaartenbibliotheek/`, en de zeven
bestanden apart in `Startbestanden/oplossing-bestanden/`. De screenshots waar de opgave
naar verwijst staan in de `screenshots`-map van dat eerste project.

Rommeldata in je collectie? Verwijder de localStorage van `localhost` in je browser
(DevTools → Application → Local Storage).
