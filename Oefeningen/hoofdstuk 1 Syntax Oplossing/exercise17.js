function generateSequence(number, operation, limit = 100) {
  let sequence = `${number} `;
  while (number < limit) {
    number = operation(number);
    sequence += `${number} `;
  }
  return sequence
}

console.log('Maal 2 (met default):')
const timesTwo = generateSequence(1, function(number) {
  return number * 2;
})
console.log(timesTwo)

console.log('Kwadraat (met de grens op 1000):')
const squared = generateSequence(
  2,
  function(number) {
    return number ** 2;
  },
  1000
)
console.log(squared)


