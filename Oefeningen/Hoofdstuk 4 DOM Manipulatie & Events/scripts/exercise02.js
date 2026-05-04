const afbeeldingElement = document.querySelector("img");
const buttonElement = document.querySelector("#randomFoto");
const divElement = document.querySelector("#debugAfbeelding");

// object maken van afbeeldingen
const afbeeldingen = ["1.webp", "2.webp", "3.webp"];
let geselecteerdeAfbeelding = 1;

// Knop "Random foto" werkend krijgen
buttonElement.addEventListener("click", function () {
    let randomAfbeelding = Math.floor((Math.random() * 3) + 1);

    divElement.innerHTML += randomAfbeelding;

    let resultaat = `./img/${randomAfbeelding}.webp`;
    afbeeldingElement.src = resultaat;

    /*while (randomAfbeelding === geselecteerdeAfbeelding){
        randomAfbeelding = Math.floor((Math.random() * 3) + 1);
        resultaat = `./img/${randomAfbeelding}.webp`;
    }

    geselecteerdeAfbeelding = resultaat

    afbeeldingElement.src = resultaat;*/
})