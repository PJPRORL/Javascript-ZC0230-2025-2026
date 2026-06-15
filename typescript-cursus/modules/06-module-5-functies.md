# Module 5 — Functies

*Functie-argumenten*
*Erin aan de ene kant*
*Eruit als return type*

In Module 2 zag je hoe je type-annotaties op variabelen kunt plaatsen. Nu doen we hetzelfde voor **functieparameters** en **return types** — en je zult zien waarom dat zo nuttig is.

## Functieparameters

Bekijk deze functie:

```typescript
function zing(lied) {
    console.log(`Zingt: ${lied}!`);
}
```

Welk type is `lied`? Zonder annotatie beschouwt TypeScript het als `any`. Voeg een type-annotatie toe:

```typescript
function zing(lied: string) {
    console.log(`Zingt: ${lied}!`);
}
```

Nu weet TypeScript precies wat `lied` moet zijn.

### Verplichte parameters

Anders dan JavaScript controleert TypeScript het **aantal argumenten**:

```typescript
function zingTwee(eerste: string, tweede: string) {
    console.log(`${eerste} / ${tweede}`);
}

zingTwee("Ball and Chain");
// Error: Expected 2 arguments, but got 1.

zingTwee("I Will Survive", "Higher Love"); // OK

zingTwee("Go Your Own Way", "The Chain", "Dreams");
// Error: Expected 2 arguments, but got 3.
```

> **📝 Opmerking:** *Parameter* = wat de functie verwacht te ontvangen. *Argument* = de waarde die je meegeeft bij een aanroep.

### Optionele parameters

Gebruik `?` om een parameter optioneel te maken:

```typescript
function kondigAan(lied: string, artiest?: string) {
    console.log(`Lied: ${lied}`);
    if (artiest) {
        console.log(`Artiest: ${artiest}`);
    }
}

kondigAan("Greensleeves");           // OK
kondigAan("Greensleeves", "Beyoncé"); // OK
```

Het type van een optionele parameter is automatisch `T | undefined`. Optionele parameters moeten altijd **na** verplichte parameters staan.

### Standaardwaarden (defaults)

Je kunt ook een standaardwaarde geven — dan is de parameter niet `undefined` als hij wordt weggelaten:

```typescript
function beoordeel(lied: string, score = 5) {
    console.log(`${lied} krijgt een ${score}/10`);
}

beoordeel("Bohemian Rhapsody");    // "... krijgt een 5/10"
beoordeel("Stairway to Heaven", 9); // "... krijgt een 9/10"
```

TypeScript leidt het type af van de standaardwaarde: `score` is van type `number`.

### Rest Parameters

Gebruik `...` voor een onbeperkt aantal argumenten:

```typescript
function zingAlles(artiest: string, ...liederen: string[]) {
    for (const lied of liederen) {
        console.log(`${artiest} zingt: ${lied}`);
    }
}

zingAlles("Adele", "Hello", "Someone Like You", "Rolling in the Deep");
```

## Return Types

TypeScript leidt het return type af op basis van de `return`-statements:

```typescript
// Afgeleid return type: number
function optellen(a: number, b: number) {
    return a + b;
}
```

### Meerdere return-paden

Als een functie meerdere mogelijke return-waarden heeft, leidt TypeScript een union type af:

```typescript
// Return type: string | number
function geefGetal(invoer: string) {
    if (invoer === "antwoord") {
        return 42;
    }
    return invoer;
}
```

### Expliciet return type

Je kunt het return type ook **expliciet** aangeven na de parameterlijst:

```typescript
function optellen(a: number, b: number): number {
    return a + b;
}
```

Dit is nuttig om:
- Te **documenteren** wat een functie teruggeeft
- TypeScript te **dwingen** dat alle return-paden het juiste type teruggeven
- Snellere **type checking** in grote projecten

```typescript
function geefGetal(): string {
    return 42;
    // Error: Type 'number' is not assignable to type 'string'.
}
```

## Functie Types

In JavaScript zijn functies waarden — je kunt ze opslaan in variabelen, meegeven als argumenten, etc. TypeScript heeft een syntax om het **type** van een functie te beschrijven:

```typescript
// Functie type: (a: number, b: number) => number
let wiskundeOperatie: (a: number, b: number) => number;

wiskundeOperatie = (x, y) => x + y;  // OK
wiskundeOperatie = (x, y) => x * y;  // OK

wiskundeOperatie = (x) => x;
// Error: Type '(x: number) => number' is not assignable to
// type '(a: number, b: number) => number'.
```

### Functie types met type aliases

