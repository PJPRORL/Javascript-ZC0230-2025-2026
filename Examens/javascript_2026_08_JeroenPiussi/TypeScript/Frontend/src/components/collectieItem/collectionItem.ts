import {CustomElement} from '../../router/customElement.ts'
import HTML from './collectieItem.html?raw'
export class collectionCard extends CustomElement {

    static observedAttributes = ['kaartId', 'naam', 'waarde']

    readonly #kaartId = this.componentBody.querySelector<HTMLElement>('#aantal-kaarten')!
    readonly #naam = this.componentBody.querySelector<HTMLElement>('#collectie-lijst')!
    readonly #waarde = this.componentBody.querySelector<HTMLElement>('#collectie-totaal')!

    constructor() {
        super(HTML)
    }
// observedAttributes + attributeChangedCallback komen er later bij (stap 2).

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'kaartId':
                this.#kaartId.innerText = newValue
                break
            case 'naam':

                this.#naam.innerText = Number(newValue).toFixed(2) + ' EUR'
                break
            case 'waarde':
                this.#waarde.innerText = newValue
                break
        }
    }
}
