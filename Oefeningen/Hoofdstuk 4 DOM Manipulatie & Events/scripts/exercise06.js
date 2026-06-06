let invoer = document.querySelector("#invoer");
let toevoegenArtikel = document.querySelector("#btnToevoegen")
let winkelkar = document.querySelector("#winkelkar");

let lijst = [];

function init(){
    let product = document.createElement("li");
    product.textContent = "Geen producten gevonden"
    winkelkar.appendChild(product);
}

window.onload = init;

function producten(){
    if (lijst.length === 0) {
        winkelkar.innerHTML = "";
    }
    
    lijst.push(invoer.value);
    
    let product = document.createElement("li");
    product.textContent = invoer.value;
    winkelkar.appendChild(product);
    invoer.value = "";
}

toevoegenArtikel.addEventListener("click", producten)
