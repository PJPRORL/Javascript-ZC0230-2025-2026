import {CustomElement} from '../../router/customElement.ts'
import HTML from './product.html?raw'

export class CustomProductCard extends CustomElement {
  static observedAttributes = ['name', 'price', 'category', 'is-added']

  readonly #name = this.componentBody.querySelector<HTMLTableCellElement>('#name')!
  readonly #price = this.componentBody.querySelector<HTMLTableCellElement>('#price')!
  readonly #category = this.componentBody.querySelector<HTMLTableCellElement>('#category')!
  readonly #addBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-button')!
  readonly #discountBtn = this.componentBody.querySelector<HTMLButtonElement>('#discount-button')!

  #isAdded: boolean = false

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
        this.#isAdded = newValue === 'true'
        if (this.#isAdded) {
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