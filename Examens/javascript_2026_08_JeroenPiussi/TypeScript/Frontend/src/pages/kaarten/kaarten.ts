import {Page} from '../../router/page.ts'
import HTML from './kaarten.html?raw'
import {TradingCard} from "../../models/tradingCard.ts";
import {productRestPersistenceProvider} from '../../data/data.ts'

 export class kaartenPage extends Page {

     #kaartContainer = this.body.querySelector<HTMLDivElement>('#kaarten-container')!
     #products: TradingCard[] = []

    constructor() {
        super(HTML)

        this.unsubscribe.push(productRestPersistenceProvider.addObserver(products => {
            this.#products = [...products]
            this.render()
        }))

        void productRestPersistenceProvider.getAll()
    }

    render(): void {
        super.render()

        this.#kaartContainer.innerHTML = ''
        this.#products.map(product => {
            const productRow = document.createElement('kaartCard')
            productRow.setAttribute('name', product.serie)
            productRow.setAttribute('type', product.type)
            productRow.setAttribute('naam', product.naam)
            productRow.setAttribute('aanvalskracht', product.aanvalskracht.toFixed())
            productRow.setAttribute('waarde', product.waarde.toFixed(2))
            productRow.setAttribute('serie', product.serie)
            productRow.setAttribute('serie', product.zeldzaamheid)

            this.#kaartContainer.appendChild(productRow)
        })
    }
}