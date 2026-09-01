import {Page} from '../../router/page.ts'
import HTML from './products.html?raw'
import type {Product} from '../../models/product.ts'
import {productRestPersistenceProvider} from '../../data/data.ts'
import {ItemCard} from '../../components/productCard/product.ts'

export class productsPage extends Page {
    #items: Product[] = []

    #container = this.body.querySelector('#products')! as HTMLDivElement

    constructor() {
        super(HTML)
        this.unsubscribe.push(productRestPersistenceProvider.addObserver(items => {
            this.#items = items
            this.render()
        }))

        void productRestPersistenceProvider.getAll()
    }
        render(): void {
            super.render()
            // (c) container leegmaken en per item een custom element bouwen
            this.#container.innerHTML = '';
            this.#items.map(item => {
                const el = document.createElement('custom-product-card')   // 🔧 ZELFDE naam als bij customElements.define in main.ts!
                el.setAttribute('id', item.id)                     // id altijd meegeven (nodig voor verwijderen!)
                el.setAttribute('name', item.name)
                el.setAttribute('price', item.price.toFixed(2))
                el.setAttribute('category', item.category)
                // 🔧 array? -> el.setAttribute('answers', JSON.stringify(item.answers))

                this.#container.appendChild(el)
            })
        }
    }