import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'

import {productsPage} from './pages/products/products.ts'
import {cartPage} from './pages/cart/cart.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'
import {ItemCard} from './components/productCard/product.ts'
import {ItemCard as CartItemCard} from './components/cartItem/cartItem.ts'

window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-product-card', ItemCard)
window.customElements.define('custom-cart-item', CartItemCard)

new Router({
    '/': productsPage,
    '/cart': cartPage,
})