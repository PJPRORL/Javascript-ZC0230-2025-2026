# Examen 2025-2026

Tijdens dit examen bouw je een **Ruilkaartenbibliotheek** applicatie. Je kan de beschikbare ruilkaarten raadplegen
vanuit een database (via een API) en een eigen collectie samenstellen in local storage van de browser.

**Je wordt niet beoordeeld op de opmaak (lay-out) van je code.
Als deze niet 100% overeenkomt met de screenshots is dit dus geen probleem.
Je wordt enkel beoordeeld op de functionaliteit.**

Maak doorheen het volledige examen gebruik van TypeScript, zorg ervoor dat de volledige applicatie strongly typed is.

Doorheen het volledige examen is het de bedoeling dat elke wijziging meteen zichtbaar is na het drukken op de knop,
niet pas na een refresh/navigate. Dit doe je door correct gebruik te maken van het observer patroon aangereikt in
de PersistenceProviders.

INFO: In de code worden de Engelse termen ook gebruikt naast de Nederlandse (kaart/card, collectie/collection).

TIP: raak je op een bepaald moment vast omdat je 'rommeldata' hebt, probeer dan eerst om de localstorage data van
de localhost te verwijderen in je browser (vraag aan je docent indien onduidelijk).

## Setup

De startbestanden bevatten 2 projecten, een Server project en een Frontend project. Je past in het Server project
niets aan, met uitzondering van de backupgegevens terugzetten indien nodig.

Installeer beide projecten in de juiste folders (zoals aangeleerd in de cursus), en start het Server project.
Controleer in de terminal output dat je Server project zeker op poort 3000 draait (achteraan de url).
Indien niet roep je de docent er even bij.

## Pagina's & componenten (1 punt)

De startbestanden bevatten twee pagina's en drie custom elementen.
Zorg ervoor dat de pagina's bereikbaar zijn op '/' en '/collectie'.
Je toont de kaartenpagina op de root en de collectiepagina op '/collectie'.

Zorg er verder ook voor dat de custom elements geregistreerd worden; voor de navbar gebruik je de naam `custom-navbar`,
voor de andere elementen kan je zelf een naam kiezen.
Zorg ervoor dat de links in de navbar correct werken (zoals aangeleerd in de cursus).

TIP: voorzie voor elk van deze componenten en pagina's al een TypeScript bestand met de juiste klasse die voorlopig
enkel de HTML toont. Op deze manier kan je alles al correct oproepen en je werk testen.
De inhoud werk je af later in dit examen en telt nog niet mee voor de punten van deze vraag.

De screenshots bij deze opgave vind je in
`Startbestanden/ruilkaartenbibliotheek-compleet/Ruilkaartenbibliotheek/screenshots/`.

## Kaartenpagina

### Kaarten inladen en tonen (5 punten)

Gebruik de API (http://localhost:3000/kaarten) om alle ruilkaarten in de database op te halen en deze weer te geven
op de home pagina.
Gebruik de HTML-code die je in de startbestanden vindt (kaartKaart/kaartKaart.html) om een custom element te bouwen
dat de informatie over één kaart weergeeft.

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de RestPersistenceProvider om de kaarten op te halen.

Maak voor elke kaart een nieuwe instantie van het custom element en voeg deze toe op de correcte plaats om de
kaarten te tonen.

Om de maximumscore op deze vraag te behalen moeten de custom events nog niet afgewerkt zijn, de properties wel.

TIP: Je kan enkel strings doorgeven als properties aan een custom element en de properties ervan moeten in kebab-case
(kleine letters en liggend streepje) geschreven zijn en niet in camelCase.

ALTERNATIEF: Krijg je de persistence provider niet aan de praat? Maak dan een array aan van TradingCard objecten
en gebruik deze voor maximum 3 van de 5 punten.

### Kaart toevoegen aan collectie (4 punten)

Gebruik een custom event in de kaartKaart om een kaart toe te voegen aan de collectie.
Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de LocalStoragePersistenceProvider om de collectie
op te slaan.
Zorg ervoor dat het symbool op de knop wijzigt naar een checkmark (&check;) wanneer de kaart al in de collectie zit.
Als de kaart al in de collectie zit en je klikt opnieuw op de knop, wordt de kaart verwijderd uit de collectie.

Controleer bij het toevoegen of er al een kaart met dezelfde naam in de collectie zit.
Als dat het geval is, toon dan een meldingspopup en doe verder niets.

## Collectiepagina

### Collectie inladen en tonen (4 punten)

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de LocalStoragePersistenceProvider om de collectie
in te laden en weer te geven op de collectiepagina.

Gebruik het custom element `collectieItem` om de informatie over één kaart weer te geven in de collectie.
Gebruik een template literal om de naam en waarde van de kaart in 1 regel weer te geven.
Toon ook de totale waarde van de collectie.

Om de maximumscore op deze vraag te behalen moet de event nog niet afgewerkt zijn, de properties wel.

### Kaart verwijderen uit collectie (2 punten)

Zorg ervoor dat een kaart verwijderd kan worden uit de collectie via de X-knop in het collectieItem element.
Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de LocalStoragePersistenceProvider om de kaart
te verwijderen.

Maak hier geen gebruik van een custom event maar zorg ervoor dat het collectieItem element de delete zelf afhandelt.
