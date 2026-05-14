function levenshtein(string1, string2) {
  if (string1.length === 0) return string2.length;
  if (string2.length === 0) return string1.length;

  if (string1.charAt(0) === string2.charAt(0)) {
    return levenshtein(string1.substring(1), string2.substring(1));
  }

  // Verwijder een karakter uit string 1 (ten opzichte van string 2)
  const deletion = levenshtein(string1.substring(1), string2);

  // Voeg een karakter toe aan string 1 (ten opzichte van string 2)
  const insertion = levenshtein(string1, string2.substring(1));

  // Vervang een karakter (de karakters op positie 0 zijn verschillend, hiervoor moet dus een vervanging plaatsvinden)
  const substitution = levenshtein(string1.substring(1), string2.substring(1));

  return 1 + Math.min(insertion, deletion, substitution);
}

const string1 = prompt('Voer de eerste string in:');
const string2 = prompt('Voer de tweede string in:');

const distance = levenshtein(string1, string2);
console.log(`De Levenshtein afstand tussen "${string1}" en "${string2}" is ${distance}.`);