import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import homePage from './pages/home/home.html?raw'
import type {Book, BookType} from './models/book.ts'

const root = document.querySelector<HTMLDivElement>('#app')!
root.innerHTML = homePage

let books : Book[] = [] 

// Rest van de code verborgen

const bookList = document.querySelector<HTMLTableSectionElement>('#bookTableBody')!
const bookFrom = document.querySelector<HTMLFormElement>('#bookForm')!
const titleInput = document.querySelector<HTMLInputElement>('input[name="title"]')!
const yearInput = document.querySelector<HTMLInputElement>('input[name="year"]')!
const seriesNameInput = document.querySelector<HTMLInputElement>('input[name="seriesName"]')!
const seriesNumberInput = document.querySelector<HTMLInputElement>('input[name="seriesNumber"]')!
const authorInput = document.querySelector<HTMLInputElement>('input[name="author"]')!
const typeSelect = document.querySelector<HTMLInputElement>('select[name="type"]')!

function renderBooks() {
    bookList.innerHTML = ''
    books.forEach(b => {
        bookList.appendChild(buildBookRow(b))
    })
}

function buildBookRow(book: Book): HTMLTableRowElement {
    const bookRow = document.createElement('tr')
    bookRow.appendChild(createTableCell(book.title))
    bookRow.appendChild(createTableCell(book.publicationYear.toString()))
    bookRow.appendChild(createTableCell(book.author))
    bookRow.appendChild(createTableCell(book.type))
    bookRow.appendChild(createTableCell(book.series ? `${book.series?.name} (${book.series?.number})` : ''))

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete'
    deleteButton.addEventListener('click', () => {
        books = books.filter(b => b.id !== book.id)
        renderBooks()
    })
    bookRow.appendChild(createTableCell(deleteButton))

    return bookRow
}

function createTableCell(content: string | HTMLElement): HTMLTableCellElement {
    const cell = document.createElement('td')

    if (typeof content === 'string') {
        cell.innerHTML = content
    } else {
        cell.appendChild(content)
    }

    return cell
}

function emptyForm(): void {
    titleInput.value = ''
    seriesNameInput.value = ''
    seriesNumberInput.value = ''
    typeSelect.value = ''
    authorInput.value = ''
    yearInput.value = ''
}

bookFrom.addEventListener('submit', (evt: SubmitEvent) => {
    evt.preventDefault()

    books.push({
        id: window.crypto.randomUUID(),
        title: titleInput.value,
        series:
            seriesNameInput.value === ''
                ? undefined
                : {
                    name: seriesNameInput.value,
                    number: Number(seriesNumberInput.value),
                },
        type: typeSelect.value as BookType,
        author: authorInput.value,
        publicationYear: Number(yearInput.value),
    })

    emptyForm()
    renderBooks()
})