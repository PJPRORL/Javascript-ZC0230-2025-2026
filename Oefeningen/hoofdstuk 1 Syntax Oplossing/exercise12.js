const showYears = confirm('Wil je het aantal jaren zien?')

let nbLions = 50
let singleRowOutput = `${nbLions} `
let year = 0

while (nbLions < 1000) {
  nbLions = nbLions + Math.floor(nbLions * 0.15)
  singleRowOutput += `${nbLions} `
  year++

  if (showYears) {
    console.log(`${year}: ${nbLions}`)
  }
}

if (!showYears) {
  console.log(singleRowOutput)
}

