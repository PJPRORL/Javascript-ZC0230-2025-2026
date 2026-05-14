import {CustomElement} from '../../router/customElement.ts'
import HTML from './pokemonCard.html?raw'

export class PokemonCard extends CustomElement {
    static observedAttributes = ['name', 'types', 'generation', 'internationalNumber']

    readonly #name = this.componentBody.querySelector<HTMLDivElement>('#name')!
    readonly #types = this.componentBody.querySelector<HTMLDivElement>('#types')!
    readonly #generation = this.componentBody.querySelector<HTMLImageElement>('#generation')!
    readonly #internationalNumber = this.componentBody.querySelector<HTMLImageElement>('#internationalNumber')!

    readonly #deleteButton = this.componentBody.querySelector<HTMLButtonElement>('#deleteBtn')!

    constructor() {
        super(HTML)

        this.#deleteButton.addEventListener('click', evt => {
            evt.preventDefault()

            const event = new CustomEvent('pokemonDeleted')
            this.dispatchEvent(event)
        })
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'name':
                this.#name.innerText = newValue
                break
            case 'types':
                this.#types.innerText = `Types: ${newValue}`
                break
            case 'generation':
                this.#generation.innerText = `Generation: ${newValue}`
                break
            case 'internationalNumber':
                this.#internationalNumber.innerText = `International Pokédex Number: ${newValue}`
                break
        }
    }
}
