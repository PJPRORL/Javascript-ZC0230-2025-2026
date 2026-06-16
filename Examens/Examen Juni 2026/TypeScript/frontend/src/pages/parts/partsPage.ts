import {Page} from '../../router/page.ts'
import HTML from './parts.html?raw'
import type {Part} from '../../models/part.ts'
import {partsRestProvider} from '../../data/data.ts'
import {partsProductCard} from '../../components/partCard/partCard.ts'

export class partsPage extends Page {

    #items: Part[] = []

    #container = this.body.querySelector<HTMLDivElement>('#parts')!

    constructor() {
        super(HTML)

        this.unsubscribe.push(partsRestProvider.addObserver(items => {
            this.#items = items
            this.render()
        }))

        void partsRestProvider.getAll()
    }

    render(): void {
        super.render()

        this.#container.innerHTML = ''
        this.#items.map(item => {
            const el = document.createElement('custom-product-card')
            el.setAttribute('id', item.id)
            el.setAttribute('name', item.name)
            el.setAttribute('price', item.price.toFixed(2))
            el.setAttribute('category', item.category)

            this.#container.appendChild(el)
        })
    }
}