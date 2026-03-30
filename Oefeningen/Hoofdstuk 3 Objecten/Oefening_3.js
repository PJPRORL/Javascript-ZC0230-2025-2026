// Methodes
let createBook = (title, author, published, wordCount) => {
    return {
        title: title,
        author: author,
        published: published,
        wordCount: wordCount,
        getInfo: function () {
            return `${this.title} by ${this.author}, published in ${this.published} (${this.wordCount} words)`;
        },
    };
};

let maxYear = (books, maxYear) => {
    books.filter((book) => book.published <= maxYear).forEach((book) => console.log(book.getInfo()));
}

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

maxYear(books, 1900)