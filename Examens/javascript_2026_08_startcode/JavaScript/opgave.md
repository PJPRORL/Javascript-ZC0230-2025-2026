# JavaScript: Ruilkaartenbibliotheek (4 punten)

Maak een eenvoudige webpagina waarop een lijst met ruilkaarten wordt getoond met klassieke JavaScript DOM-manipulatie.

## Doel

Gebruik de gegeven array van kaartobjecten en render in de `toonKaartenVoorSerie` functie de kaarten van een
bepaalde serie.

Gebruik hiervoor de `maakKaartElement` functie die een HTML-element teruggeeft op basis van de gegeven template.

## Wat krijg je?

- Een HTML-pagina met een lege div voor de inhoud en een select om de serie te selecteren.
- Een array met kaartobjecten
- Een HTML-template voor 1 kaart (als commentaar in `app.js`)
- Een JS-script dat al gelinkt is aan het HTML-bestand, en reageert bij een wijziging in de select door de
  `toonKaartenVoorSerie` functie op te roepen met de geselecteerde serie.
- 2 lege functies die je zelf moet opbouwen

## Wat moet je doen?

1. Open de bestanden van deze oefening.
2. Gebruik de array `kaarten` uit `app.js`.
3. Maak voor elke kaart een HTML-element op basis van de gegeven template (via DOM!).
4. Voeg alle kaarten toe aan de pagina voor de geselecteerde serie.

## Voorwaarden

Gebruik DOM-methodes. Je kan niet slagen voor dit onderdeel als je enkel de HTML-code opvult!

## Verwachte structuur van 1 kaart

```html
<div class="card">
    <div class="card-header">
        <span class="badge serie">Vuurdraak</span>
        <span class="badge zeldzaamheid zeldzaam">zeldzaam</span>
    </div>
    <div class="card-body">
        <h2 class="card-naam">Vuurdrake Brutus</h2>
        <p class="card-type">Wezen</p>
        <p><strong>Aanvalskracht:</strong> 2400</p>
        <p><strong>Waarde:</strong> €12.50</p>
    </div>
</div>
```
