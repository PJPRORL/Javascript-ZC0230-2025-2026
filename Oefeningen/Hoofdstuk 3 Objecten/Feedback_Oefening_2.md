# Feedback Oefening 2

Hier is mijn docenten-feedback voor `Oefening_2.js`. Je hebt de stappen uit de vorige oefening al mooi meegenomen en de opzet met `createBook` is een perfect begin! Er zijn wel nog vier conceptuele verbeterpunten die de rest van je code een stuk logischer zullen maken:

## 1. Een Functie versus een Methode
De opdracht vraagt heel specifiek: *"Voeg daarnaast nog een extra methode toe die het type boek bepaalt..."*. 
Jij hebt momenteel een losstaande functie genaamd `typeOfBook` in je code geplaatst. In JavaScript (en eigenlijk elke programmeertaal) is een **methode** een functie die vastzit aan/binnenin het object (zoals je dat met `getInfo` al heel goed hebt gedaan).

*Hint:* Neem je `typeOfBook`-logica en geef deze een plekje *binnenin* het object dat je teruggeeft via de `createBook` functie.

## 2. Verwarring rond `this` en parameters in je IF-statements
In je huidige (losse) functie noem je de binnenkomende parameter `books`. Binnen in die functie probeer je `this.books.title` uit te lezen. Dat botst een beetje; want als de parameter `books` een object is dat je er in gooit, bestaat er binnenin niet nóg een property die `books` heet (`books.books.title`). Dat gaf je waarschijnlijk de `undefined` teksten!

Het leuke is: zodra je er een échte methode in je object van maakt (zie punt 1), valt dit hele probleem weg. Je object weet dan over welk boek het gaat, waardoor je je parameter mag weglaten. Je kunt in al je if-checks dan gewoon rechtstreeks praten tegen `this.wordCount` of `this.title`.

## 3. Check je drempelwaarden (en je commentaar!)
Je had de controle op `undefined` (Unknown) slim bedacht, maar als commentaar (`//`) uit je code gehaald. Haal dit best even terug uit commentaar, want je hebt dit hard nodig! Als een woordwaarde `undefined` is, en je test of die kleiner is dan een getal (bv. `< 7500`), dan zal JavaScript `false` zeggen. Zonder die "Unknown"-check zal elk boek zonder woordenaantal per ongeluk als een "Doorstopper" aanzien worden (want het valt door al je regels naar de finale `else`).

*Lees ook nog even de opdracht er op na:* Je hebt de categorie "Novelette" per ongeluk overgeslagen en je drempel voor "Novella" wijkt een klein beetje af van de theorie.

## 4. Kies de juiste Loop: Arrays versus Objecten
In oefening 1 bestond jouw data uit een gigantisch "Hoofd-Object" (met accolades `{ }`). Daar was de `for...in` loop een meesterlijke en juiste keuze.
In deze oefening zie je op in regel 15: `const books = [`. Die vierkante haakjes `[ ]` geven aan dat dit hele ding een **Array** (een lijst) is. Voor Arrays in JavaScript gebruiken we liever een `for...of` loop!

*Probeer dit eens te veranderen:* Als je `for (const book in books)` verandert naar `for (const book of books)`, dan geeft het woordje `of` jou in élke ronde rechtstreeks dat éne specifieke boek. Al je andere ingewikkelde lijntjes daaronder (rond instantiëren via `[book]`, of die controle op `Object.hasOwn`) mag je dan gewoon volledig weggooien! Dat maakt alles plots extreem leesbaar!

--- 

Probeer dit stapje voor stapje toe te passen. Begin met de verhuis van je type-bepaler (puntje 1) naar de juiste plaats, en dan vallen puzzelstukken 2, 3 en 4 vanzelf in elkaar. 

---

## Nieuwe Feedback op je laatste aanpassingen (`Oefening_2.js`)

Goed bezig! Je hebt de functie `typeOfBook` mooi als methode toegevoegd aan het object dat door `createBook` wordt teruggegeven. Je bent zeker op de goede weg! Hier zijn nog een paar tips om de laatste details recht te trekken:

### 1. Eigenschappen van het object aanspreken (`this`)
In je `typeOfBook` methode probeer je de eigenschappen van het boek op te halen via `books.wordCount` en `this.books.title`. 
Vergeet niet wat het sleutelwoord `this` precies doet binnen een methode: het verwijst naar de attributen van het *huidige object* zelf. Hoe zou je de `wordCount` en `title` van dat specifieke boek opvragen zonder de naam van de array (`books`) op te geven of de onbestaande property `this.books` te gebruiken? (Hint: je kan gewoon rechtstreeks de eigenschappen benaderen via `this`).

### 2. De categorieën en drempelwaarden nakijken
Kijk nog eens goed naar de opdracht voor de woordgrenzen en de verwachte teksten. 
- Je hebt `novella` staan bij `< 20000`, maar volgens de opdracht is dat een 'Novelette'. 
- Een 'Novella' is de categorie voor boeken met minder dan 40.000 woorden.
- Let ook op de opmaak/hoofdletters van de gewenste tekst (bijv. 'Short Story' in plaats van 'short story'), anders komt je mogelijke output niet exact overeen met het voorbeeld uit de opdracht.

### 3. De methode oproepen in de loop
Helemaal onderaan in je nieuwe `for`-loop, roep je nu `console.log(typeOfBook());` aan. Omdat de loop nu niet meegeeft *op welk boek* je de methode wilt oproepen, zal JavaScript proberen om `typeOfBook()` als een losstaande globale functie te zien (die nu niet meer bestaat, want dit is immers een methode *binnen* een boek geworden).
Je moet de methode dus aanroepen *op* het specifieke boek-object in de array. Hoe heb je in een klassieke `for`-loop toegang tot de eigenschappen of methodes van één specifiek item dat op de huidige tellerpositie (`index`) in een array (`books`) zit?
*(In navolging van puntje 4 van de oude feedback: je mag hier natuurlijk ook nog steeds een `for...of` loop inzetten. Hoe haal je daarna binnen iedere iteratie van de 'book' variabele de methode `typeOfBook()` op? Dat gaat sneller te schrijven en te lezen zijn!)*

Zet nog even door, je bent er bijna aan de eindstreep! Succes!
