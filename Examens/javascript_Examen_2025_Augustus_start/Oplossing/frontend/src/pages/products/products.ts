import {Page} from '../../router/page.ts'
import HTML from './products.html?raw'
import {productRestPersistenceProvider} from '../../data/data.ts'
import {cartLocalPersistenceProvider} from '../../data/data.ts'
import {Product} from '../../models/product.ts'
import {CartItem} from '../../models/cartItem.ts'

export class ProductPage extends Page {

  #productContainer = this.body.querySelector<HTMLDivElement>('#products')!
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!
  #categoryFilter = this.body.querySelector<HTMLSelectElement>('#category-filter')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!

  #products: Product[] = []
  #cart: CartItem[] = []


  constructor() {
    super(HTML)

    this.unsubscribe.push(cartLocalPersistenceProvider.addObserver(cart => {
      this.#cart = cart
      this.render()
    }))

    void cartLocalPersistenceProvider.getAll()

    this.unsubscribe.push(productRestPersistenceProvider.addObserver(products => {
      this.#products = [...products]
      this.render()
    }))

    void productRestPersistenceProvider.getAll()

    this.#filterBtn.addEventListener('click', evt => {
      evt.preventDefault()
      this.render()
    })
  }

  render(): void {
    super.render()

    this.#productContainer.innerHTML = ''
    this.#products.filter(product => this.#productMatchesFilter(product)).map(product => {
      const cartItem = this.#cart.find(item => item.product.id === product.id)

      const productRow = document.createElement('custom-product-card')
      productRow.setAttribute('name', product.name)
      productRow.setAttribute('price', product.price.toFixed(2))
      productRow.setAttribute('category', product.category)
      productRow.setAttribute('is-added', cartItem ? 'true' : 'false')

      productRow.addEventListener('addToCart', async () => {
        if (cartItem) {
          await cartLocalPersistenceProvider.delete(cartItem.id)
        } else {
          const newCartItem: CartItem = {product, id: crypto.randomUUID()}
          await cartLocalPersistenceProvider.create(newCartItem)
        }
      })

      productRow.addEventListener('applyDiscount', async () => {
        const currentPrice = product.price
        const discount = currentPrice * 0.9
        const updatedProduct = {...product, price: discount}
        await productRestPersistenceProvider.update(product.id, updatedProduct)
      })

      this.#productContainer.appendChild(productRow)
    })

  }

  #productMatchesFilter(product: Product): boolean {
    const nameMatches = product.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
    const categoryMatches = product.category.toLowerCase() === this.#categoryFilter.value.toLowerCase() || this.#categoryFilter.value === '0'


    return nameMatches && categoryMatches
  }
}