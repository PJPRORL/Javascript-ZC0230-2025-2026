import {collectieProvider} from '../../data/data.ts'
import type {Unsubscribe} from '../../data/persistenceProvider.ts'
import {attribuut, attribuutAlsGetal, zoek} from '../../dom.ts'
import {isZeldzaamheid, type Zeldzaamheid} from '../../models/tradingCard.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './kaartKaart.html?raw'

/** Wat er in het custom event zit. Geëxporteerd zodat de pagina hetzelfde type gebruikt. */
export interface KaartToggleDetail {
  kaartId: string
  naam: string
  waarde: number
}

// Twee uitbreidingen van bestaande DOM-types (declaration merging, Goldberg hfst. 11).
// Dit is puur type-informatie: er komt geen enkele regel JavaScript uit voort.
declare global {
  interface HTMLElementTagNameMap {
    // Hierdoor geeft document.createElement('kaart-kaart') een KaartKaart terug
    // in plaats van een kale HTMLElement.
    'kaart-kaart': KaartKaart
  }

  interface HTMLElementEventMap {
    // Hierdoor is `evt` in addEventListener('kaart-toggle', ...) meteen correct
    // getypeerd, zonder `as CustomEvent<...>`.
    'kaart-toggle': CustomEvent<KaartToggleDetail>
  }
}

/**
 * Custom element dat één ruilkaart toont.
 *
 * Attributen (altijd strings, altijd kebab-case):
 *   kaart-id, naam, serie, kaart-type, zeldzaamheid, aanvalskracht, waarde
 *
 * Uitgaand event: 'kaart-toggle' met KaartToggleDetail.
 */
export class KaartKaart extends CustomElement {
  #unsubscribe: Unsubscribe | null = null

  constructor() {
    super(html)
  }

  get kaartId(): string {
    return attribuut(this, 'kaart-id')
  }

  get naam(): string {
    return attribuut(this, 'naam')
  }

  get serie(): string {
    return attribuut(this, 'serie')
  }

  get kaartType(): string {
    return attribuut(this, 'kaart-type')
  }

  /**
   * Geeft de zeldzaamheid terug als één van de vier toegestane waarden, of null.
   * Het attribuut is een gewone string; `isZeldzaamheid` versmalt die naar de
   * literal union uit het model (type predicate, Goldberg hfst. 9).
   */
  get zeldzaamheid(): Zeldzaamheid | null {
    const waarde = attribuut(this, 'zeldzaamheid')
    return isZeldzaamheid(waarde) ? waarde : null
  }

  get aanvalskracht(): number {
    return attribuutAlsGetal(this, 'aanvalskracht')
  }

  get waarde(): number {
    return attribuutAlsGetal(this, 'waarde')
  }

  connectedCallback() {
    // Eerst de basisklasse: die hangt de HTML in de DOM.
    // Pas daarna vindt zoek() iets.
    super.connectedCallback()

    this.#vulGegevensIn()

    const knop = zoek<HTMLButtonElement>(this, '#add-button')
    knop.addEventListener('click', () => {
      // We handelen het toevoegen niet zelf af: we roepen om hulp met een custom event.
      // bubbles: true laat het omhoog borrelen tot bij de pagina.
      this.dispatchEvent(
        new CustomEvent('kaart-toggle', {
          bubbles: true,
          detail: {kaartId: this.kaartId, naam: this.naam, waarde: this.waarde},
        }),
      )
    })

    // Observer: zodra de collectie wijzigt, past dit element zijn eigen knop aan.
    this.#unsubscribe = collectieProvider.addObserver(items => {
      const zitInCollectie = items.some(item => item.kaartId === this.kaartId)
      knop.innerHTML = zitInCollectie ? '&check;' : '+'
    })
  }

  disconnectedCallback() {
    this.#unsubscribe?.()
    this.#unsubscribe = null
  }

  #vulGegevensIn() {
    zoek(this, '#serie').textContent = this.serie
    zoek(this, '#naam').textContent = this.naam
    zoek(this, '#type').textContent = this.kaartType
    zoek(this, '#aanvalskracht').textContent = String(this.aanvalskracht)
    zoek(this, '#waarde').textContent = `€ ${this.waarde.toFixed(2)}`

    const badge = zoek(this, '#zeldzaamheid-badge')
    const zeldzaamheid = this.zeldzaamheid
    if (zeldzaamheid !== null) {
      badge.textContent = zeldzaamheid
      // De klassen zeldzaamheid-gewoon/-ongewoon/-zeldzaam/-legendarisch staan in index.css.
      // Omdat zeldzaamheid hier de literal union is, kán deze klassenaam niet fout zijn.
      badge.classList.add(`zeldzaamheid-${zeldzaamheid}`)
    }
  }
}

customElements.define('kaart-kaart', KaartKaart)
