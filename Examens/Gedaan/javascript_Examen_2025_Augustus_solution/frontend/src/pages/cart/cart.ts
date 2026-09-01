import {Page} from '../../router/page.ts'
import HTML from './cart.html?raw'
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {CartItem} from '../../models/cartItem.ts'

export class CartPage extends Page {

  #cartList = this.body.querySelector<HTMLDivElement>('#cart-list')!
  #totalPrice = this.body.querySelector<HTMLSpanElement>('#cart-total')!

  #cart: CartItem[] = []

  constructor() {
    super(HTML)

    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))

    void cartLocalPersistenceProvider.getAll()
  }

  render(): void {
    super.render()

    this.#cartList.innerHTML = ''
    this.#cart.map(cartItem => {
      const cartItemElement = document.createElement('custom-cart-item')
      cartItemElement.setAttribute('title', `${cartItem.product.name} (${cartItem.product.price.toFixed(2)} EUR)`)
      cartItemElement.setAttribute('id', cartItem.id)

      this.#cartList.appendChild(cartItemElement)
    })

    const total = this.#cart.map(x => x.product.price).reduce((a, b) => a + b, 0)
    this.#totalPrice.innerText = total.toFixed(2)
  }
}