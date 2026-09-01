import {Series} from '../../components/series/series.ts'
import {dataManager} from '../../data/data.ts'
import {Page} from '../../router/page.ts'
import HTML from './series.html?raw'

export class SeriesPage extends Page {
    readonly #seriesList = this.body.querySelector<HTMLUListElement>('#seriesList')!
    readonly #modalClose = this.body.querySelector<HTMLButtonElement>('#close-btn')!
    readonly #nameInput = this.body.querySelector<HTMLInputElement>('#seriesName')!
    readonly #seriesForm = this.body.querySelector<HTMLFormElement>('#seriesForm')!

    constructor() {
        super(HTML)

        this.#seriesForm.addEventListener('submit', evt => {
            evt.preventDefault()

            this.#createSeries()
            this.#seriesForm.reset()
            this.#modalClose.click()
            this.render()
        })
    }

    render() {
        super.render()

        this.#seriesList.innerText = ''
        dataManager.series.forEach(s => {
            const series = new Series()
            series.setAttribute('name', s.name)

            // TODO: Reageren op het verwijderen van een serie.

            this.#seriesList.appendChild(series)
        })
    }

    #createSeries(): void {
        const name = this.#nameInput.value
        dataManager.series.push({
            id: window.crypto.randomUUID(),
            name,
        })
    }
}
