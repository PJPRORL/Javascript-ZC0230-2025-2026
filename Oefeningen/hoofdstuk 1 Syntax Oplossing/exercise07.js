const getal1 = Number(prompt('Geef een eerste getal in: ', '0'))
const getal2 = Number(prompt('Geef een tweede getal in: ', '0'))
const getal3 = Number(prompt('Geef een derde getal in: ', '0'))

const kleinsteGetal = Math.min(getal1, getal2, getal3)
const grootsteGetal = Math.max(getal1, getal2, getal3)
const middelsteGetal = getal1 + getal2 + getal3 - kleinsteGetal - grootsteGetal

console.log(`Het kleinste getal is ${kleinsteGetal}`)
console.log(`Het middelste getal is ${middelsteGetal}`)
console.log(`Het grootste getal is ${grootsteGetal}`)