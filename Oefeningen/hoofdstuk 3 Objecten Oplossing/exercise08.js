function getValueByPath(pathArray, object) {
  let output = object;
  for (const key of pathArray) {
    output = output[key];
  }
  return output;
}

const data = {
  books: [
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      published: 1937,
      wordCount: 95356,
      genres: ['Fantasy', 'Adventure'],
    },
    {
      title: '1984',
      author: 'George Orwell',
      published: 1949,
      wordCount: 88900,
      genres: ['Dystopian', 'Political Fiction'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      published: 1813,
      wordCount: 124713,
      genres: ['Romance', 'Regency Romance'],
    },
    {
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      published: 1867,
      wordCount: 544406,
      genres: ['Historical Fiction'],
    },
    {
      title: 'The Tell-Tale Heart',
      author: 'Edgar Allan Poe',
      published: 1843,
      wordCount: 2093,
      genres: ['Gothic Fiction'],
    },
    {
      title: 'The Metamorphosis',
      author: 'Franz Kafka',
      published: 1915,
      wordCount: 22185,
      genres: ['Absurdist Fiction'],
    },
    {
      title: 'Strange Case of Dr Jekyll and Mr Hyde',
      author: 'Robert Louis Stevenson',
      published: 1886,
      wordCount: 13500,
      genres: ['Gothic Fiction', 'Mystery'],
    }
  ],
  authors: [
    'J.R.R. Tolkien',
    'George Orwell',
    'Jane Austen',
    'Leo Tolstoy',
    'Edgar Allan Poe',
    'Franz Kafka',
    'Robert Louis Stevenson',
  ]
}

console.log(getValueByPath(['books', 0, 'title'], data)); // The Hobbit
console.log(getValueByPath(['authors', 2], data)); // George Orwell
console.log(getValueByPath(['books', 1, 'genres', 0], data)); // Fantasy