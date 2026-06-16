# Handleiding Webshop Examen — Augustus 2025 (volledig ingevuld)

Dit is een volledig ingevulde versie van de generieke examenhandleiding, specifiek voor het
**Herexamen 2024-2025 (Webshop / Winkelmandje)**. Alle plaatshouders zijn vervangen door de echte
benamingen uit dit examen.

> **Werk elke vraag apart af.** Eerst renderen laten werken, dan pas de filter erbij, dan pas
> korting, enz. Test na elke stap in de browser. Zo verlies je nooit punten van een werkende
> vraag door een latere fout.

---

## Overzicht benamingen in dit examen

| Wat | Naam |
|---|---|
| Model-interface (1 product) | `Product` |
| Model-interface (1 winkelmandje-item) | `CartItem` |
| Custom element productkaart | `CustomProductCard` |
| Tag productkaart | `custom-product-card` |
| Custom element winkelmandje-item | `CustomCartItem` |
| Tag winkelmandje-item | `custom-cart-item` |
| Productenpagina klasse | `ProductPage` |
| Winkelmandpagina klasse | `CartPage` |
| REST provider (API) | `productRestPersistenceProvider` |
| API URL | `http://localhost:3000/products` |
| localStorage provider | `cartLocalPersistenceProvider` |
| localStorage key | `'cart'` |

---

## STAP 1 — Routing + navbar (1 punt)

**Doel:** custom elements registreren, navbar bovenaan elke pagina, links werken, juiste paden.

### 1a. Maak een minimaal TS-bestand per pagina en per custom element

> **Belangrijk:** in de startbestanden krijg je wél de HTML maar niet altijd het bijhorende `.ts`-bestand.
> Die moet je dus zelf aanmaken. Voorzie voor elk een TS-bestand dat **enkel de HTML toont**.

**Productenpagina** — `pages/products/products.ts`:
```ts
import {Page} from '../../router/page.ts'
import HTML from './products.html?raw'

export class ProductPage extends Page {
  constructor() {
    super(HTML)
  }
  // render() vul je later aan (stap 2)
}
```

**Winkelmandpagina** — `pages/cart/cart.ts`:
```ts
import {Page} from '../../router/page.ts'
import HTML from './cart.html?raw'

export class CartPage extends Page {
  constructor() {
    super(HTML)
  }
  // render() vul je later aan (stap 6)
}
```

**Navbar** — `components/navbar/navbar.ts`:
```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class CustomNavbar extends CustomElement {
  constructor() {
    super(HTML)
  }
}
```

**Productkaart** — `components/productCard/product.ts`:
```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './product.html?raw'

export class CustomProductCard extends CustomElement {
  constructor() {
    super(HTML)
  }
  // observedAttributes + attributeChangedCallback komen in stap 2
}
```

**Winkelmandje-item** — `components/cartItem/cartItem.ts`:
```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './cartItem.html?raw'

export class CustomCartItem extends CustomElement {
  constructor() {
    super(HTML)
  }
  // observedAttributes + attributeChangedCallback komen in stap 6
}
```

### 1b. `src/main.ts` — registreren + router

```ts
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {ProductPage} from './pages/products/products.ts'
import {CartPage} from './pages/cart/cart.ts'

import {CustomNavbar} from './components/navbar/navbar.ts'
import {CustomCartItem} from './components/cartItem/cartItem.ts'
import {CustomProductCard} from './components/productCard/product.ts'

window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-cart-item', CustomCartItem)
window.customElements.define('custom-product-card', CustomProductCard)

new Router({
  '/': ProductPage,
  '/cart': CartPage
})
```

> **Let op:** elk custom element krijgt zijn eigen unieke tag-naam. `custom-product-card` ≠ `custom-cart-item`.
> De `import`-naam (bv. `CustomProductCard`) moet overeenkomen met de `export class` in dat bestand.

### 1c. De navbar HTML — links laten werken

In `components/navbar/navbar.html` staan de links:
```html
<a href="/">Overzicht</a>
<a href="/cart">Winkelmand</a>
```

> Als de startcode `data-link` attributen heeft, voeg die dan toe zodat de Router ze oppikt
> zonder volledige herlaad.

