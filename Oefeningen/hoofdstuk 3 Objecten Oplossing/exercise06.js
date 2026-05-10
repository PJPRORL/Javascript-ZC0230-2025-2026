const date = new Date(prompt("Geef je geboortedatum in (YYYY-MM-DD):"));

const paddedDate = date.getDate().toString().padStart(2, '0');
const paddedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
console.log(`Je geboortedatum is: ${paddedDate}/${paddedMonth}/${date.getFullYear()}`);

const dutchFormatter = new Intl.DateTimeFormat('nl-BE', {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

console.log(`Vandaag is het ${dutchFormatter.format(new Date())}`);

const today = Date.now();
const birthday = date.getTime();
const age = Math.floor((today - birthday) / (1000 * 60 * 60 * 24));
console.log(`Je bent ${age} dagen oud.`);