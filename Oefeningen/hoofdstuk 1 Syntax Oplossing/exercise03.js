const getal = Number(prompt('Geef een getal in: '))

// Alternatieve (en betere) oplossing
// const isEven = getal % 2 === 0 ? 'even' : 'oneven'
let isEven = 'oneven'
if (getal % 2 === 0) {
  isEven = 'even'
}

console.log(`${getal} is een ${isEven} getal`)
