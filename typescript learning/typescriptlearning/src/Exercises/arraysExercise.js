"use strict";
// **********************************************
// ******************* PART 1 *******************
// **********************************************
// Create an empty array of numbers called "ages":
const ages = [];
console.log(ages);
// **********************************************
// ******************* PART 2 *******************
// **********************************************
// Create an array variable called gameBoard that starts as an empty array.
// It should be typed to hold a 2 dimensional array of strings
const gameBoard = [];
console.log(gameBoard);
// **********************************************
// ******************* PART 4 *******************
// **********************************************
// Write a function called getTotal that accepts an array of Product types
// It should return the sum of all the products' prices
const arrayProducts = [];
arrayProducts.push({ name: "Jeroen", price: 11.50 }, { name: "Fanta", price: 4.30 });
console.log(arrayProducts);
function getTotal(arrayProducts) {
    let total = 0;
    for (let product of arrayProducts) {
        total += product.price;
    }
    return total;
}
const sum = getTotal(arrayProducts);
console.log(sum);
