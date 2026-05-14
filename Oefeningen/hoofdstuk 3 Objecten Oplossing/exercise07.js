function getCharacterFrequency(input) {
  const output = {};

  for (let i = 0; i < input.length; i++) {
    const character = input[i];

    if (character === ' ') {
      continue;
    }

    if (output[character]) {
      output[character]++;
    } else {
      output[character] = 1;
    }
  }

  return output;
}


const input = prompt("Geef een tekst in:");
const frequency = getCharacterFrequency(input);

console.log(frequency)