### 1d. Navbar bovenaan elke pagina-HTML

Zorg dat bovenaan `products.html` en `cart.html` dit staat:
```html
<custom-navbar></custom-navbar>
```

✅ **Test:** beide pagina's openen via de navbar.

---

## STAP 2 — Producten renderen (5 punten)

**Doel:** alle producten via de API ophalen en tonen met `CustomProductCard` per product.

### 2a. Provider aanmaken in `src/data/data.ts`

```ts
import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Product} from '../models/product.ts'

export const productRestPersistenceProvider = new RestPersistenceProvider<Product>('http://localhost:3000/products')
```

### 2b. Het custom element `components/productCard/product.ts`

> **Tip:** je kan enkel **strings** doorgeven aan een custom element, en de attribuut-namen
> moeten in **kebab-case** staan.

De `Product`-interface heeft: `id`, `name`, `price`, `category`. Je toont `name`, `price` en `category`.
Kijk in `product.html` welke id's de `<span>`-elementen hebben:
- `id="name"` → naam
- `id="price"` → prijs
- `id="category"` → categorie

```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './product.html?raw'

export class CustomProductCard extends CustomElement {
  static observedAttributes = ['name', 'price', 'category']

  readonly #name = this.componentBody.querySelector<HTMLElement>('#name')!
  readonly #price = this.componentBody.querySelector<HTMLElement>('#price')!
  readonly #category = this.componentBody.querySelector<HTMLElement>('#category')!

  constructor() {
    super(HTML)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.#name.innerText = newValue
        break
      case 'price':
        this.#price.innerText = Number(newValue).toFixed(2) + ' EUR'
        break
      case 'category':
        this.#category.innerText = newValue
        break
    }
  }
}
```

### 2c. De pagina `pages/products/products.ts`

Kijk in `products.html`: de container waar de productkaarten in moeten heeft `id="products"` (regel 36).

```ts
import {Page} from '../../router/page.ts'
import HTML from './products.html?raw'
import {productRestPersistenceProvider} from '../../data/data.ts'
import {Product} from '../../models/product.ts'

export class ProductPage extends Page {

  #productContainer = this.body.querySelector<HTMLDivElement>('#products')!
  #products: Product[] = []

  constructor() {
    super(HTML)

    // (a) observer: bij elke datawijziging de nieuwe lijst opslaan + herrenderen
    this.unsubscribe.push(productRestPersistenceProvider.addObserver(products => {
      this.#products = [...products]
      this.render()
    }))

    // (b) ophalen via de API -> verwittigt de observer -> UI vult zich
    void productRestPersistenceProvider.getAll()
  }

  render(): void {
    super.render()

    // (c) container leegmaken en per product een custom element bouwen
    this.#productContainer.innerHTML = ''
    this.#products.map(product => {
      const productRow = document.createElement('custom-product-card')   // ZELFDE naam als in main.ts!
      productRow.setAttribute('name', product.name)
      productRow.setAttribute('price', product.price.toFixed(2))
      productRow.setAttribute('category', product.category)

      this.#productContainer.appendChild(productRow)
    })
  }
}
```

> **CRITICAL:** de naam in `createElement('custom-product-card')` moet **exact dezelfde** tag-naam
> zijn als in `main.ts`: `customElements.define('custom-product-card', CustomProductCard)`.
> Een typefout = een leeg element zonder foutmelding.

> **CRITICAL:** de container selector moet `'#products'` zijn (het `id` uit de pagina-HTML),
> **NIET** `.card-body` (dat is een class in het component-HTML).

✅ **Test:** alle producten verschijnen als kaarten op de pagina.

---

## STAP 3 — Filteren (2 punten)

**Doel:** filteren op naam (tekst) en categorie (dropdown). Combinatie moet werken.
Pas filteren **bij klik op de knop** (`evt.preventDefault()` want het is een submit in een form).

### 3a. Filterelementen opzoeken

Voeg toe aan de `ProductPage` klasse (als velden bovenaan):

```ts
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!
  #categoryFilter = this.body.querySelector<HTMLSelectElement>('#category-filter')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!
```

### 3b. Listener voor de filterknop

Voeg toe in de **constructor** (niet in een observer!):

