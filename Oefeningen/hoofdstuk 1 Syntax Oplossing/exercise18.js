function generateSequence(number, operation, limit = 100) {
  let i = 1;

  let sequence = `${number} `;
  while (number < limit) {
    number = operation(number, i);
    sequence += `${number} `;
    i++;
  }
  return sequence
}

console.log('Maal 2:')
const timesTwo = generateSequence(1, function(number) {
  return number * 2;
})
console.log(timesTwo)

console.log('Afwisselend plus 5 en min 2 (grens op 30):')
const plus5Minus2 = generateSequence(
  2,
  function(number, i) {
    return i % 2 === 1 ? number + 5 : number - 2;
  },
  30
)
console.log(plus5Minus2)


