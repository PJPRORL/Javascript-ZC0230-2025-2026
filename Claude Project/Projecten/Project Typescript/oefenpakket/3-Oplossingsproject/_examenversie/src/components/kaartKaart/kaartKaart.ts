import {collectieProvider} from '../../data/data.ts'
import type {Unsubscribe} from '../../data/persistenceProvider.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './kaartKaart.html?raw'

/**
 * Custom element dat één ruilkaart toont.
 *
 * Attributen (ALTIJD kebab-case en ALTIJD strings):
 *   kaart-id, naam, serie, kaart-type, zeldzaamheid, aanvalskracht, waarde
 *
 * Event dat het element uitstuurt:
 *   'kaart-toggle'  → detail: {kaartId, naam, waarde}
 */
export class KaartKaart extends CustomElement {
  // Hier bewaren we de "afmeld-functie" van de observer, zodat we geen geheugenlek maken.
  #unsubscribe: Unsubscribe | null = null

  constructor() {
    super(html)
  }

  // Getters vertalen de string-attributen naar bruikbare waarden.
  get kaartId(): string {
    return this.getAttribute('kaart-id') ?? ''
  }

  get naam(): string {
    return this.getAttribute('naam') ?? ''
  }

  get serie(): string {
    return this.getAttribute('serie') ?? ''
  }

  get kaartType(): string {
    return this.getAttribute('kaart-type') ?? ''
  }

  get zeldzaamheid(): string {
    return this.getAttribute('zeldzaamheid') ?? ''
  }

  get aanvalskracht(): number {
    return Number(this.getAttribute('aanvalskracht') ?? '0')
  }

  get waarde(): number {
    return Number(this.getAttribute('waarde') ?? '0')
  }

  connectedCallback() {
    // Laat de basisklasse eerst de HTML in de DOM zetten,
    // pas daarna kan je met querySelector in die HTML zoeken.
    super.connectedCallback()

    this.#vulGegevensIn()

    const knop = this.querySelector<HTMLButtonElement>('#add-button')!
    knop.addEventListener('click', () => {
      // We handelen het toevoegen NIET zelf af: we roepen om hulp met een custom event.
      // bubbles: true zorgt dat het event omhoog borrelt tot bij de pagina.
      this.dispatchEvent(
        new CustomEvent('kaart-toggle', {
          bubbles: true,
          detail: {kaartId: this.kaartId, naam: this.naam, waarde: this.waarde},
        }),
      )
    })

    // Observer patroon: zodra de collectie wijzigt, past dit element zijn eigen knop aan.
    this.#unsubscribe = collectieProvider.addObserver(items => {
      const zitInCollectie = items.some(item => item.kaartId === this.kaartId)
      knop.innerHTML = zitInCollectie ? '&check;' : '+'
    })
  }

  // Wordt opgeroepen wanneer het element uit de DOM verdwijnt (bv. bij navigeren).
  disconnectedCallback() {
    this.#unsubscribe?.()
    this.#unsubscribe = null
  }

  #vulGegevensIn() {
    this.querySelector('#serie')!.textContent = this.serie
    this.querySelector('#naam')!.textContent = this.naam
    this.querySelector('#type')!.textContent = this.kaartType
    this.querySelector('#aanvalskracht')!.textContent = String(this.aanvalskracht)
    this.querySelector('#waarde')!.textContent = `€ ${this.waarde.toFixed(2)}`

    const badge = this.querySelector('#zeldzaamheid-badge')!
    badge.textContent = this.zeldzaamheid
    // De klassen zeldzaamheid-gewoon / -ongewoon / -zeldzaam / -legendarisch staan in index.css.
    badge.classList.add(`zeldzaamheid-${this.zeldzaamheid}`)
  }
}

customElements.define('kaart-kaart', KaartKaart)
