let getal = Number(prompt('Geef een getal in: '))
let uitvoer = `${getal} `

while (getal + 12 < 100) {
  getal += 12
  uitvoer += `${getal} `
}

console.log(uitvoer)