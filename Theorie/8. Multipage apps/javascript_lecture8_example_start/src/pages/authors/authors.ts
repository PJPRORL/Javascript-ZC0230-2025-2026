import {dataManager} from '../../data/data.ts'
import {Page} from '../../router/page.ts'
import HTML from './authors.html?raw'

export class AuthorsPage extends Page {
    readonly #nameInput = this.body.querySelector<HTMLInputElement>('#authorName')!
    readonly #authorForm = this.body.querySelector<HTMLFormElement>('#authorForm')!
    readonly #authorProfile = this.body.querySelector<HTMLFormElement>('#authorProfile')!
    readonly #authorDescription = this.body.querySelector<HTMLFormElement>('#authorDescription')!
    readonly #authorList = this.body.querySelector<HTMLUListElement>('#authorList')!
    readonly #modalClose = this.body.querySelector<HTMLButtonElement>('#close-btn')!

    constructor() {
        super(HTML)

        this.#authorForm.addEventListener('submit', evt => {
            evt.preventDefault()
            this.#createAuthor()
            this.#authorForm.reset()
            this.#modalClose.click()
            this.render()
        })
    }

    render() {
        super.render()

        this.#authorList.innerHTML = ''
        dataManager.authors.forEach(_a => {
            // TODO: Render authors
        })
    }

    #createAuthor(): void {
        const name = this.#nameInput.value
        const profile = this.#authorProfile.value
        const description = this.#authorDescription.value
        dataManager.authors.push({
            id: window.crypto.randomUUID(),
            name,
            profile,
            description,
        })
    }
}
