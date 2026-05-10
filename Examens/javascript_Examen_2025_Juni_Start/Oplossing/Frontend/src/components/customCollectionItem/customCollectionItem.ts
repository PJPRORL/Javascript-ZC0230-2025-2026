import {CustomElement} from '../../router/customElement.ts'
import HTML from './customCollectionItem.html?raw'
import {collectionPersistenceProvider} from '../../data/data.ts'

export class CustomCollectionItem extends CustomElement {
  static observedAttributes = ['id', 'title', 'value']

  #title = this.componentBody.querySelector<HTMLSpanElement>('#title')!
  #value = this.componentBody.querySelector<HTMLSpanElement>('#value')!
  #deleteButton = this.componentBody.querySelector<HTMLButtonElement>('#delete-button')!

  constructor() {
    super(HTML)

    this.#deleteButton.addEventListener('click', () => collectionPersistenceProvider.delete(this.id))
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'title':
        this.#title.textContent = newValue
        break
      case 'value':
        this.#value.textContent = newValue
        break
    }
  }
}