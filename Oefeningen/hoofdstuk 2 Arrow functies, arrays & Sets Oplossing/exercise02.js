const numbers = []

let input = prompt('Geef een getal in, of druk op enter om te stoppen:', '')
while (input !== '') {
  const parsedNumber = Number(input)

  if (!Number.isNaN(parsedNumber)) {
    numbers.push(Number(input))
  }
  input = prompt('Geef een getal in, of druk op enter om te stoppen:', '')
}

// Deze berekening kan ook worden gedaan in de input-lus hierboven.
// Om didactische redenen wordt het hier apart gedaan.
let min = numbers[0]
let max = numbers[0]
for (const number of numbers) {
  if (number < min) {
    min = number
  }
  if (number > max) {
    max = number
  }
}

const sum = numbers.reduce((acc, number) => acc + number, 0)
const average = sum / numbers.length

console.log('Je hebt volgende getallen ingegeven:', numbers)
console.log('Het kleinste getal is:', min)
console.log('Het grootste getal is:', max)
console.log('De som van de getallen is:', sum)
console.log('Het gemiddelde van de getallen is:', average)