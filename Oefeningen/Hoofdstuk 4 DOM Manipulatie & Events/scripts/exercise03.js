const afbeeldingElement = document.querySelector("img");
const buttonElement = document.querySelector("#randomFoto");
const divElement = document.querySelector("#debugAfbeelding");

// object maken van afbeeldingen
const afbeeldingen = ["desert", "mountain_forest", "snow", "space"];
let afbeeldingGeschiedenis = [];

// Knop "Random foto" werkend krijgen
buttonElement.addEventListener("click", function () {
    // 1. Genereer de eerste poging
    let randomAfbeelding = afbeeldingen[Math.floor(Math.random() * afbeeldingen.length)];

    // 2. Voeg toe aan geschiedenis en toon op het scherm
    divElement.style.textAlign = "center";
    afbeeldingGeschiedenis += randomAfbeelding + "<br>";
    divElement.innerHTML = `Vorige foto's (laatste foto ${randomAfbeelding})<br>` + afbeeldingGeschiedenis;

    // 3. Controleer of het een dubbele is
    while (afbeeldingGeschiedenis === randomAfbeelding) {
        // Genereer nieuwe poging
        randomAfbeelding = Math.floor((Math.random() * 3) + 1);

        // Voeg ook deze nieuwe (mislukte) poging toe aan geschiedenis
        afbeeldingGeschiedenis += randomAfbeelding + "<br>";
        divElement.innerHTML = `Vorige foto's (laatste foto ${randomAfbeelding})<br>` + afbeeldingGeschiedenis;
    }

    // 4. Update de afbeelding
    let resultaat = `./img/${randomAfbeelding}.webp`;
    afbeeldingElement.src = resultaat;
})