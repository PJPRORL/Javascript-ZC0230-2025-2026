# Vergelijking: Mijn Oplossing vs. Officiële Oplossing

> Dit document vergelijkt mijn uitgewerkte code met de officiële modeloplossing van de docent.
> Doel: na het examen terugkijken en leren van de verschillen.

---

## Overzichtstabel

| Onderdeel | Mijn Oplossing | Officiële Oplossing | Winnaar |
|---|---|---|---|
| **Fetch methode** | `async/await` + `try/catch` | `.then()` chaining + `.catch()` | 🟰 Gelijkwaardig |
| **Foutmelding** | Klassen toevoegen + tekst instellen | `hidden` attribuut togglen | 🏆 Officieel |
| **Producten renderen** | `forEach` + `appendChild` | `.filter().map()` in één ketting | 🏆 Officieel |
| **Kaart (card) opbouw** | Volledig correct, met `h-100` | Correct, zonder `h-100` | 🏆 Mijn oplossing |
| **Prijs formatting** | `€${price.toFixed(2)}` | `Intl.NumberFormat('nl-BE')` | 🏆 Officieel |
| **Categorieknoppen** | **Dynamisch** via JS (unieke array) | Hardgecodeerd in HTML | 🏆 Mijn oplossing |
| **Filter logica** | Aparte listener per knop + losse "All" listener | Eén `renderItems(filter)` functie | 🏆 Officieel |
| **Cart datastructuur** | Array (`[]`) + `.find()` | Object (`{}`) + sleutel-opzoeking | 🏆 Officieel |
| **Cart teller update** | Handmatige `forEach` optelling | `.reduce()` one-liner | 🏆 Officieel |
| **Verwijder logica** | `.filter()` op de array | `delete cart[id]` op het object | 🟰 Gelijkwaardig |
| **Checkout** | `alert()` + cart legen + re-render | `alert()` + cart legen + re-render | 🟰 Gelijkwaardig |
| **Commentaren** | ✅ Veel, goed leesbaar | ❌ Weinig, enkel JSDoc | 🏆 Mijn oplossing |
| **Code lengte** | 231 regels | 179 regels | 🏆 Officieel |

---

## Gedetailleerde Analyse per Onderdeel

### 1. Data Ophalen (Fetch)

| | Mijn code | Officiële code |
|---|---|---|
| **Methode** | `async/await` | `.then()` chaining |
| **Regels** | 5 regels | 4 regels |

**Mijn aanpak:** Ik gebruik `async function ophalenData()` met `await fetch(...)` en een `try/catch` blok. Dit is de modernere syntax.

**Officiële aanpak:** De docent gebruikt de klassieke `fetch().then().then().catch()` ketting. Compacter, maar moeilijker leesbaar bij complexere logica.

**Oordeel:** Beide zijn 100% correct. `async/await` is zelfs de nieuwere standaard en wordt in de industrie steeds vaker geprefereerd. Geen puntenaftrek hier.

---

### 2. Foutmelding

**Mijn aanpak:** Bij een fout selecteer ik de foutmelding-div, voeg ik handmatig de `alert` klasse toe, en stel ik de tekst in via `textContent`.

**Officiële aanpak:** De docent heeft de foutmelding **al volledig klaargezet** in de HTML (met tekst, klassen, en een `hidden` attribuut). Bij een fout wordt simpelweg `hidden = false` gezet. Dat is één simpele regel.

**Oordeel:** De officiële aanpak is eleganter. Als je weet dat een element er altijd zal zijn, zet het dan alvast in de HTML en verberg het. Dit voorkomt foutgevoelige handmatige klasse-manipulatie.

> **💡 Leerpunt:** Gebruik het `hidden` attribuut om elementen te verbergen/tonen. Het is korter en minder foutgevoelig dan klassen toevoegen/verwijderen.

---

### 3. Producten Renderen

**Mijn aanpak:**
```javascript
data.products.forEach(product => producten.appendChild(createProduct(product)));
```

**Officiële aanpak:**
```javascript
products.filter(i => filter === 'all' || i.category === filter).map(i => productList.appendChild(buildProduct(i)))
```

**Oordeel:** De docent combineert het renderen én filteren in één compacte functie `renderItems(filter = 'all')`. Hierdoor hoeft hij maar op één plek code te schrijven voor het tonen van producten, ongeacht of het gefilterd is of niet. Ik heb dezelfde render-logica op 3 plekken staan (bij het laden, bij een filter-klik, en bij "All products").

