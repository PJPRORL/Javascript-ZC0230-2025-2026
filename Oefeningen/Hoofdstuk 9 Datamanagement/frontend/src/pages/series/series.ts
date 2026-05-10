import {Page} from '../../router/page.ts'
import HTML from './series.html?raw'
import {seriesPersistenceProvider} from '../../data/data.ts'
import {Series as SeriesComponent} from '../../components/series/series.ts'
import {Series} from '../../models/series.ts'

export class SeriesPage extends Page {
  readonly #seriesList = this.body.querySelector<HTMLUListElement>('#seriesList')!
  readonly #modalClose = this.body.querySelector<HTMLButtonElement>('#close-btn')!
  readonly #nameInput = this.body.querySelector<HTMLInputElement>('#seriesName')!
  readonly #seriesForm = this.body.querySelector<HTMLFormElement>('#seriesForm')!

  #series: Series[] = []

  constructor() {
    super(HTML)

    this.#seriesForm.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      await this.#createSeries()
      this.#seriesForm.reset()
      this.#modalClose.click()
      this.render()
    })

    this.unsubscribe.push(seriesPersistenceProvider.addObserver(series => {
      this.#series = series
      this.render()
    }))

    void seriesPersistenceProvider.getAll()
  }

  render() {
    super.render()

    this.#seriesList.innerText = ''
    this.#series.forEach(s => {
      const series = new SeriesComponent()
      series.setAttribute('name', s.name)

      series.addEventListener('seriesDeleted', async () => {
        await seriesPersistenceProvider.delete(s.id)
        this.render()
      })

      this.#seriesList.appendChild(series)
    })
  }

  async #createSeries(): Promise<void> {
    const name = this.#nameInput.value
    await seriesPersistenceProvider.create({
      name,
    })
  }
}