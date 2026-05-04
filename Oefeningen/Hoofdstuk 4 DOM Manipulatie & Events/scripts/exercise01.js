const fruit = ["Appel", "Kiwi", "Peer"];
const groenten = ["Wortel", "Sla", "Bloemkool"];

/* Oproepen document en fruit element */
const body = document.querySelector(".card-body");
const fruitElement = document.querySelector("#fruit");
body.appendChild(fruitElement)
fruitElement.textContent = `Fruit: ${fruit.join(", ")}`;

/* Oproepen document en groenten element */
const groentenElement = document.querySelector("#groenten");
body.appendChild(groentenElement);
groentenElement.textContent = `Groenten: ${groenten.join(", ")}`;

/* tonen van het resultaat */
const resultaatElement = document.querySelector("#resultaat");
body.appendChild(resultaatElement);
resultaatElement.textContent = `Groenten en fruit: ${groenten.concat(fruit).join(", ")}`;