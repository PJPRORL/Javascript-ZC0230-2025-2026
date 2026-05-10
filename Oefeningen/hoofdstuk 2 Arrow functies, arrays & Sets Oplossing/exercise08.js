const marks = [23, 45, 5, 39, 48, 59, 76, 49, 57, 89, 60, 82]

console.log('Originele cijfers:', marks)
console.log('Op 20:', marks.map(mark => mark / 5))

const passed = marks.filter(mark => mark >= 50)
console.log(`Er zijn ${passed.length} geslaagde studenten:`, passed)

const failed = marks.filter(mark => mark < 50)
console.log(`Er zijn ${failed.length} gebuisde studenten:`, failed)