```typescript
type WiskundeOperatie = (a: number, b: number) => number;

const optellen: WiskundeOperatie = (a, b) => a + b;
const aftrekken: WiskundeOperatie = (a, b) => a - b;
const vermenigvuldigen: WiskundeOperatie = (a, b) => a * b;
```

> **💡 Tip:** Merk op dat je bij de implementatie **geen** type-annotaties hoeft toe te voegen aan `a` en `b` — TypeScript leidt ze af van het functie type.

### Functie types als parameters

```typescript
type StringTransformatie = (invoer: string) => string;

function pasToePrint(tekst: string, transformatie: StringTransformatie) {
    console.log(transformatie(tekst));
}

pasToePrint("hallo wereld", (s) => s.toUpperCase());
// Output: "HALLO WERELD"
```

## Void Returns

Sommige functies geven **niets** terug. Hun return type is `void`:

```typescript
function logBericht(bericht: string): void {
    console.log(bericht);
    // Geen return statement
}
```

`void` is anders dan `undefined`:
- `void` betekent: de functie is **niet bedoeld** om een waarde terug te geven
- `undefined` betekent: de functie geeft **expliciet** `undefined` terug

```typescript
function geeftVoid(): void {
    // OK — geen return
}

function geeftUndefined(): undefined {
    return undefined; // Moet expliciet undefined teruggeven
}
```

> **⚠️ Belangrijk:** JavaScript functies die niets returnen, geven impliciet `undefined` terug. Maar in TypeScript is `void` het conventionele type hiervoor.

## Never Returns

Sommige functies **kunnen nooit** een waarde teruggeven — ze gooien altijd een fout of draaien oneindig:

```typescript
function gooiFout(bericht: string): never {
    throw new Error(bericht);
}

function oneindeLus(): never {
    while (true) {
        console.log("Voor altijd...");
    }
}
```

`never` is het **bodemtype** — er kan geen waarde van dit type bestaan.

## Functie Overloads

Soms heeft een functie **verschillende handtekeningen** voor verschillende inputtypen:

```typescript
// Overload handtekeningen
function maakDatum(timestamp: number): Date;
function maakDatum(maand: number, dag: number, jaar: number): Date;

// Implementatie
function maakDatum(maandOfTimestamp: number, dag?: number, jaar?: number): Date {
    if (dag !== undefined && jaar !== undefined) {
        return new Date(jaar, maandOfTimestamp, dag);
    }
    return new Date(maandOfTimestamp);
}

const datumA = maakDatum(1234567890); // OK — 1 argument
const datumB = maakDatum(5, 15, 2023); // OK — 3 argumenten

const datumC = maakDatum(5, 15);
// Error: No overload expects 2 arguments.
```

> **📝 Opmerking:** Overloads worden in de praktijk niet zo vaak gebruikt. Vaak is een union type in de parameters eenvoudiger.

---

## Samenvatting

- **Functieparameters** kunnen type-annotaties krijgen: `functie(param: type)`
- TypeScript controleert het **aantal argumenten** bij een functie-aanroep
- **Optionele parameters** markeer je met `?`, **standaardwaarden** met `= waarde`
- **Rest parameters** (`...args: type[]`) vangen een onbeperkt aantal argumenten op
- TypeScript **leidt return types af**, maar je kunt ze ook expliciet aangeven
- **Functie types** beschrijven de handtekening: `(param: type) => returnType`
- `void` = geeft niets terug, `never` = kan nooit terugkeren
- **Overloads** laten toe dat een functie meerdere handtekeningen heeft

---

## Oefeningen

Maak deze in een bestand `module5.ts`.

1. **Getypte functie.** Schrijf een functie `begroet(naam: string, formeel: boolean): string` die:
   - Bij `formeel === true`: `"Goedendag, meneer/mevrouw naam"` teruggeeft
   - Bij `formeel === false`: `"Hey naam!"` teruggeeft

2. **Optionele parameter.** Schrijf een functie `berekenPrijs(bedrag: number, korting?: number): number` die het bedrag min de korting teruggeeft (standaard korting = 0).

3. **Rest parameters.** Schrijf een functie `som(...getallen: number[]): number` die alle getallen optelt.

4. **Functie type.** Maak een type alias `Filter` voor `(tekst: string) => boolean`. Schrijf twee functies die dit type implementeren: één die checkt of de tekst langer is dan 5 tekens, en één die checkt of de tekst een getal bevat.

5. **Void vs return.** Schrijf een functie `logArray(items: string[]): void` die elk item logt. Probeer `return "klaar"` toe te voegen en kijk wat TypeScript zegt.

Klaar? In **Module 6 (Arrays)** leer je hoe TypeScript met arrays en tuples omgaat.
