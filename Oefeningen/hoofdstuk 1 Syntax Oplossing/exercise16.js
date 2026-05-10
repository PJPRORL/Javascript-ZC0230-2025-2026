function generateSequence(number, operation) {
  let sequence = `${number} `;
  while (number < 100) {
    number = operation(number);
    sequence += `${number} `;
  }
  return sequence
}

console.log('Maal 2:')
const timesTwo = generateSequence(1, function(number) {
  return number * 2;
})
console.log(timesTwo)

console.log('Kwadraat:')
const squared = generateSequence(2, function(number) {
  return number ** 2;
})
console.log(squared)


