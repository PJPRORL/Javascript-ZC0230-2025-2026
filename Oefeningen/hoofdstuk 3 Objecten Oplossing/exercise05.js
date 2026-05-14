Array.prototype.sortNumerical = function() {
  return this.sort((a, b) => a - b);
}

Array.prototype.sortObject = function(key, type = 'string') {
  if (type === 'number') {
    return this.sort((a, b) => a[key] - b[key]);
  }
  return this.sort((a, b) => a[key].localeCompare(b[key]));
}

function createBook(title, author, published, wordCount) {
  return {
    title,
    author,
    published,
    wordCount,
    getInfo() {
      const baseInfo = `${this.title} by ${this.author}, published in ${this.published}`;
      return this.wordCount ? `${baseInfo} (${this.wordCount} words)` : baseInfo;
    },
    bookType() {
      if (!this.wordCount) return 'Unknown'
      if (this.wordCount < 7500) return 'Short Story'
      if (this.wordCount < 20000) return 'Novelette'
      if (this.wordCount < 40000) return 'Novella'
      if (this.wordCount < 250000) return 'Novel'
      return 'Doorstopper'
    }
  };
}

const books = [
  createBook('The Hobbit', 'J.R.R. Tolkien', 1937),
  createBook('1984', 'George Orwell', 1949, 88900),
  createBook('Pride and Prejudice', 'Jane Austen', 1813, 124713),
  createBook('War and Peace', 'Leo Tolstoy', 1867, 544406),
  createBook('The Tell-Tale Heart', 'Edgar Allan Poe', 1843, 2093),
  createBook('The Metamorphosis', 'Franz Kafka', 1915, 22185),
  createBook('Strange Case of Dr Jekyll and Mr Hyde', 'Robert Louis Stevenson', 1886, 13500),
];

const numbers = [4, 5, 3, 9, 111, 6, 0, 2, 1]

console.log(`Array ${numbers} sorted with Array.prototype.sortNumerical: ${numbers.sortNumerical()}\n`);

console.log(`Books sorted by title:\n${books.sortObject('title').map(x => x.getInfo()).join('\n')}\n`);

console.log(`Books sorted by word count:\n${books.sortObject('wordCount', 'number').map(x => x.getInfo()).join('\n')}\n`);