> **💡 Leerpunt:** Als je dezelfde actie op meerdere plaatsen uitvoert, maak er dan één functie van met een parameter. Dit heet het **DRY-principe** (Don't Repeat Yourself).

---

### 4. Kaart (Card) Opbouw

**Mijn aanpak:** Ik voeg `h-100` toe aan elke kaart, waardoor alle kaarten in een rij dezelfde hoogte hebben. Ook heb ik een aparte `productHeader` div met flexbox voor de titel en prijs naast elkaar.

**Officiële aanpak:** De docent voegt de prijs-badge direct als kind van de `<h5>` titel toe, zonder een aparte header-div.

**Oordeel:** Mijn kaart-opbouw is eigenlijk netter! De `h-100` klasse zorgt voor een mooiere visuele uitlijning. En een aparte header-div met flexbox is semantisch correcter dan een `<span>` direct in een `<h5>` te nesten.

---

### 5. Categorieknoppen (Filters)

**Mijn aanpak:** Ik bouw dynamisch een lijst met unieke categorieën door over alle producten te loopen, duplicaten te filteren met `.includes()`, en daarna per unieke categorie een knop aan te maken via JavaScript.

**Officiële aanpak:** De docent heeft **alle 6 filterknoppen hardgecodeerd** in de HTML met een `data-category` attribuut. De JavaScript selecteert ze met `querySelectorAll('.filter-btn')`.

**Oordeel:** 🎉 **Mijn oplossing is hier beter!** Als er morgen een nieuwe categorie wordt toegevoegd aan de JSON-data (bijv. "Accessories"), werkt mijn code automatisch. Bij de officiële oplossing moet je handmatig een nieuwe `<button>` toevoegen in de HTML. Mijn aanpak is flexibeler en schaalbaarder.

---

### 6. Filter Logica

**Mijn aanpak:** Ik heb per knop een aparte `addEventListener` die het scherm leegmaakt en dan een `forEach` met `if` uitvoert. De "All products" knop heeft een compleet aparte listener.

**Officiële aanpak:** Eén functie `renderItems(filter = 'all')` die altijd wordt aangeroepen. De `filter`-parameter bepaalt wat wordt getoond. De knoppen roepen allemaal dezelfde functie aan met hun `data-category` als argument.

**Oordeel:** De officiële oplossing is veel compacter en onderhoudsvriendelijker. Ik herhaal de logica van "leegmaken + tekenen" op drie plekken. De docent doet het op exact één plek.

> **💡 Leerpunt:** Gebruik `data-*` attributen in HTML om data aan elementen te koppelen. Je kan ze uitlezen met `element.getAttribute('data-category')` en als parameter meegeven aan een universele render-functie.

---

### 7. Winkelwagen Datastructuur

**Mijn aanpak:** Een **Array** (`let cart = []`). Om te checken of een product al in de kar zit, gebruik ik `.find(item => item.id === product.id)`.

**Officiële aanpak:** Een **Object** (`let cart = {}`). Het product-ID wordt als sleutel gebruikt: `cart[item.id]`. Controleren of het er al in zit is simpelweg `if (cart[item.id])`.

| Actie | Mijn code (Array) | Officiële code (Object) |
|---|---|---|
| Opzoeken | `cart.find(i => i.id === product.id)` | `cart[item.id]` |
| Toevoegen | `cart.push(product)` | `cart[item.id] = {...item, amount: 1}` |
| Verwijderen | `cart = cart.filter(...)` | `delete cart[product.id]` |
| Teller | Handmatige `forEach` loop | `Object.values(cart).reduce(...)` |

**Oordeel:** Het Object-patroon is hier slimmer. Opzoeken is direct (O(1) in plaats van O(n)), en verwijderen is eenvoudiger. Daarnaast gebruikt de docent de **spread operator** (`{...item, amount: 1}`) om een kopie te maken van het product-object, wat veiliger is dan direct het originele object te muteren.

> **⚠️ Leerpunt (Mutatie):** Ik doe `product.quantity = 1`, waardoor ik een `quantity` eigenschap toevoeg aan het **originele** product-object uit de JSON-data. Dit kan onverwachte bijeffecten veroorzaken als dat object elders hergebruikt wordt (bijv. bij het herfilteren). De docent voorkomt dit door een kopie te maken met `{...item, amount: 1}`.

---

### 8. Herbruikbaarheid van Code

**Mijn aanpak:** De volledige cart-item HTML wordt rechtstreeks in de `renderCart` functie gebouwd.

**Officiële aanpak:** De docent heeft:
- `buildCartItem()` — apart blok voor één winkelwagen-item
- `buildCheckoutButton()` — apart blok voor de checkout-sectie
- `buildJustifiedBetweenFlexContainer()` — herbruikbare hulpfunctie voor flexbox-containers

**Oordeel:** De officiële oplossing toont een professionelere structuur met kleine, herbruikbare bouwblokken. Dit maakt de code makkelijker te onderhouden en te begrijpen.

---

## Eindconclusie

| Criterium | Mijn Oplossing | Officiële Oplossing |
|---|---|---|
| **Werkt het?** | ✅ Ja, volledig | ✅ Ja, volledig |
| **Leesbaarheid** | ⭐⭐⭐⭐ Zeer goed (veel commentaren) | ⭐⭐⭐ Goed (weinig commentaren) |
| **DRY principe** | ⭐⭐ Matig (herhaling bij filters) | ⭐⭐⭐⭐ Zeer goed |
| **Schaalbaarheid** | ⭐⭐⭐⭐ Goed (dynamische knoppen) | ⭐⭐⭐ Matig (hardcoded knoppen) |
| **Professionaliteit** | ⭐⭐⭐ Goed | ⭐⭐⭐⭐ Zeer goed |
| **Kaart styling** | ⭐⭐⭐⭐ Beter (`h-100`, flexbox header) | ⭐⭐⭐ Goed |

---

## Verbeterpunten voor de toekomst

1. 🔴 **Gebruik `hidden`** om foutmeldingen te tonen/verbergen in plaats van klassen toe te voegen.
2. 🔴 **Maak één universele render-functie** met een filter-parameter in plaats van dezelfde logica op 3 plekken te herhalen.
3. 🔴 **Gebruik een Object (`{}`)** als "opzoektabel" wanneer je items wil bijhouden op basis van een ID.
4. 🔴 **Gebruik de spread operator (`{...obj}`)** om kopieën te maken van objecten in plaats van het origineel te muteren.
5. 🟢 **Wees trots** op de dynamische categorie-knoppen — dat was slimmer dan de officiële oplossing!
6. 🟢 **Wees trots** op de commentaren — die maken de code veel beter leesbaar dan de officiële oplossing.
7. 🟢 **Wees trots** op de kaart-styling — de `h-100` klasse en flexbox header waren netheid die de docent miste.
