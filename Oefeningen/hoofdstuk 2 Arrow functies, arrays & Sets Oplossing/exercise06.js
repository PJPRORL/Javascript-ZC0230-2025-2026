const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];

function findCommonElements(array1, array2) {
  return array1.filter((element) => array2.includes(element));
}

function getIntersection(array1, array2) {
  return Array.from(
    new Set(array1).intersection(new Set(array2))
  );
}

console.log('Array 1:', array1);
console.log('Array 2:', array2);
console.log('Gemeenschappelijke elementen (array):', findCommonElements(array1, array2));
console.log('Gemeenschappelijke elementen (set):', getIntersection(array1, array2));