```ts
    this.#filterBtn.addEventListener('click', evt => {
      evt.preventDefault()
      this.render()
    })
```

### 3c. Filter toepassen in `render()` + aparte filterfunctie

Pas `render()` aan — voeg `.filter(...)` toe vóór `.map(...)`:

```ts
  render(): void {
    super.render()

    this.#productContainer.innerHTML = ''
    this.#products.filter(product => this.#productMatchesFilter(product)).map(product => {
      // ... (zelfde als stap 2c)
    })
  }

  #productMatchesFilter(product: Product): boolean {
    const nameMatches = product.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
    const categoryMatches =
      this.#categoryFilter.value === '0' ||
      product.category.toLowerCase() === this.#categoryFilter.value.toLowerCase()

    return nameMatches && categoryMatches
  }
```

> **Waarom `'0'`?** In `products.html` heeft de "All"-optie `value="0"`. Als die geselecteerd is,
> sla je de categoriefilter over.

✅ **Test:** filter op naam, op categorie, en op de combinatie.

---

## STAP 4 — Korting toepassen (2 punten)

**Doel:** met de "-10%" knop de prijs van een product met 10% verlagen via de **REST**-provider (`update`).

### 4a. Custom event toevoegen in `CustomProductCard`

In `components/productCard/product.ts`, voeg de knop-referentie en het event toe:

```ts
  readonly #discountBtn = this.componentBody.querySelector<HTMLButtonElement>('#discount-button')!

  constructor() {
    super(HTML)

    this.#discountBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('applyDiscount'))
    })
  }
```

### 4b. Luisteren op het event in `ProductPage`

In `render()`, per product, na het aanmaken van het element:

```ts
      productRow.addEventListener('applyDiscount', async () => {
        const currentPrice = product.price
        const discount = currentPrice * 0.9
        const updatedProduct = {...product, price: discount}
        await productRestPersistenceProvider.update(product.id, updatedProduct)
      })
```

> **Belangrijk:** je moet het `id` niet als attribuut meegeven voor korting, want je hebt `product.id`
> al beschikbaar in de closure van `.map(product => { ... })`.

✅ **Test:** klik op "-10%" → prijs daalt en blijft zo na refresh.

---

## STAP 5 — Toevoegen aan winkelmandje (3 punten)

**Doel:** met de "+" knop een product toevoegen aan het winkelmandje (localStorage).
Knop wisselt naar ✓ als het product al in het mandje zit.

### 5a. localStorage provider toevoegen in `data/data.ts`

Voeg toe aan het bestaande `data.ts`:

```ts
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {CartItem} from '../models/cartItem.ts'

export const cartLocalPersistenceProvider = new LocalStoragePersistenceProvider<CartItem>('cart')
```

### 5b. Custom event toevoegen in `CustomProductCard`

Voeg `'is-added'` toe aan `observedAttributes` en voeg de add-knop toe:

```ts
  static observedAttributes = ['name', 'price', 'category', 'is-added']

  readonly #addBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-button')!

  constructor() {
    super(HTML)

    this.#addBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('addToCart'))
    })

    // ... (discount event uit stap 4)
  }
```

Voeg de `'is-added'` case toe aan `attributeChangedCallback`:

```ts
      case 'is-added':
        if (newValue === 'true') {
          this.#addBtn.setAttribute('class', 'btn btn-success')
          this.#addBtn.innerHTML = '&check;'
        } else {
          this.#addBtn.setAttribute('class', 'btn btn-primary')
          this.#addBtn.innerHTML = '+'
        }
        break
```

> **Let op:** gebruik `innerHTML` (niet `innerText`) voor `&check;`, anders zie je letterlijk
> de tekst `&check;` in plaats van een vinkje ✓.

### 5c. De pagina luistert op het event + localStorage

In `ProductPage`, voeg toe:

**Imports en veld:**
```ts
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {CartItem} from '../../models/cartItem.ts'

// in de klasse:
  #cart: CartItem[] = []
```

**Observer + getAll in constructor** (naast de bestaande observer voor producten):
```ts
    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))

    void cartLocalPersistenceProvider.getAll()
```

