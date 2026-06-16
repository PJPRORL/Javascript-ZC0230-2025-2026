import {CustomElement} from '../../router/customElement.ts'
import HTML from './part.html?raw'
import {LocalStoragePersistenceProvider} from '../../data/localStoragePersistenceProvider.ts'

export class partsProductCard extends CustomElement {
    static observedAttributes = ['name', 'price', 'category']

    #name = this.componentBody.querySelector<HTMLElement>('#name')!
    #price = this.componentBody.querySelector<HTMLElement>('#price')!
    #category = this.componentBody.querySelector<HTMLElement>('#category')!
    #addButton = this.componentBody.querySelector<HTMLElement>('#add-button')!

    constructor() {
        super(HTML)
        this.#addButton.addEventListener('click', () => {

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
        }
    }


}