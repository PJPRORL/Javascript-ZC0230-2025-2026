const getal = Number(prompt('Geef een getal in tussen 10 en 20: '))

switch (true) {
  case getal < 10:
    console.log('Dit getal is kleiner dan 10')
    break
  case getal > 20:
    console.log('Dit getal is groter dan 20')
    break
  default:
    // Via machtsverheffing operator
    console.log(`Het kwadraat van dit getal is ${getal ** 2}`)
    // Via Math.pow
    // console.log(`Het kwadraat van dit getal is ${Math.pow(getal, 2)}`)
    break
}