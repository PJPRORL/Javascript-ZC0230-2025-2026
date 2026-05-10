const vegetables = new Set()
const fruit = new Set()

let input = prompt('Geef een fruit of groente in, of druk op enter om te stoppen:', '')
while (input !== '') {
  const split = input.split(' ')
  if (split.length === 2 && split[0] === 'g') {
    vegetables.add(split[1])
  } else if (split.length === 2 && split[0] === 'f') {
    fruit.add(split[1])
  }

  input = prompt('Geef een fruit of groente in, of druk op enter om te stoppen:', '')
}

console.log('Groenten:', vegetables)
console.log('Fruit:', fruit)