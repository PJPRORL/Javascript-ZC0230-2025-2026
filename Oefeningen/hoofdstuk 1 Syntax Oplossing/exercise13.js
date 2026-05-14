let limit = Number(prompt('Hoeveel rijen moeten geprint worden?'))

for (let n = 2; n <= limit; n++) {
  let current = n
  let row = `${(n + ':').padEnd(5, ' ')}`

  while (current !== 1) {
    row += current.toString().padEnd(5, ' ')
    current = current % 2 === 0 ? current / 2 : 3 * current + 1
  }

  console.log(row)
}
