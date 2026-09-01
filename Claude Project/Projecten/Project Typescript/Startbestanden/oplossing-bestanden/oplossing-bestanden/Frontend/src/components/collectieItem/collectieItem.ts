import {collectieProvider} from '../../data/data.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './collectieItem.html?raw'

/**
 * Custom element dat één item uit de collectie toont.
 *
 * Attributen: item-id, naam, waarde
 *
 * Let op: dit element stuurt GEEN custom event uit. De opgave vraagt uitdrukkelijk
 * dat het element het verwijderen zelf afhandelt. Dat mag hier omdat de pagina toch
 * via een observer naar de provider luistert en dus vanzelf hertekent.
 */
export class CollectieItemElement extends CustomElement {
  constructor() {
    super(html)
  }

  get itemId(): string {
    return this.getAttribute('item-id') ?? ''
  }

  get naam(): string {
    return this.getAttribute('naam') ?? ''
  }

  get waarde(): number {
    return Number(this.getAttribute('waarde') ?? '0')
  }

  connectedCallback() {
    super.connectedCallback()

    // Template literal: naam en waarde in één regel.
    this.querySelector('#collectie-item-info')!.textContent = `${this.naam} — € ${this.waarde.toFixed(2)}`

    this.querySelector<HTMLButtonElement>('#delete-btn')!.addEventListener('click', () => {
      // Rechtstreeks de provider aanspreken; de observers doen de rest.
      void collectieProvider.delete(this.itemId)
    })
  }
}

customElements.define('collectie-item', CollectieItemElement)
