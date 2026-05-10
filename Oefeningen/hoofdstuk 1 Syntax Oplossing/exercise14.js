const getal1 = Number(prompt("Geef getal1 in", "0"));
const getal2 = Number(prompt("Geef getal2 in", "0"));

const som = berekenSom(getal1, getal2);
const verschil = berekenVerschil(getal1, getal2);
const product = berekenProduct(getal1, getal2);

const res = `De ingegeven getallen zijn ${getal1} en ${getal2}.
De som is: ${som}
Het verschil is: ${verschil}
Het product is: ${product}`;
console.log(res)

function berekenSom(getal1, getal2) {
  return getal1 + getal2;
}

function berekenVerschil(getal1, getal2) {
  return getal1 - getal2;
}

function berekenProduct(getal1, getal2) {
  return getal1 * getal2;
}