**In render(), per product:**
```ts
      const cartItem = this.#cart.find(item => item.product.id === product.id)
      productRow.setAttribute('is-added', cartItem ? 'true' : 'false')

      productRow.addEventListener('addToCart', async () => {
        if (cartItem) {
          await cartLocalPersistenceProvider.delete(cartItem.id)
        } else {
          const newCartItem: CartItem = {product, id: crypto.randomUUID()}
          await cartLocalPersistenceProvider.create(newCartItem)
        }
      })
```

> **Hoe werkt dit?**
> - `cartItem` = zoek of dit product al in het mandje zit (`find` op `product.id`)
> - **Zit het er al in?** → `delete(cartItem.id)` (verwijder het uit het mandje)
> - **Zit het er nog niet in?** → `create(...)` met een nieuw `CartItem` object
> - De observer herrendert automatisch → knop wisselt meteen naar ✓ of +

> **Let op:** `cartItem.id` is het id van het **winkelmandje-item**, niet van het product.
> `product.id` is het id van het **product** uit de database.

✅ **Test:** product toevoegen → knop wisselt naar ✓. Nogmaals klikken → terug naar +.

---

## STAP 6 — Winkelmandje renderen (4 punten)

**Doel:** op de `/cart` pagina het winkelmandje tonen met `CustomCartItem` per item + totaalprijs.

### 6a. Het `CustomCartItem` component afwerken

In `components/cartItem/cartItem.ts`:

```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './cartItem.html?raw'
import {cartLocalPersistenceProvider} from '../../data/data.ts'

export class CustomCartItem extends CustomElement {

  static observedAttributes = ['title', 'id']

  #cartItem = this.componentBody.querySelector<HTMLElement>('#cart-item')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!

  constructor() {
    super(HTML)

    // Verwijderen rechtstreeks via de provider (stap 7 — geen custom event!)
    this.#deleteBtn.addEventListener('click', () => {
      void cartLocalPersistenceProvider.delete(this.id)
    })
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        this.#cartItem.innerText = newValue
        break
    }
  }
}
```

> **Let op:** `this.id` = het `id`-attribuut dat de pagina meegeeft met `setAttribute('id', cartItem.id)`.
> Dit is het id van het **winkelmandje-item** (niet van het product). De verwijder-functionaliteit
> (stap 7) zit hier al in — zo bespaar je tijd.

### 6b. De `CartPage` afwerken

Kijk in `cart.html`:
- De lijst-container: `id="cart-list"`
- Het totaal-element: `id="cart-total"`

In `pages/cart/cart.ts`:

```ts
import {Page} from '../../router/page.ts'
import HTML from './cart.html?raw'
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {CartItem} from '../../models/cartItem.ts'

export class CartPage extends Page {

  #cartList = this.body.querySelector<HTMLDivElement>('#cart-list')!
  #totalPrice = this.body.querySelector<HTMLSpanElement>('#cart-total')!

  #cart: CartItem[] = []

  constructor() {
    super(HTML)

    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))

    void cartLocalPersistenceProvider.getAll()
  }

  render(): void {
    super.render()

    this.#cartList.innerHTML = ''
    this.#cart.map(cartItem => {
      const cartItemElement = document.createElement('custom-cart-item')
      cartItemElement.setAttribute('title', `${cartItem.product.name} (${cartItem.product.price.toFixed(2)} EUR)`)
      cartItemElement.setAttribute('id', cartItem.id)

      this.#cartList.appendChild(cartItemElement)
    })

    const total = this.#cart.map(x => x.product.price).reduce((a, b) => a + b, 0)
    this.#totalPrice.innerText = total.toFixed(2)
  }
}
```

> **Template literal:** `${cartItem.product.name} (${cartItem.product.price.toFixed(2)} EUR)` 
> toont bv. "Laptop (899.99 EUR)" in één string.

> **Totaalprijs:** `map` haalt alle prijzen op → `reduce` telt ze op → `toFixed(2)` maakt er
> een mooi getal van.

✅ **Test:** de winkelmandpagina toont alle toegevoegde producten + de totaalprijs.

---

## STAP 7 — Verwijderen uit winkelmandje (3 punten)

**Doel:** een product uit het winkelmandje verwijderen — enkel uit localStorage, niet uit de database.

