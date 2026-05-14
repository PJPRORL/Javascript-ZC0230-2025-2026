// <!-- TODO: startbestanden: leegmaken -->
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import {Navbar} from './components/navbar/navbar.ts'
import {PokemonCard} from './components/pokemonCard/pokemonCard.ts'
import {HomePage} from './pages/home/home.ts'
import {PokemonPage} from './pages/pokemon/pokemon.ts'
import {TrainersPage} from './pages/trainers/trainers.ts'
import {Router} from './router/router.ts'

customElements.define('custom-navbar', Navbar)
customElements.define('custom-pokemon', PokemonCard)

new Router({
    '/': HomePage,
    '/pokemon': PokemonPage,
    '/trainers': TrainersPage,
})
