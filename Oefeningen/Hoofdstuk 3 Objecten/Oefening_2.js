// Methodes
let createBook = (title, author, published, wordCount) => {
  return {
    title: title,
    author: author,
    published: published,
    wordCount: wordCount,
    getInfo: function () {
      return `Title: ${this.title} author: ${this.author} published: ${this.published} wordcount: ${this.wordCount}`;
    },
    typeOfBook: function () {
      if (this.wordCount === undefined) {
        return `${this.title} is a Unknown.`;
      }

      if (this.wordCount < 7500) {
        return `${this.title} is a Short Story.`;
      } else if (this.wordCount < 20000) {
        return `${this.title} is a Novelette.`;
      } else if (this.wordCount < 40000) {
        return `${this.title} is a Novella.`;
      } else if (this.wordCount < 250000) {
        return `${this.title} is a Novel.`;
      } else {
        return `${this.title} is a Doorstopper.`;
      }
    },
  };
};

// Creating objects
const books = [
  createBook("The Hobbit", "J.R.R. Tolkien", 1937),
  createBook("1984", "George Orwell", 1949, 88900),
  createBook("Pride and Prejudice", "Jane Austen", 1813, 124713),
  createBook("War and Peace", "Leo Tolstoy", 1867, 544406),
  createBook("The Tell-Tale Heart", "Edgar Allan Poe", 1843, 2093),
  createBook("The Metamorphosis", "Franz Kafka", 1915, 22185),
  createBook("Strange Case of Dr Jekyll and Mr Hyde", "Robert Louis Stevenson", 1886, 13500),
];

for (let index = 0; index < books.length; index++) {
  console.log(books[index].typeOfBook());
}
