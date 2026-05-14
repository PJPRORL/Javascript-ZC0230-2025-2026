function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const n = Number(prompt('Welk Fibonacci-getal wil je berekenen?'))
console.log(fibonacci(n))