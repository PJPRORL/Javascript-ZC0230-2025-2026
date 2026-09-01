import {dataManager} from '../../data/data.ts'
import type {Book, BookType} from '../../models/book.ts'
import {Page} from '../../router/page.ts'
import HTML from './library.html?raw'

export class LibraryPage extends Page {
    readonly #bookList = this.body.querySelector<HTMLTableSectionElement>('#bookTableBody')!
    readonly #bookForm = this.body.querySelector<HTMLFormElement>('#bookForm')!
    readonly #titleInput = this.body.querySelector<HTMLInputElement>('input[name="title"]')!
    readonly #yearInput = this.body.querySelector<HTMLInputElement>('input[name="year"]')!
    readonly #seriesNumberInput = this.body.querySelector<HTMLInputElement>('input[name="seriesNumber"]')!
    readonly #authorSelect = this.body.querySelector<HTMLInputElement>('select[name="author"]')!
    readonly #typeSelect = this.body.querySelector<HTMLInputElement>('select[name="type"]')!
    readonly #seriesSelect = this.body.querySelector<HTMLSelectElement>('select[name="series"]')!

    constructor() {
        super(HTML)

        this.#bookForm.addEventListener('submit', evt => {
            evt.preventDefault()
            this.#createBook()
            this.#bookForm.reset()
            this.render()
        })
    }

    render() {
        super.render()

        // Boeken tabel opvullen.
        this.#bookList.innerHTML = ''
        dataManager.books.map(b => this.#bookList.appendChild(this.#buildBookRow(b)))

        // Series dropdown opvullen.
        this.#seriesSelect.innerHTML = ''
        this.#seriesSelect.appendChild(this.#createSelectOption('', '--Series--'))
        dataManager.series.forEach(s => {
            this.#seriesSelect.appendChild(this.#createSelectOption(s.id, s.name))
        })

        // Author dropdown opvullen.
        this.#authorSelect.innerHTML = ''
        this.#authorSelect.appendChild(this.#createSelectOption('', '--Author--'))
        dataManager.authors.forEach(a => {
            this.#authorSelect.appendChild(this.#createSelectOption(a.id, a.name))
        })
    }

    #buildBookRow(book: Book): HTMLTableRowElement {
        const bookRow = document.createElement('tr')
        bookRow.appendChild(this.#createTableCell(book.title))
        bookRow.appendChild(this.#createTableCell(book.publicationYear.toString()))
        bookRow.appendChild(this.#createTableCell(book.author.name))
        bookRow.appendChild(this.#createTableCell(book.type))
        bookRow.appendChild(this.#createTableCell(book.series ? `${book.series?.name} (${book.series?.number})` : ''))

        const deleteButton = document.createElement('button')
        deleteButton.className = 'btn btn-danger'
        deleteButton.innerHTML = 'Delete'
        deleteButton.addEventListener('click', () => {
            dataManager.books = dataManager.books.filter(b => b.id !== book.id)
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

    #createBook(): void {
        dataManager.books.push({
            id: window.crypto.randomUUID(),
            title: this.#titleInput.value,
            series:
                this.#seriesSelect.value === ''
                    ? undefined
                    : {
                          ...dataManager.series.find(s => s.id === this.#seriesSelect.value)!,
                          number: Number(this.#seriesNumberInput.value),
                      },
            type: this.#typeSelect.value as BookType,
            author: dataManager.authors.find(a => a.id === this.#authorSelect.value)!,
            publicationYear: Number(this.#yearInput.value),
        })
    }
}
