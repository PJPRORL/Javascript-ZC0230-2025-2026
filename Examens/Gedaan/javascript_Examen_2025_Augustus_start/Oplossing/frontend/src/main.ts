import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {ProductPage} from './pages/products/products.ts'
import {CartPage} from './pages/cart/cart.ts'

import {CustomNavbar} from './components/navbar/navbar.ts'
import {CustomCartItem} from './components/cartItem/cartItem.ts'
import {CustomProductCard} from './components/productCard/product.ts'

window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-cart-item', CustomCartItem)
window.customElements.define('custom-product-card', CustomProductCard)

new Router({
  '/': ProductPage,
  '/cart': CartPage
})