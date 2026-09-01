import HTML from './customBook.html?raw'
import {CustomElement} from '../../router/customElement.ts'

export class CustomBook extends CustomElement {
  static observedAttributes = ['id', 'title', 'author', 'type', 'retail', 'resale', 'image', 'properties']

  #coverImage = this.componentBody.querySelector<HTMLImageElement>('#cover-image')!
  #title = this.componentBody.querySelector<HTMLParagraphElement>('#title')!
  #author = this.componentBody.querySelector<HTMLParagraphElement>('#author')!
  #type = this.componentBody.querySelector<HTMLParagraphElement>('#type')!
  #retail = this.componentBody.querySelector<HTMLSpanElement>('#retail')!
  #resale = this.componentBody.querySelector<HTMLSpanElement>('#resale')!
  #propertiesContainer = this.componentBody.querySelector<HTMLUListElement>('#properties')!
  #addButton = this.componentBody.querySelector<HTMLButtonElement>('#add-button')!

  constructor() {
    super(HTML)

    this.#addButton.addEventListener('click', () => {
      this.dispatchEvent(new Event("add-to-collection"))
    })
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'title':
        this.#title.textContent = newValue
        break
      case 'author':
        this.#author.textContent = newValue
        break
      case 'type':
        this.#type.textContent = newValue
        break
      case 'retail':
        this.#retail.textContent = newValue
        break
      case 'resale':
        this.#resale.textContent = newValue === '' ? '' : `/ ${newValue}`
        break
      case 'image':
        this.#coverImage.src = newValue
        this.#coverImage.alt = `Cover image for ${this.getAttribute('title')}`
        break
      case 'properties':
        this.#propertiesContainer.innerHTML = ''
        const properties = JSON.parse(newValue)
        for (const property of properties) {
          const li = document.createElement('li')
          li.textContent = property.trim()
          this.#propertiesContainer.appendChild(li)
        }
        break
    }
  }
}