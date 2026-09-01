import {CustomElement} from '../../router/customElement.ts'
import HTML from './series.html?raw'

export class Series extends CustomElement {
    static observedAttributes = ['name']

    readonly #name = this.componentBody.querySelector<HTMLDivElement>('#seriesTitle')!
    readonly #deleteButton = this.componentBody.querySelector<HTMLButtonElement>('#deleteBtn')!

    constructor() {
        super(HTML)

        this.#deleteButton.addEventListener('click', evt => {
            evt.preventDefault()

            // TODO: Custom event uitsturen.
        })
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'name':
                this.#name.innerText = newValue
                break
        }
    }
}
