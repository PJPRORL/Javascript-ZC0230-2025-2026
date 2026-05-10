import {Page} from '../../router/page.ts'
import HTML from './authors.html?raw'
import {Author as AuthorComponent} from '../../components/author/author.ts'
import {authorPersistenceProvider} from '../../data/data.ts'
import {Author} from '../../models/author.ts'

export class AuthorsPage extends Page {
  readonly #nameInput = this.body.querySelector<HTMLInputElement>('#authorName')!
  readonly #authorForm = this.body.querySelector<HTMLFormElement>('#authorForm')!
  readonly #authorProfile = this.body.querySelector<HTMLFormElement>('#authorProfile')!
  readonly #authorDescription = this.body.querySelector<HTMLFormElement>('#authorDescription')!
  readonly #authorList = this.body.querySelector<HTMLUListElement>('#authorList')!
  readonly #modalClose = this.body.querySelector<HTMLButtonElement>('#close-btn')!

  #authors: Author[] = []

  constructor() {
    super(HTML)

    this.#authorForm.addEventListener('submit', async (evt) => {
      evt.preventDefault()
      await this.#createAuthor()
      this.#authorForm.reset()
      this.#modalClose.click()
    })

    this.unsubscribe.push(authorPersistenceProvider.addObserver(data => {
      this.#authors = data
      this.render()
    }))

    void authorPersistenceProvider.getAll()
  }

  render() {
    super.render()
    this.#authorList.innerHTML = ''
    this.#authors.forEach(a => {
      const author = new AuthorComponent()
      author.setAttribute('name', a.name)
      author.setAttribute('image', a.profile)
      author.setAttribute('description', a.description)
      this.#authorList.appendChild(author)
    })
  }

  async #createAuthor(): Promise<void> {
    const name = this.#nameInput.value
    const profile = this.#authorProfile.value
    const description = this.#authorDescription.value

    await authorPersistenceProvider.create({
      name,
      profile,
      description,
    })
  }
}