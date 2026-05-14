const n = Number(prompt('Up until which number do you want to find all prime numbers?'))

const primes = Array(n + 1).fill(true).map((_,i) => (i % 2 !== 0 || i === 2) && i >= 2);

for (let p = 3; p < n; p += 2) {
  if (!primes[p]) continue

  for (let q = Math.pow(p, 2); q <= n; q += 2*p) {
    primes[q] = false;
  }

}

const finalPrimes = []
primes.forEach((isPrime, i) => isPrime && finalPrimes.push(i))
const maxLength = finalPrimes.at(-1).toString().length

console.log()
const rowSize = 20
while (finalPrimes.length !== 0) {
  const row = finalPrimes.splice(0, rowSize).map(x => x.toString().padEnd(maxLength, ' ')).join(' ')
  console.log(row)
}
