import {Page} from '../../router/page.ts'
import HTML from './home.html?raw'
import {Book} from '../../models/book.ts'
import {bookPersistenceProvider, collectionPersistenceProvider} from '../../data/data.ts'
import {CustomBook} from '../../components/customBook/customBook.ts'

export class HomePage extends Page {

  #books: Book[] = []
  #booksContainer = this.body.querySelector<HTMLDivElement>('#books-container')!
  #titleFilter = this.body.querySelector<HTMLInputElement>('#title-filter')!
  #typeFilter = this.body.querySelector<HTMLSelectElement>('#type-filter')!

  constructor() {
    super(HTML)

    this.#titleFilter.addEventListener('input', () => {
      this.render()
      this.#titleFilter.focus()
    })

    this.#typeFilter.addEventListener('change', () => {
      this.render()
    })

    this.unsubscribe.push(bookPersistenceProvider.addObserver(books => {
      this.#books = books
      this.render()
    }))

    void bookPersistenceProvider.getAll()
  }

  render(): void {
    super.render()


    this.#booksContainer.innerHTML = ''
    this.#books.filter(b => this.#bookMatchesFilter(b)).forEach(book => {
      const customBook = new CustomBook()
      customBook.setAttribute('id', book.id)
      customBook.setAttribute('title', book.title)
      customBook.setAttribute('author', book.author)
      customBook.setAttribute('type', book.type)
      customBook.setAttribute('retail', book.retail.toFixed(2))
      customBook.setAttribute('resale', book.resale?.toFixed(2) || '')
      customBook.setAttribute('image', book.image)
      customBook.setAttribute('properties', JSON.stringify(book.properties))
      this.#booksContainer.appendChild(customBook)

      customBook.addEventListener('add-to-collection', () => {
        void collectionPersistenceProvider.create({
          title: book.title,
          resale: book.resale,
          retail: book.retail,
        })
      })
    })
  }

  #bookMatchesFilter(book: Book): boolean {
    return book.title.toLowerCase().includes(this.#titleFilter.value.toLowerCase()) && (
      this.#typeFilter.value === 'all' || book.type === this.#typeFilter.value
    )
  }
}