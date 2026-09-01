import {CustomElement} from '../../router/customElement.ts'
import HTML from './cartItem.html?raw'
import {cartLocalPersistenceProvider} from '../../data/data.ts'

export class CustomCartItem extends CustomElement {

  static observedAttributes = ['title', 'id']

  #cartItem = this.componentBody.querySelector<HTMLTableCellElement>('#cart-item')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!

  constructor() {
    super(HTML)

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