let voornaam, achternaam, isCorrect

while (!isCorrect) {
  voornaam = prompt('Geef je voornaam in: ')
  achternaam = prompt('Geef je achternaam in: ')

  console.log(`Je naam is ${voornaam} ${achternaam}`)

  isCorrect = confirm('Is dit correct?')

  if (!isCorrect) {
    console.log('Sorry voor de verwarring, geef je naam opnieuw in.')
  }
}

console.log('Bedankt voor de bevestiging!')