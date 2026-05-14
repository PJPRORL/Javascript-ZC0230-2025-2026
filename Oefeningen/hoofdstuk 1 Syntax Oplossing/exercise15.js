const getal = Number(prompt("Geef getal", "7"));

function tafel(getal) {
  for (let i = 1; i <= 10; i++) {
    console.log(i + " x " + getal + " = " + i * getal);
  }
}

tafel(getal);
