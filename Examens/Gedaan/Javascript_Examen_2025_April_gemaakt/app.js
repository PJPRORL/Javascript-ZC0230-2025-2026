const producten = document.querySelector('#product-list')
const categories = document.querySelector('#filter-buttons');
const filterAll = document.querySelector('.filter-btn');
const cartCounterElement = document.querySelector('#cart-counter');
const cartDropdownMenu = document.querySelector('.dropdown-menu');
let cart = [];

const categorieList = [];

async function ophalenData(){
    try {
        const promise = await fetch('http://localhost:63342/exercise02.html/Examens/Javascript_Examen_2025_April_start/data/products.json')
        const data = await promise.json();

        categories.classList.remove('d-none');

        data.products.forEach(product => producten.appendChild(createProduct(product)));

        // Aanmaken en ophalen van categorieën
        data.products.forEach(product => {
            if (!categorieList.includes(product.category)) {
                categorieList.push(product.category);
            }
        })

        // Toevoegen van klik event op gemaakte categorieën
        categorieList.forEach(categorie => {
            const gemaakteKnop = createButton(categorie);

            gemaakteKnop.addEventListener('click', (e) => {
                producten.innerHTML = '';

                data.products.forEach(product => {
                    if (product.category === categorie) {

                        producten.appendChild((createProduct(product)));
                    }
                })
            })

            categories.appendChild(gemaakteKnop);
        })

        // Klik event voor All products knop
        filterAll.addEventListener('click', (e) => {
            producten.innerHTML = '';
            data.products.forEach(product => producten.appendChild(createProduct(product)));
        })

        console.log(data)

    } catch(err) {
        const error = document.querySelector('.error-message');
        const categories = document.querySelector('#filter-buttons');
        error.classList.add('alert');
        categories.classList.add('d-none');
        error.textContent = 'Error while loading products';
        console.log(err)
    }
}

ophalenData();

function createProduct(product) {
    const productCol = document.createElement('div');
    productCol.classList.add('col');

    const products = document.createElement('div');
    products.classList.add('card');
    products.classList.add('h-100');
    productCol.appendChild(products);

    const imageProduct = document.createElement('img');
    imageProduct.classList.add('card-img-top');
    imageProduct.src = product.image;
    products.appendChild(imageProduct);

    const productBody = document.createElement('div');
    productBody.classList.add('card-body');
    products.appendChild(productBody);

    const productHeader = document.createElement('div');
    productHeader.classList.add('d-flex');
    productHeader.classList.add('align-items-center');
    productBody.appendChild(productHeader);

    const productTitle = document.createElement('h5');
    productTitle.classList.add('card-title')
    productTitle.classList.add('p-2');
    productTitle.textContent = `${product.name}`;
    productHeader.appendChild(productTitle);

    const productPrice = document.createElement('span');
    productPrice.classList.add('badge');
    productPrice.classList.add('text-bg-secondary');
    productPrice.classList.add('fs-8');
    productPrice.textContent = `€${product.price.toFixed(2)}`;
    productHeader.appendChild(productPrice);

    const productDescription = document.createElement('p');
    productDescription.classList.add('card-text');
    productDescription.textContent = product.description;
    productBody.appendChild(productDescription);

    const productButton = document.createElement('button');
    productButton.classList.add('btn');
    productButton.classList.add('btn-dark');
    productButton.innerHTML = 'Add to card'
    productBody.appendChild(productButton);

    productButton.addEventListener('click', (e) => {
        // 1. Zoek of het product al in de cart array zit op basis van id
        const bestaandProduct = cart.find(item => item.id === product.id);

        if (bestaandProduct) {
            // Als het al bestaat, verhoog de hoeveelheid met 1
            bestaandProduct.quantity += 1;
        } else {
            // Anders voegen we het product toe aan de array met eigenschap quantity = 1
            product.quantity = 1;
            cart.push(product);
        }

        // 2. Teken de winkelwagen opnieuw op basis van de array
        renderCart();
    });

    return productCol;
}

function createButton(category) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('col');
    buttonDiv.classList.add('btn-group');
    buttonDiv.classList.remove('d-none');

    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-dark');
    button.classList.add('rounded-pill');
    button.textContent = category;
    buttonDiv.appendChild(button);

    return buttonDiv;
}

function renderCart() {
    // 1. Maak de dropdown HTML helemaal leeg
    cartDropdownMenu.innerHTML = '';

    // 2. Tel het totaal aantal stuks en de totale prijs in de kar
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += (item.quantity * item.price);
    });

    // 3. Update de badge (teller) in het navigatiemenu
    cartCounterElement.textContent = totalItems;

    // 4. Als de kar leeg is, toon 'No products found' en stop
    if (cart.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.innerHTML = '<a class="dropdown-item" href="#">No products found</a>';
        cartDropdownMenu.appendChild(emptyLi);
        return;
    }

    // 5. Teken elk product in de kar
    cart.forEach(item => {
        const li = document.createElement('li');
        // Gebruik flexbox classes om de naam en de knop naast elkaar te zetten
        li.classList.add('dropdown-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // Tekst met naam, aantal en totale prijs van dat item
        const itemInfo = document.createElement('span');
        itemInfo.textContent = `${item.quantity}x ${item.name} - €${(item.price * item.quantity).toFixed(2)}`;
        li.appendChild(itemInfo);

        // Verwijder knopje maken
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-2');
        removeBtn.textContent = 'Verwijderen';

        // De functionaliteit van de verwijder knop
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Zorgt dat de dropdown niet sluit bij een klik op de knop
            item.quantity -= 1; // Verminder het aantal met 1

            // Als het aantal op 0 komt, verwijder het helemaal uit de lijst
            if (item.quantity === 0) {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
            }

            renderCart(); // Teken de winkelwagen opnieuw
        });

        li.appendChild(itemInfo);
        li.appendChild(removeBtn);
        cartDropdownMenu.appendChild(li);
    });

    // 6. Teken een lijn, de totale prijs en Checkout knop helemaal onderaan
    const divider = document.createElement('li');
    divider.innerHTML = '<hr class="dropdown-divider">';
    cartDropdownMenu.appendChild(divider);

    const totalLi = document.createElement('li');
    totalLi.classList.add('dropdown-item', 'fw-bold', 'd-flex', 'justify-content-between');
    totalLi.innerHTML = `<span>Totaal:</span><span>€${totalPrice.toFixed(2)}</span>`;
    cartDropdownMenu.appendChild(totalLi);

    const checkoutLi = document.createElement('li');
    checkoutLi.classList.add('dropdown-item', 'text-center', 'mt-2');

    const checkoutBtn = document.createElement('button');
    checkoutBtn.classList.add('btn', 'btn-success', 'w-100');
    checkoutBtn.textContent = 'Afrekenen';

    checkoutBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Houd de dropdown open totdat de alert weggaat
        alert('Bestelling succesvol geplaatst!');
        cart = []; // Maak de lijst terug leeg
        renderCart(); // Teken de (nu lege) winkelwagen opnieuw
    });

    checkoutLi.appendChild(checkoutBtn);
    cartDropdownMenu.appendChild(checkoutLi);
}