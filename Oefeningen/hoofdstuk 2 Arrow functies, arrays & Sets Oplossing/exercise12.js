function fibonacci(n, cache = Array(n + 1).fill(null)) {
  if (cache[n] !== null) return cache[n]

  // Omdat de Fibonacci reeks snel heel groot wordt, moeten we BigInt gebruiken.
  // Doen we dit niet, dan krijgen we afrondingsfouten bij grote n.
  // De maximale veilige integer in JavaScript is gedefinieerd in de Number.MAX_SAFE_INTEGER variabele.
  // Zowel BigInt als de n suffix kunnen gebruikt worden om grote gehele getallen (BigInt) te representeren.
  if (n === 0) return BigInt(0)
  if (n === 1) return 1n

  const fib =  fibonacci(n - 1, cache) + fibonacci(n - 2, cache)
  cache[n] = fib
  return fib
}

const n = Number(prompt('Welk Fibonacci-getal wil je berekenen?'))
console.log(fibonacci(n).toLocaleString("nl-BE"))