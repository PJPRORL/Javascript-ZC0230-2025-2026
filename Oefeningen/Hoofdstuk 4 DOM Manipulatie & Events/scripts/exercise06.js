//Ophalen invoer velden
let invoerProduct = document.querySelector("#invoerOmschrijving");
let invoerAantal = document.querySelector("#invoerAantal")
let invoerPrijs = document.querySelector("#invoerPrijs")

//Ophalen knoppen
let toevoegenArtikel = document.querySelector("#btnToevoegen")

//Ophalen en aanmaken winkelkar
let winkelkar = document.querySelector("#winkelkar");

let lijst = [];

let boodschappen = [{
    product: invoerProduct.value,
    aantal: invoerAantal.value,
    prijs: invoerPrijs.value,
    totaal: function () {
        return this.aantal * this.prijs;
    }
}];

function init(){
    let product = document.createElement("li");
    product.textContent = "Geen producten gevonden"
    winkelkar.appendChild(product);
}

window.onload = init;

function producten(){
    if (boodschappen.product.length === 0) {
        winkelkar.innerHTML = "";
    }

    prijs.push(invoerPrijs.value);
    aantal.push(invoerAantal.value);

    boodschappen.product.push(invoerProduct.value);

    boodschappen.push(product = invoerProduct.value ,aantal = invoerAantal.value, prijs = invoerPrijs.value, this.totaal());
    
    let productItem = document.createElement("li");
    productItem.textContent = boodschappen.product.value;
    winkelkar.appendChild(productItem);
    boodschappen.product.value = "";
}

toevoegenArtikel.addEventListener("click", producten)
