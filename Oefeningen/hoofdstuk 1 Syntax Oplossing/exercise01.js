const voornaam = prompt('Geef je voornaam in: ')
const achternaam = prompt('Geef je achternaam in: ')

console.log(`Je naam is ${voornaam} ${achternaam}`)

const isCorrect = confirm('Is dit correct?')

if (isCorrect) {
  console.log('Bedankt voor de bevestiging!')
} else {
  console.log('Sorry voor de verwarring, voer het programma opnieuw uit om je correcte naam in te geven.')
}

