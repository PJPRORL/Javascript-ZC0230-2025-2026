import {itemProvider} from '../../data/data.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './itemKaart.html?raw'

/**
 * Toont één item.
 *
 * Attributen (altijd strings, altijd kebab-case): item-id, naam, beschrijving, aantal
 */
export class ItemKaart extends CustomElement {
  constructor() {
    super(html)
  }

  get itemId(): string {
    return this.getAttribute('item-id') ?? ''
  }

  get naam(): string {
    return this.getAttribute('naam') ?? ''
  }

  get beschrijving(): string {
    return this.getAttribute('beschrijving') ?? ''
  }

  get aantal(): number {
    return Number(this.getAttribute('aantal') ?? '0')
  }

  connectedCallback() {
    // Eerst de basisklasse: die hangt de HTML in de DOM.
    super.connectedCallback()

    this.querySelector('#naam')!.textContent = this.naam
    this.querySelector('#beschrijving')!.textContent = this.beschrijving
    this.querySelector('#aantal')!.textContent = String(this.aantal)

    this.querySelector<HTMLButtonElement>('#verwijder-knop')!.addEventListener('click', () => {
      // Rechtstreeks de provider aanspreken; die verwittigt de observers en de pagina hertekent.
      // Alternatief, wanneer de pagina logica moet uitvoeren die dit element niet aangaat:
      //   this.dispatchEvent(new CustomEvent('item-verwijderen', {bubbles: true, detail: {id: this.itemId}}))
      void itemProvider.delete(this.itemId)
    })
  }
}

customElements.define('item-kaart', ItemKaart)
