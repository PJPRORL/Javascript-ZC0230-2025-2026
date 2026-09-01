import {collectieProvider} from '../../data/data.ts'
import {attribuut, attribuutAlsGetal, zoek} from '../../dom.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './collectieItem.html?raw'

declare global {
  interface HTMLElementTagNameMap {
    'collectie-item': CollectieItemElement
  }
}

/**
 * Toont één item uit de collectie.
 *
 * Attributen: item-id, naam, waarde
 *
 * Dit element stuurt bewust géén custom event uit: de opgave vraagt dat het de
 * delete zelf afhandelt. Dat mag hier omdat de pagina naar dezelfde provider
 * luistert en dus vanzelf hertekent.
 */
export class CollectieItemElement extends CustomElement {
  constructor() {
    super(html)
  }

  get itemId(): string {
    return attribuut(this, 'item-id')
  }

  get naam(): string {
    return attribuut(this, 'naam')
  }

  get waarde(): number {
    return attribuutAlsGetal(this, 'waarde')
  }

  connectedCallback() {
    super.connectedCallback()

    // Template literal: naam en waarde in één regel.
    zoek(this, '#collectie-item-info').textContent = `${this.naam} — € ${this.waarde.toFixed(2)}`

    zoek<HTMLButtonElement>(this, '#delete-btn').addEventListener('click', () => {
      // Rechtstreeks de provider aanspreken; de observers doen de rest.
      void collectieProvider.delete(this.itemId)
    })
  }
}

customElements.define('collectie-item', CollectieItemElement)
