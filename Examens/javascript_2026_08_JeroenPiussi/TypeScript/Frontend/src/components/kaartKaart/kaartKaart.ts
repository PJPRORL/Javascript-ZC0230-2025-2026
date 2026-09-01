import {CustomElement} from '../../router/customElement.ts'
import HTML from './kaartKaart.html?raw'

export class kaartCard extends CustomElement {

    static observedAttributes = ['serie', 'zeldzaamheid', 'naam', 'type', 'aanvalskracht', 'waarde']

    readonly #serie = this.componentBody.querySelector<HTMLElement>('#serie')!
    readonly #zeldzaamheid = this.componentBody.querySelector<HTMLElement>('#zeldzaamheid-badge')!
    readonly #naam = this.componentBody.querySelector<HTMLElement>('#naam')!
    readonly #type = this.componentBody.querySelector<HTMLElement>('#type')!
    readonly #aanvalskracht = this.componentBody.querySelector<HTMLElement>('#aanvalskracht')!
    readonly #waarde = this.componentBody.querySelector<HTMLElement>('#waarde')!

    constructor() {
        super(HTML)
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'serie':
                this.#serie.innerText = newValue
                break

            case 'zeldzaamheid':
                this.#zeldzaamheid.innerText = newValue
                break

            case 'category':
                this.#naam.innerText = newValue
                break

            case 'type':
                this.#type.innerText = newValue
                break

            case 'aanvalskracht':
                this.#aanvalskracht.innerText = newValue
                break

            case 'waarde':
                this.#waarde.innerText = Number(newValue).toFixed(2) + ' EUR'
                break
        }
    }
}