const mass = Number(prompt('Geef je massa in: '))
console.log('Op welke planeet wil je jouw gewicht berekenen?')
console.log('    A. Maan')
console.log('    B. Jupiter')
console.log('    C. Mars')
console.log('    D. Venus')
console.log('    E. Neptunus')
const planet = prompt('Jouw keuze: ')

let weight = 0
let name = ''
switch (planet) {
  case "A":
    weight = mass * 1.625
    name = 'Maan'
    break
  case "B":
    weight = mass * 25.93
    name = 'Jupiter'
    break
  case "C":
    weight = mass * 3.728
    name = 'Mars'
    break
  case "D":
    weight = mass * 8.872
    name = 'Venus'
    break
  case "E":
    weight = mass * 11.28
    name = 'Neptunus'
    break
}

if (weight === 0 || isNaN(weight)) {
  console.log('Je hebt geen geldige planeet gekozen of je opgegeven massa kon niet geconverteerd worden naar een getal.')
} else {
  console.log(`Jouw gewicht op ${name} is ${weight} Newton`)
}

