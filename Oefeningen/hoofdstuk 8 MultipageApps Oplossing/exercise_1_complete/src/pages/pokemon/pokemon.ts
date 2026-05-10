// <!-- TODO: startbestanden: leegmaken -->

import {dataManager} from '../../data/data.ts'
import {Page} from '../../router/page.ts'
import HTML from './pokemon.html?raw'

export class PokemonPage extends Page {
    readonly #pokemonList = this.body.querySelector<HTMLUListElement>('#pokemonList')!

    constructor() {
        super(HTML)
    }

    render() {
        super.render()

        this.#pokemonList.innerHTML = ''

        dataManager.pokemon.forEach(p => {
            const pokemon = document.createElement('div')
            pokemon.className = 'card'
            pokemon.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text">Type: ${p.types.join(', ')}</p>
        <p class="card-text">Generation: ${p.generation}</p>
        <p class="card-text">International Pokédex Number: ${p.internationalNumber}</p>
      </div>
    `
            this.#pokemonList.appendChild(pokemon)
        })
    }
}
