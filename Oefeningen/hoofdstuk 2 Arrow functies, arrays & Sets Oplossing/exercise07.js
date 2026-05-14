function isPalindrome(array) {
  for (let i = 0; i < array.length / 2; i++) {
    if (array[i] !== array?.at(- i - 1)) {
      return false
    }
  }
  return true
}

const array = prompt('Geef een array in, gescheiden door komma\'s:').split(', ')

if (isPalindrome(array)) {
  console.log('De array is een palindroom.')
} else {
  console.log('De array is geen palindroom.')
}