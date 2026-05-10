import {CustomElement} from '../../router/customElement.ts'
import HTML from './author.html?raw'
import './author.css'

export class Author extends CustomElement {
  static observedAttributes = ["name", "image", "description"]

  readonly #name = this.componentBody.querySelector<HTMLDivElement>('.card-title')!
  readonly #description = this.componentBody.querySelector<HTMLDivElement>('.card-text')!
  readonly #image = this.componentBody.querySelector<HTMLImageElement>("#authorImg")!
  readonly #imageBackground = this.componentBody.querySelector<HTMLImageElement>('#authorImgBackground')!

  constructor() {
    super(HTML)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.#name.innerText = newValue
        break
      case 'image':
        this.#image.src = newValue
        this.#imageBackground.src = newValue
        break
      case 'description':
        this.#description.innerText = newValue
        break
    }
  }
}