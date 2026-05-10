const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const input = prompt('Geef een zin in:').split('')

const output = []

for (let i = 0; i < input.length; i++) {
  const letter = input[i]

  if (letter === ' ') {
    output.push(letter)
    continue
  }

  const index = (alphabet.indexOf(letter) + 3) % 26
  output.push(alphabet[index])
}

console.log('Rot3 (Caesarcijfer) encoded tekst:', output.join(''))