> **Belangrijk:** de opgave zegt expliciet: **geen custom event** gebruiken voor de maximumscore.
> Het component spreekt **rechtstreeks** de `cartLocalPersistenceProvider` aan.

Dit is **al afgewerkt in stap 6a** hierboven! In het `CustomCartItem` component staat:

```ts
    this.#deleteBtn.addEventListener('click', () => {
      void cartLocalPersistenceProvider.delete(this.id)
    })
```

> **Waarom werkt de UI vanzelf bij?** `delete()` verwittigt de observers → de `CartPage` herrendert
> automatisch → het item verdwijnt uit de lijst en de totaalprijs wordt herberekend.

> **Vergeet niet:** de pagina moet het `id` meegeven met `setAttribute('id', cartItem.id)` (zie stap 6b),
> anders is `this.id` leeg en kan `delete()` niets vinden.

✅ **Test:** klik op X → item verdwijnt uit winkelmandje maar blijft in de database (op de productenpagina).

---

## Het volledige `CustomProductCard` component (alle stappen samen)

Dit is het **eindresultaat** van `components/productCard/product.ts` na stap 2 + 4 + 5:

```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './product.html?raw'

export class CustomProductCard extends CustomElement {
  static observedAttributes = ['name', 'price', 'category', 'is-added']

  readonly #name = this.componentBody.querySelector<HTMLElement>('#name')!
  readonly #price = this.componentBody.querySelector<HTMLElement>('#price')!
  readonly #category = this.componentBody.querySelector<HTMLElement>('#category')!
  readonly #addBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-button')!
  readonly #discountBtn = this.componentBody.querySelector<HTMLButtonElement>('#discount-button')!

  constructor() {
    super(HTML)

    this.#addBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('addToCart'))
    })

    this.#discountBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('applyDiscount'))
    })
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.#name.innerText = newValue
        break
      case 'price':
        this.#price.innerText = Number(newValue).toFixed(2) + ' EUR'
        break
      case 'category':
        this.#category.innerText = newValue
        break
      case 'is-added':
        if (newValue === 'true') {
          this.#addBtn.setAttribute('class', 'btn btn-success')
          this.#addBtn.innerHTML = '&check;'
        } else {
          this.#addBtn.setAttribute('class', 'btn btn-primary')
          this.#addBtn.innerHTML = '+'
        }
        break
    }
  }
}
```

---

## De volledige `ProductPage` (alle stappen samen)

Dit is het **eindresultaat** van `pages/products/products.ts` na stap 2 + 3 + 4 + 5:

```ts
import {Page} from '../../router/page.ts'
import HTML from './products.html?raw'
import {productRestPersistenceProvider} from '../../data/data.ts'
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {Product} from '../../models/product.ts'
import {CartItem} from '../../models/cartItem.ts'

export class ProductPage extends Page {

  #productContainer = this.body.querySelector<HTMLDivElement>('#products')!
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!
  #categoryFilter = this.body.querySelector<HTMLSelectElement>('#category-filter')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!

  #products: Product[] = []
  #cart: CartItem[] = []

  constructor() {
    super(HTML)

    // Observer voor winkelmandje (localStorage)
    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))
    void cartLocalPersistenceProvider.getAll()

    // Observer voor producten (API)
    this.unsubscribe.push(productRestPersistenceProvider.addObserver(products => {
      this.#products = [...products]
      this.render()
    }))
    void productRestPersistenceProvider.getAll()

    // Filterknop
    this.#filterBtn.addEventListener('click', evt => {
      evt.preventDefault()
      this.render()
    })
  }

  render(): void {
    super.render()

    this.#productContainer.innerHTML = ''
    this.#products.filter(product => this.#productMatchesFilter(product)).map(product => {
      const cartItem = this.#cart.find(item => item.product.id === product.id)

      const productRow = document.createElement('custom-product-card')
      productRow.setAttribute('name', product.name)
      productRow.setAttribute('price', product.price.toFixed(2))
      productRow.setAttribute('category', product.category)
      productRow.setAttribute('is-added', cartItem ? 'true' : 'false')

      productRow.addEventListener('addToCart', async () => {
        if (cartItem) {
          await cartLocalPersistenceProvider.delete(cartItem.id)
        } else {
          const newCartItem: CartItem = {product, id: crypto.randomUUID()}
          await cartLocalPersistenceProvider.create(newCartItem)
        }
      })

      productRow.addEventListener('applyDiscount', async () => {
        const currentPrice = product.price
        const discount = currentPrice * 0.9
        const updatedProduct = {...product, price: discount}
        await productRestPersistenceProvider.update(product.id, updatedProduct)
      })

      this.#productContainer.appendChild(productRow)
    })
  }

  #productMatchesFilter(product: Product): boolean {
    const nameMatches = product.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
    const categoryMatches =
      product.category.toLowerCase() === this.#categoryFilter.value.toLowerCase() ||
      this.#categoryFilter.value === '0'

    return nameMatches && categoryMatches
  }
}
```

