function getValueByPath(pathArray, object) {
  let output = object;
  for (const key of pathArray) {
    output = output[key];
  }
  return output;
}

function exploreObject(object) {
  const activePath = [];

  while (true) {
    const currentObject = getValueByPath(activePath, object);

    let key = '..'
    const availableKeys = Object.keys(currentObject);

    if (typeof currentObject !== 'object' && !Array.isArray(currentObject)) {
      console.log({value: currentObject});
      key = prompt('Reached a leaf node, press enter to move back up the tree or type "exit" to quit', '..');
    } else {
      key = prompt(`Available keys - ${availableKeys.join(', ')} - or type 'exit' to quit:`);
    }

    if (key === '..') {
      activePath.pop();
      continue
    }

    if (key === 'exit') break;

    if (!availableKeys.includes(key)) {
      console.log('Invalid key, retrying...');
      continue
    }

    activePath.push(key);
  }
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

exploreObject(data);