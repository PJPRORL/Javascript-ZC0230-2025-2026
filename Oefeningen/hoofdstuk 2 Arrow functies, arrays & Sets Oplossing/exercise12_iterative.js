function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  let nMinus2 = 0n
  let nMinus1 = 1n

  for (let i = 2; i <= n; i++) {
    const temp = nMinus1 + nMinus2
    nMinus2 = nMinus1
    nMinus1 = temp
  }

  return nMinus1
}

const n = Number(prompt('Welk Fibonacci-getal wil je berekenen?'))
console.log(fibonacci(n).toLocaleString("nl-BE"))