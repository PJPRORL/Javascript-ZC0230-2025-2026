//Ophalen invoer velden
let invoerProduct = document.querySelector("#invoerOmschrijving");
let invoerAantal = document.querySelector("#invoerAantal")
let invoerPrijs = document.querySelector("#invoerPrijs")
let discountInput = document.querySelector("#code")
let kortingsPercentage = document.querySelector("#kortingsPercentage")

//Ophalen knoppen
let toevoegenArtikel = document.querySelector("#btnToevoegen")

//Ophalen en aanmaken winkelkar
let winkelkar = document.querySelector("#winkelkar");

let boodschappen = [];

function init(){
    let product = document.createElement("li");
    product.textContent = "Geen producten gevonden"
    winkelkar.appendChild(product);
}

window.onload = init;

discountInput.addEventListener("input", function(){
    let code = discountInput.value;
    let [_, _discount] = code.split("OFF")
    const discount = Number(_discount);

    if (_discount === '' || discount > 60 || isNan(discount)) {
        
    } else {

    }

})

function producten(){
    if (boodschappen.length === 0) {
        winkelkar.innerHTML = "";
    }

    let boodschap = {
        product: "",
        aantal: 0,
        prijs: 0,
        totaal: 0,
        som: function () {
            return `${this.product} (${this.aantal} x €${this.prijs}) = €${this.aantal * this.prijs} euro`;
        },
    };

    boodschap.product = invoerProduct.value;
    boodschap.aantal = invoerAantal.value;
    boodschap.prijs = invoerPrijs.value;
    boodschap.totaal = Number(boodschap.aantal * boodschap.prijs);

    boodschappen.push(boodschap);

    let productItem = document.createElement("li");
    productItem.textContent = boodschap.som();
    winkelkar.appendChild(productItem);
    veldenLeegmaken();

    let eindTotaal = 0;

    for (const totaalElement of boodschappen) {
        eindTotaal = eindTotaal + totaalElement.totaal;
    }

    let totaal = document.querySelector("#totaal");
    totaal.textContent = `€${eindTotaal}`;
}

function veldenLeegmaken(){
    invoerProduct.value = "";
    invoerPrijs.value = "";
    invoerAantal.value = "";
}

toevoegenArtikel.addEventListener("click", producten)