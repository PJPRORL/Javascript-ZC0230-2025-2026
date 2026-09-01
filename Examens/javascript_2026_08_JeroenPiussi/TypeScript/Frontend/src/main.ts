import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import {Router} from './router/router.ts'

// Pages
import {collectiePage} from './pages/collectie/collectie.ts'
import {kaartenPage} from './pages/kaarten/kaarten.ts'

// Components

import {CustomNavbar} from './components/navbar/navbar.ts'
import {collectionCard} from './components/collectieItem/collectionItem.ts'
import {kaartCard} from './components/kaartKaart/kaartKaart.ts'

window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-collection-card', kaartCard)
window.customElements.define('custom-kaart-card', collectionCard)

new Router({
    '/': kaartenPage,
    '/collectie': collectiePage,
})