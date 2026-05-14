const computerScientists = ['Alan Turing', 'Ada Lovelace', 'Charles Babbage', 'Donald Knuth', 'Grace Hopper']

console.log('a. ', computerScientists.length)

console.log('\nb.')
console.log('  Eerste element:', computerScientists[0])
console.log('  Derde element:', computerScientists[2])
console.log('  Vijfde element:', computerScientists[4])

computerScientists.sort()
console.log('\nc. ', computerScientists)

const extraName = prompt('Geen een extra naam op: ')
computerScientists.push(extraName)
console.log('\nd. ', computerScientists)

console.log('\ne. ', computerScientists.join(';'))