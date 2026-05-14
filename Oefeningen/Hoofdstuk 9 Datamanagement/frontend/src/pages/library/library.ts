import {Book, BookType} from '../../models/book.ts'
import {Page} from '../../router/page.ts'
import HTML from './library.html?raw'
import {authorPersistenceProvider, bookPersistenceProvider, seriesPersistenceProvider} from '../../data/data.ts'
import {Author} from '../../models/author.ts'
import {Series} from '../../models/series.ts'

export class LibraryPage extends Page {
  readonly #bookList = this.body.querySelector<HTMLTableSectionElement>('#bookTableBody')!
  readonly #bookForm = this.body.querySelector<HTMLFormElement>('#bookForm')!
  readonly #titleInput = this.body.querySelector<HTMLInputElement>('input[name="title"]')!
  readonly #yearInput = this.body.querySelector<HTMLInputElement>('input[name="year"]')!
  readonly #seriesNumberInput = this.body.querySelector<HTMLInputElement>('input[name="seriesNumber"]')!
  readonly #authorSelect = this.body.querySelector<HTMLInputElement>('select[name="author"]')!
  readonly #typeSelect = this.body.querySelector<HTMLInputElement>('select[name="type"]')!
  readonly #seriesSelect = this.body.querySelector<HTMLSelectElement>('select[name="series"]')!

  #books: Book[] = []
  #authors: Author[] = []
  #series: Series[] = []

  constructor() {
    super(HTML)

    this.#bookForm.addEventListener('submit', async evt => {
      evt.preventDefault()
      await this.#createBook()
      this.#bookForm.reset()
      void this.render()
    })

    this.unsubscribe.push(bookPersistenceProvider.addObserver(books => {
      this.#books = books
      this.render()
    }))

    this.unsubscribe.push(authorPersistenceProvider.addObserver(authors => {
      this.#authors = authors
      this.render()
    }))

    this.unsubscribe.push(seriesPersistenceProvider.addObserver(series => {
      this.#series = series
      this.render()
    }))

    void bookPersistenceProvider.getAll()
    void authorPersistenceProvider.getAll()
    void seriesPersistenceProvider.getAll()
  }

  render() {
    super.render()

    // Boeken tabel opvullen.
    this.#bookList.innerHTML = ''
    this.#books.map(b => this.#bookList.appendChild(this.#buildBookRow(b)))

    // Series dropdown opvullen.
    this.#seriesSelect.innerHTML = ''
    this.#seriesSelect.appendChild(this.#createSelectOption('', '--Series--'))
    this.#series.forEach(s => this.#seriesSelect.appendChild(this.#createSelectOption(s.id, s.name)))

    // Author dropdown opvullen.
    this.#authorSelect.innerHTML = ''
    this.#authorSelect.appendChild(this.#createSelectOption('', '--Author--'))
    this.#authors.forEach(a => this.#authorSelect.appendChild(this.#createSelectOption(a.id, a.name)))
  }

  #buildBookRow(book: Book): HTMLTableRowElement {
    const bookRow = document.createElement('tr')
    bookRow.appendChild(this.#createTableCell(book.title))
    bookRow.appendChild(this.#createTableCell(book.publicationYear.toString()))
    bookRow.appendChild(this.#createTableCell(book.author.name))
    bookRow.appendChild(this.#createTableCell(book.type))
    bookRow.appendChild(this.#createTableCell(book.series ? `${book.series?.name} (${book.series?.number})` : ''))

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete'
    deleteButton.addEventListener('click', async () => {
      await bookPersistenceProvider.delete(book.id)
      this.render()
    })
    bookRow.appendChild(this.#createTableCell(deleteButton))

    return bookRow
  }

  #createTableCell(content: string | HTMLElement): HTMLTableCellElement {
    const cell = document.createElement('td')

    if (typeof content === 'string') {
      cell.innerHTML = content
    } else {
      cell.appendChild(content)
    }

    return cell
  }

  #createSelectOption(value: string, label: string): HTMLOptionElement {
    const option = document.createElement('option')
    option.value = value
    option.innerText = label
    return option
  }

  async #createBook() {
    const series = await seriesPersistenceProvider.get(this.#seriesSelect.value)
    const author = await authorPersistenceProvider.get(this.#authorSelect.value)

    await bookPersistenceProvider.create({
      title: this.#titleInput.value,
      series: this.#seriesSelect.value === '' ? undefined : {
        ...series,
        number: Number(this.#seriesNumberInput.value),
      },
      type: this.#typeSelect.value as BookType,
      author,
      publicationYear: Number(this.#yearInput.value),
    })
  }
}

