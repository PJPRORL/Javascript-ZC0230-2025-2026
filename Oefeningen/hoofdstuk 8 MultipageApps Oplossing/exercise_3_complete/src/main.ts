import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import './main.css'
import {Navbar} from './components/navbar/navbar.ts'
import {ConnectFourPage} from './pages/connectFour/connectFour.ts'
import {HomePage} from './pages/home/home.ts'
import {TicTacToePage} from './pages/tictactoe/tictactoe.ts'
import {Router} from './router/router.ts'

customElements.define('custom-navbar', Navbar)

new Router({
    '/': HomePage,
    '/tic-tac-toe': TicTacToePage,
    '/connect-four': ConnectFourPage,
})
