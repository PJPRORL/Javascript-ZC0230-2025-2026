// <!-- TODO: startbestanden: leegmaken -->

import {PokemonCard} from '../../components/pokemonCard/pokemonCard.ts'
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
            const pokemon = new PokemonCard()

            pokemon.setAttribute('name', p.name)
            pokemon.setAttribute('types', p.types.join(', '))
            pokemon.setAttribute('generation', p.generation)
            pokemon.setAttribute('internationalNumber', p.internationalNumber.toString())

            pokemon.addEventListener('pokemonDeleted', () => {
                dataManager.pokemon = dataManager.pokemon.filter(p2 => p.id !== p2.id)
                this.render()
            })

            this.#pokemonList.appendChild(pokemon)
        })
    }
}
