import {CustomElement} from '../../router/customElement.ts'
import HTML from './product.html?raw'

export class ItemCard extends CustomElement {
    static observedAttributes = ['name', 'price', 'category']

    #name = this.componentBody.querySelector('#name')! as HTMLElement
    #price = this.componentBody.querySelector('#price')! as HTMLElement
    #category = this.componentBody.querySelector('#category')! as HTMLElement

    constructor() {
        super(HTML)
    }

    // observedAttributes + attributeChangedCallback komen er later bij (stap 2).
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
            // 🔧 ARRAY tonen? Geef hem als JSON-string door en parse hem hier:
            // case 'answers': {
            //   this.#list.innerHTML = ''
            //   JSON.parse(newValue).forEach((x: string) => {
            //     const li = document.createElement('li'); li.innerText = x; this.#list.appendChild(li)
            //   })
            //   break
            // }
        }
    }
}