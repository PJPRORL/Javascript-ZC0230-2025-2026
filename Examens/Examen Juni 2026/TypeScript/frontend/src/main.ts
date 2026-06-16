import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {buildPage} from './pages/build/buildPage.ts'
import {partsPage} from './pages/parts/partsPage.ts'

import {CustomNavbar} from './components/navbar/navbar.ts'
import {buildItemComponent} from './components/buildItem/buildItem.ts'
import {partsProductCard} from './components/partCard/partCard.ts'

window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-cart-item', buildItemComponent)
window.customElements.define('custom-product-card', partsProductCard)

new Router({
    '/': partsPage,
    '/build': buildPage
})