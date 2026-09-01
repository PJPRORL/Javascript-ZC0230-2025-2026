const filterButtons = document.getElementById('filter-buttons')
const productList = document.getElementById('product-list')
const cartList = document.getElementById('cart')
const cartCounter = document.getElementById('cart-counter')

let products = []
let cart = {}

fetch('/data/products.json')
  .then(data => data.json())
  .then(p => products = p.products)
  .then(() => renderItems())
  .catch(err => document.getElementById('fetch-error').hidden = false)


function renderItems(filter = 'all') {
  filterButtons.classList.remove('d-none')
  productList.innerHTML = ''
  products.filter(i => filter === 'all' || i.category === filter).map(i => productList.appendChild(buildProduct(i)))
}

const priceFormatter = Intl.NumberFormat('nl-BE', {
  style: 'currency',
  currency: 'EUR',
})

/**
 * @param item {{
 *  "id": number,
 *  "name": string,
 *  "category": string,
 *  "price": number,
 *  "image": string,
 *  "description": string,
 * }}
 */
function buildProduct(item) {
  const col = document.createElement('div')
  col.classList.add('col')

  const card = document.createElement('div')
  card.classList.add('card')
  col.appendChild(card)

  const img = document.createElement('img')
  img.classList.add('card-img-top')
  img.alt = item.name
  img.src = item.image
  card.appendChild(img)

  const body = document.createElement('div')
  body.classList.add('card-body')
  card.appendChild(body)

  const title = document.createElement('h5')
  title.innerHTML = item.name
  title.classList.add('card-title')
  body.appendChild(title)

  const badge = document.createElement('span')
  badge.classList.add('badge', 'text-bg-secondary', 'mx-2')
  badge.innerHTML = priceFormatter.format(item.price)
  title.appendChild(badge)

  const text = document.createElement('p')
  text.innerHTML = item.description
  body.appendChild(text)

  const addBtn = document.createElement('button')
  addBtn.classList.add('btn')
  addBtn.classList.add('btn-dark')
  addBtn.innerHTML = "Add to cart"
  body.appendChild(addBtn)
  addBtn.addEventListener('click', () => {
    if (cart[item.id]) {
      cart[item.id] = {
        ...item,
        amount: cart[item.id].amount + 1
      }
    } else {
      cart[item.id] = {
        ...item,
        amount: 1
      }
    }
    renderCart()
  })

  return col
}

function renderCart() {
  cartCounter.innerHTML = Object.values(cart).reduce((acc, curr) => acc + curr.amount, 0)

  cartList.innerHTML = ''
  if (Object.keys(cart).length === 0) {
    cartList.innerHTML = '<li><div class="dropdown-item">No products found</div></li>'
  } else {
    Object.keys(cart).forEach(i => cartList.appendChild(buildCartItem(cart[i])))
    cartList.appendChild(document.createElement('hr'))

    const total = Object.values(cart).reduce((acc, curr) => acc + curr.amount * curr.price, 0)
    cartList.appendChild(buildCheckoutButton(total))
  }
}


/**
 * @param product {{
 *  "id": number,
 *  "name": string,
 *  "category": string,
 *  "price": number,
 *  "image": string,
 *  "description": string,
 *  "amount": number
 * }}
 */
function buildCartItem(product) {
  const li = document.createElement('li')

  const productInfo = document.createElement('div')

  const productName = document.createElement('span')
  productName.innerHTML = `${product.name} x ${product.amount} - `
  productInfo.appendChild(productName)

  const productPrice = document.createElement('strong')
  productPrice.innerHTML = priceFormatter.format(product.amount * product.price)
  productInfo.appendChild(productPrice)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn', 'btn-danger', 'ms-4')
  deleteButton.innerHTML = 'Verwijderen'
  deleteButton.addEventListener('click', () => {
    if (product.amount === 1) {
      console.log('Deleting')
      delete cart[product.id]
    } else {
      cart[product.id].amount = product.amount - 1
    }
    renderCart()
  })

  const container = buildJustifiedBetweenFlexContainer(productInfo, deleteButton)
  li.appendChild(container)

  return li
}

function buildJustifiedBetweenFlexContainer(...children) {
  const container = document.createElement('div')
  container.classList.add('d-flex', 'justify-content-between', 'dropdown-item', 'align-items-center')
  children.forEach(c => container.appendChild(c))
  return container
}

function buildCheckoutButton(total) {
  const checkoutButton = document.createElement('div')
  checkoutButton.classList.add('btn', 'btn-ghost', "px-0")
  checkoutButton.innerHTML = 'Check out'

  const totalDisplay = document.createElement('strong')
  totalDisplay.innerHTML = priceFormatter.format(total)

  const container = buildJustifiedBetweenFlexContainer(checkoutButton, totalDisplay)
  container.addEventListener('click', () => {
    alert('Thank you for your purchase!')
    cart = {}
    renderCart()
  })

  return container
}

document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
  renderItems(btn.getAttribute('data-category'))
}))
