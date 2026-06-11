// Ophalen invoer velden
let invoerProduct = document.querySelector("#invoerOmschrijving");
let invoerAantal = document.querySelector("#invoerAantal")
let invoerPrijs = document.querySelector("#invoerPrijs")
let discountInput = document.querySelector("#code")

// Ophalen weergave velden
let kortingsPercentage = document.querySelector("#kortingsPercentage")
let totaal = document.querySelector("#totaal");
let discountError = document.querySelector("#discount-error");
let winkelkar = document.querySelector("#winkelkar");

// Ophalen knoppen
let toevoegenArtikel = document.querySelector("#btnToevoegen")

// Globaal geheugen
let boodschappen = [];

function init(){
    let product = document.createElement("li");
    product.textContent = "Geen producten gevonden"
    winkelkar.appendChild(product);
}

window.onload = init;

function berekenEnToonTotaal() {
    // Winkelkar bij elkaar optellen
    let eindTotaal = 0;

    for (const totaalElement of boodschappen) {
        eindTotaal = eindTotaal + totaalElement.totaal;
    }

    // Ophalen van kortingscode
    let code = discountInput.value;
    let [_, _discount] = code.split("OFF")
    const discount = Number(_discount);

    // Controleer op geldigheid van code
    if (_discount === '' || discount > 60 || isNaN(discount)) {
        if (code !== '') {
            discountError.classList.remove("d-none");
        } else {
            discountError.classList.add("d-none");
        }
        kortingsPercentage.innerHTML = '';
        totaal.innerHTML = `€${eindTotaal.toFixed(2)}`
    } else {
        discountError.classList.add("d-none");
        kortingsPercentage.innerHTML = ` (met ${discount}´% korting`;

        let prijsMetKorting = eindTotaal * (1 - discount / 100);
        totaal.innerHTML = `€${prijsMetKorting.toFixed(2)}`
    }
}

discountInput.addEventListener("input", berekenEnToonTotaal);

function producten(){
    if (boodschappen.length === 0) {
        winkelkar.innerHTML = "";
    }

    let boodschap = {
        product: invoerProduct.value,
        aantal: Number(invoerAantal.value),
        prijs: Number(invoerPrijs.value),
        totaal: 0,
        som: function () {
            return `${this.product} (${this.aantal} x €${this.prijs.toFixed(2)}) = €${this.totaal.toFixed(2)} euro`;
        },
    };

    //
    boodschap.totaal = boodschap.aantal * boodschap.prijs;

    boodschappen.push(boodschap);

    let productItem = document.createElement("li");
    productItem.textContent = boodschap.som();
    winkelkar.appendChild(productItem);

    veldenLeegmaken();

    // Berekening totaal (inclusief mogelijke korting)
    berekenEnToonTotaal();
}

function veldenLeegmaken(){
    invoerProduct.value = "";
    invoerPrijs.value = "";
    invoerAantal.value = "";
}

toevoegenArtikel.addEventListener("click", producten)