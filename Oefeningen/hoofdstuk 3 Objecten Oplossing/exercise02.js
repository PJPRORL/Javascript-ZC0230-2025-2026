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

books.forEach(book => console.log(`${book.title} is a ${book.bookType()}`));