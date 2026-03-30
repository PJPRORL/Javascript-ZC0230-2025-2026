const fruit = ["Appel", "Kiwi", "Peer"];
const groenten = ["Wortel", "Sla", "Bloemkool"];

const body = document.querySelector(".card-body");
const fruitElement = document.querySelector("#fruit");
body.appendChild(fruitElement)
fruitElement.textContent = `Fruit: ${fruit.join(", ")}`;
const groentenElement = document.querySelector("#groenten");
body.appendChild(groentenElement);
groentenElement.textContent = `Groenten: ${groenten.join(", ")}`;
const resultaatElement = document.querySelector("#resultaat");
body.appendChild(resultaatElement);
resultaatElement.textContent = `Groenten en fruit: ${groenten.concat(fruit).join(", ")}`;