---

## Het volledige `data.ts` (providers)

```ts
import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Product} from '../models/product.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {CartItem} from '../models/cartItem.ts'

export const productRestPersistenceProvider = new RestPersistenceProvider<Product>('http://localhost:3000/products')

export const cartLocalPersistenceProvider = new LocalStoragePersistenceProvider<CartItem>('cart')
```

---

## Snelle checklist

- [ ] Voor elke **pagina** en elk **custom element** een `.ts`-bestand gemaakt
- [ ] Custom elements **geregistreerd** in `main.ts` met unieke tag-namen
- [ ] Navbar bovenaan `products.html` en `cart.html` + links werken
- [ ] `productRestPersistenceProvider` in `data.ts` (REST = API)
- [ ] `cartLocalPersistenceProvider` in `data.ts` (Local = localStorage met key `'cart'`)
- [ ] `ProductPage`: observer + `getAll()` + `render()` voor producten
- [ ] `ProductPage`: observer + `getAll()` voor winkelmandje (nodig voor knopstaat)
- [ ] Container selector = `'#products'` (id uit de HTML)
- [ ] `createElement('custom-product-card')` = zelfde naam als in `customElements.define`
- [ ] `CustomProductCard`: `observedAttributes` = `['name', 'price', 'category', 'is-added']`
- [ ] Filter op knop: `evt.preventDefault()` + `this.render()`
- [ ] Filter: `.toLowerCase().includes(...)` voor naam, `=== '0'` bypass voor categorie
- [ ] Korting: custom event `'applyDiscount'` → `update()` via REST met `price * 0.9`
- [ ] Winkelmandje: custom event `'addToCart'` → `create`/`delete` via localStorage
- [ ] Knopstaat `is-added`: `innerHTML = '&check;'` (niet `innerText`)
- [ ] `CartPage`: observer + `getAll()` + `render()` voor winkelmandje
- [ ] `CustomCartItem`: `observedAttributes` = `['title', 'id']`
- [ ] Verwijderen uit mandje: **geen** custom event, rechtstreeks `cartLocalPersistenceProvider.delete(this.id)`
- [ ] Totaalprijs: `.map(x => x.product.price).reduce((a, b) => a + b, 0).toFixed(2)`
- [ ] Alles **strongly typed** (TypeScript) — geen `any`
- [ ] Na ELKE stap testen in de browser

## Veelvoorkomende valkuilen

- **Verkeerde container selector** → `querySelector('#products')` niet `querySelector('.card-body')`
- **Verkeerd component geregistreerd** → importeer `CustomProductCard` uit `productCard/product.ts`, niet uit `cartItem/cartItem.ts`
- **Element niet geregistreerd** → tag verschijnt leeg. Eerst `customElements.define(...)` in `main.ts`
- **Attribuut staat niet in `observedAttributes`** → `attributeChangedCallback` loopt niet voor dat attribuut
- **`id` vergeten mee te geven** → verwijderen werkt niet (`this.id` is leeg)
- **Form herlaadt de pagina** bij de filterknop → `evt.preventDefault()`
- **`innerText` i.p.v. `innerHTML`** voor `&check;` → toont letterlijk `&check;` i.p.v. ✓
- **Event-naam mismatch** → `dispatchEvent(new CustomEvent('addToCart'))` in component maar `addEventListener('addToBasket', ...)` op pagina = werkt niet
- **Rommeldata in localStorage** → wis localStorage in DevTools (Application → Local Storage → localhost)
